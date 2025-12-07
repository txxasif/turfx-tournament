import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Team, { TeamInput } from "@/lib/models/Team";
import { sendTelegramNotification } from "@/lib/telegram";

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

    // SIMPLE BD MOBILE VALIDATION - Accepts any digit after 0
    // Remove spaces and plus sign
    const cleanMobile = mobile.replace(/\s/g, "").replace(/^\+/, "");
    
    // Simple validation: Must be 11 digits starting with 01
    // OR 13 digits starting with 880
    // OR 10 digits starting with 1
    const isValidBDMobile = /^(8801|01|1)\d{9}$/.test(cleanMobile);
    
    if (!isValidBDMobile) {
      return NextResponse.json(
        { error: "সঠিক মোবাইল নাম্বার দিন (উদাহরণ: 01712345678)" },
        { status: 400 }
      );
    }

    // Convert to standard 880 format
    let standardMobile = cleanMobile;
    if (cleanMobile.startsWith("01")) {
      standardMobile = "880" + cleanMobile.substring(1); // 01712345678 -> 8801712345678
    } else if (cleanMobile.startsWith("1") && cleanMobile.length === 10) {
      standardMobile = "880" + cleanMobile; // 1712345678 -> 8801712345678
    }
    // If already 880..., keep it

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
    const existingMobile = await Team.findOne({ 
      mobile: standardMobile 
    });
    
    if (existingMobile) {
      return NextResponse.json(
        { error: "এই মোবাইল নাম্বার আগে থেকেই রেজিস্টার্ড" },
        { status: 400 }
      );
    }

    // Create new team
    const newTeam = await Team.create({
      name,
      mobile: standardMobile,
      teamName,
      address,
      managerName,
    });

    // Send Telegram notification (non-blocking)
    sendTelegramNotification({
      teamName,
      name,
      mobile: standardMobile,
      address,
      managerName,
      registeredAt: new Date().toLocaleString("bn-BD", {
        timeZone: "Asia/Dhaka",
      }),
    }).catch((error) => {
      console.error("Telegram notification failed:", error);
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