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
    // Supports: 01XXXXXXXXX (11 digits), +8801XXXXXXXXX (15 digits with +880), 8801XXXXXXXXX (13 digits)
    const cleanMobile = mobile.replace(/\s/g, "").replace(/^\+/, "");
    const mobileRegex = /^(880)?01[3-9]\d{7}$/;
    if (!mobileRegex.test(cleanMobile)) {
      return NextResponse.json(
        { error: "সঠিক মোবাইল নাম্বার দিন (01XXXXXXXXX বা +8801XXXXXXXXX)" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if 32 teams already registered
    const teamCount = await Team.countDocuments();
    if (teamCount >= 32) {
      return NextResponse.json(
        { error: "রেজিস্ট্রেশন বন্ধ করা হয়েছে। ৩২টি দল সম্পূর্ণ হয়েছে" },
        { status: 400 }
      );
    }

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
