import { NextRequest, NextResponse } from "next/server";
import {
  getJobApplicationsAdmin,
  getCareerStatsAdmin,
  updateApplicationStatusAndNotes,
  softDeleteApplication,
} from "@/lib/career-service";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("q") || undefined;
    const statusFilter = searchParams.get("status") || undefined;
    const positionFilter = searchParams.get("position") || undefined;

    const [applications, stats] = await Promise.all([
      getJobApplicationsAdmin({ searchQuery, statusFilter, positionFilter }),
      getCareerStatsAdmin(),
    ]);

    return NextResponse.json({ success: true, data: { applications, stats } });
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, adminNotes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (id, status)." },
        { status: 400 }
      );
    }

    const result = await updateApplicationStatusAndNotes(
      Number(id),
      status,
      adminNotes
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing application id." }, { status: 400 });
    }

    const result = await softDeleteApplication(Number(id));
    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
