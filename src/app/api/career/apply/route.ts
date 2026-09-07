import { NextRequest, NextResponse } from "next/server";
import { uploadCVToGCS } from "@/lib/gcs";
import { createJobApplication } from "@/lib/career-service";
import { sendCareerApplicationNotification } from "@/lib/email-service";
import { getCorsHeaders } from "@/lib/cors";

export async function OPTIONS(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req, "POST, OPTIONS");
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req, "POST, OPTIONS");
  try {
    const formData = await req.formData();
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const jobTitle = formData.get("jobTitle")?.toString().trim();
    const jobPositionIdRaw = formData.get("jobPositionId")?.toString();
    const cv = formData.get("cv") as File | null;

    if (!name || !email || !phone || !jobTitle) {
      return NextResponse.json(
        { success: false, error: "Please provide all required fields (Name, Email, Phone, Position)." },
        { status: 400 }
      );
    }

    if (!cv || typeof cv === "string") {
      return NextResponse.json(
        { success: false, error: "Please upload your CV in PDF format." },
        { status: 400 }
      );
    }

    // Strict validation: Must be PDF and <= 10MB
    const isPdf = cv.type === "application/pdf" || cv.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      return NextResponse.json(
        { success: false, error: "CV must be a valid PDF file." },
        { status: 400 }
      );
    }

    if (cv.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "CV file size must not exceed 10MB." },
        { status: 400 }
      );
    }

    // Convert file to buffer and upload directly to GCS (Strict, no local fallback)
    const arrayBuffer = await cv.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let gcsUrl: string;
    try {
      gcsUrl = await uploadCVToGCS(buffer, cv.name, name);
    } catch (uploadErr: unknown) {
      const err = uploadErr as { message?: string };
      console.error("[CAREER APPLY] GCS Upload failed:", err);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to upload CV to Cloud Storage: ${err.message || "Upload error"}`,
        },
        { status: 500 }
      );
    }

    // Save record to grp_job_applications
    const positionId = jobPositionIdRaw ? parseInt(jobPositionIdRaw, 10) : null;
    const application = await createJobApplication({
      name,
      email,
      phone,
      jobTitle,
      jobPositionId: isNaN(positionId as number) ? null : positionId,
      cvPath: gcsUrl,
    });

    // Send email notification to configured recipients via Resend
    try {
      await sendCareerApplicationNotification({
        name,
        email,
        phone,
        jobTitle,
        cvUrl: gcsUrl,
      });
    } catch (emailErr) {
      console.error("[CAREER APPLY] Email notification failed:", emailErr);
    }

    return NextResponse.json(
      {
        success: true,
        data: application,
        message: "Application submitted successfully.",
      },
      { headers: corsHeaders }
    );
  } catch (error: unknown) {
    const err = error as { message?: string };
    console.error("[CAREER APPLY] Internal server error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to process job application." },
      { status: 500, headers: corsHeaders }
    );
  }
}
