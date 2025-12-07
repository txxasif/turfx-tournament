import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Team from "@/lib/models/Team";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "টিম আইডি প্রয়োজন" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      return NextResponse.json(
        { error: "টিম পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "টিম সফলভাবে মুছে ফেলা হয়েছে" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting team:", error);
    return NextResponse.json(
      { error: "সার্ভারে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}
