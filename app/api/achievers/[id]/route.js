// File: app/api/achievers/[id]/route.js

import { dbConnect } from "@/lib/mongoose";
import Achiever from "@/models/Achiever";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const deleted = await Achiever.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Achiever not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
