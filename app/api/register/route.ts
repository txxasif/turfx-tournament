import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Team, { TeamInput } from "@/lib/models/Team";

export async function POST(request: NextRequest) {
  try {
    const body: TeamInput = await request.json();

    // Validate required fields
    const { name, mobile, teamName, address, managerName } = body;

    if (!name || !mobile || !teamName || !address || !managerName) {
      return NextResponse.json(
        { error: "সকল ফিল্ড পূরণ করুন" },
        { status: 400 }
      );
    }

    // Validate mobile number (Bangladesh format)
    const mobileRegex = /^01[3-9]\d{8}$/;
    if (!mobileRegex.test(mobile.replace(/\s/g, ""))) {
      return NextResponse.json(
        { error: "সঠিক মোবাইল নাম্বার দিন" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if team name already exists
    const existingTeam = await Team.findOne({ teamName });
    if (existingTeam) {
      return NextResponse.json(
        { error: "এই দলের নাম আগে থেকেই রেজিস্টার্ড" },
        { status: 400 }
      );
    }

    // Check if mobile number already exists
    const existingMobile = await Team.findOne({ mobile });
    if (existingMobile) {
      return NextResponse.json(
        { error: "এই মোবাইল নাম্বার আগে থেকেই রেজিস্টার্ড" },
        { status: 400 }
      );
    }

    // Create new team
    const newTeam = await Team.create({
      name,
      mobile,
      teamName,
      address,
      managerName,
    });

    return NextResponse.json(
      {
        message: "রেজিস্ট্রেশন সফল হয়েছে",
        teamId: newTeam._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "সার্ভারে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}
