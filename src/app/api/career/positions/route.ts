import { NextRequest, NextResponse } from "next/server";
import { getActiveJobPositions } from "@/lib/career-service";
import { getCorsHeaders } from "@/lib/cors";

export async function OPTIONS(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req, "GET, OPTIONS");
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req, "GET, OPTIONS");
  try {
    const positions = await getActiveJobPositions();
    return NextResponse.json(
      {
        success: true,
        data: positions,
      },
      { headers: corsHeaders }
    );
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch positions." },
      { status: 500, headers: corsHeaders }
    );
  }
}
