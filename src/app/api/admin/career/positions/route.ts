import { NextRequest, NextResponse } from "next/server";
import {
  getAllJobPositionsAdmin,
  saveJobPosition,
  toggleJobPositionStatus,
  softDeleteJobPosition,
} from "@/lib/career-service";

export async function GET() {
  try {
    const positions = await getAllJobPositionsAdmin();
    return NextResponse.json({ success: true, data: positions });
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, title, description, status } = body;

    if (!title || !description) {
      return NextResponse.json(
        { success: false, error: "Title and description are required." },
        { status: 400 }
      );
    }

    const result = await saveJobPosition({
      id: id ? Number(id) : null,
      title: title.trim(),
      description,
      status: status === "closed" ? "closed" : "active",
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Missing position id." }, { status: 400 });
    }

    if (action === "toggle") {
      const result = await toggleJobPositionStatus(Number(id));
      return NextResponse.json({ success: true, data: result });
    }

    return NextResponse.json({ success: false, error: "Unknown action." }, { status: 400 });
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
      return NextResponse.json({ success: false, error: "Missing position id." }, { status: 400 });
    }

    const result = await softDeleteJobPosition(Number(id));
    return NextResponse.json({ success: true, data: result });
  } catch (error: unknown) {
    const err = error as { message?: string };
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
