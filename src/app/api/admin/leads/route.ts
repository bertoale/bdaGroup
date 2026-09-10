import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getLeadsAdmin, updateLeadStatus, deleteLead } from "@/lib/lead-service";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("q") || undefined;
  const status = searchParams.get("status") || undefined;
  const topic = searchParams.get("topic") || undefined;

  const data = await getLeadsAdmin({ search, status, topic });
  return NextResponse.json({ success: true, data });
}

export async function PATCH(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "Missing id or status" }, { status: 400 });
    }

    const ok = await updateLeadStatus(Number(id), status);
    return NextResponse.json({ success: ok });
  } catch (err: unknown) {
    const error = err as { message?: string };
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ success: false, error: "Missing lead ID" }, { status: 400 });
  }

  const ok = await deleteLead(Number(id));
  return NextResponse.json({ success: ok });
}
