import { dbConnect } from "@/lib/mongoose";
import Announcement from "@/models/Announcement";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    return NextResponse.json(announcements);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const newAnnouncement = await Announcement.create(body);
    return NextResponse.json({ success: true, data: newAnnouncement }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
