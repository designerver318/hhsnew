
import { dbConnect } from "@/lib/mongoose";
import Achiever from "@/models/Achiever";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Try connecting to the database
    console.log("Connecting to the database...");
    await dbConnect();
    
    // Fetch achievers from MongoDB
    const achievers = await Achiever.find().sort({ createdAt: -1 });

    // Check if achievers data exists
    if (!achievers || achievers.length === 0) {
      console.log("No achievers found.");
    } else {
      console.log("Achievers found:", achievers);
    }

    return NextResponse.json(achievers);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();

    // Log the received body for debugging
    console.log("Received data:", body);

    // Validate the required fields (you can add more checks based on your model)
    if (!body.name || !body.result || !body.subject || !body.image) {
      throw new Error("Missing required fields: name, result, subject, or image.");
    }

    // Create the new achiever record
    const achiever = await Achiever.create(body);

    return NextResponse.json({ success: true, data: achiever }, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);

    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
