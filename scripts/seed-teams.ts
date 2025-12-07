// Script to seed 32 teams into the database
// Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/seed-teams.ts
// Or: npx tsx scripts/seed-teams.ts

import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/turfx_tournament";

// Team Schema (inline to avoid import issues)
const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, unique: true, trim: true },
    teamName: { type: String, required: true, unique: true, trim: true },
    address: { type: String, required: true, trim: true },
    managerName: { type: String, required: true, trim: true },
    registeredAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "confirmed", "rejected"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);

// 32 Teams Data
const teamsData = [
  { name: "রফিকুল ইসলাম", mobile: "01712345601", teamName: "সোনাগাজী ইউনাইটেড", address: "সোনাগাজী, ফেনী", managerName: "আবুল হাসান" },
  { name: "কামরুল হাসান", mobile: "01712345602", teamName: "গ্যালাক্সি স্টার্স", address: "সোনাগাজী, ফেনী", managerName: "জহির উদ্দিন" },
  { name: "মোহাম্মদ আলী", mobile: "01712345603", teamName: "ব্লু টাইগার্স", address: "ফেনী সদর", managerName: "সাইফুল ইসলাম" },
  { name: "আব্দুল করিম", mobile: "01712345604", teamName: "রেড ড্রাগনস", address: "দাগনভূঞা, ফেনী", managerName: "মাসুদ রানা" },
  { name: "শাহিন আলম", mobile: "01712345605", teamName: "গোল্ডেন ইলেভেন", address: "ছাগলনাইয়া, ফেনী", managerName: "রাসেল আহমেদ" },
  { name: "নাসির উদ্দিন", mobile: "01712345606", teamName: "সিলভার নাইটস", address: "পরশুরাম, ফেনী", managerName: "তানভীর হোসেন" },
  { name: "ফারুক আহমেদ", mobile: "01712345607", teamName: "থান্ডার বয়েজ", address: "ফুলগাজী, ফেনী", managerName: "শামীম হোসেন" },
  { name: "জাকির হোসেন", mobile: "01712345608", teamName: "স্টর্ম রাইডার্স", address: "সোনাগাজী, ফেনী", managerName: "মিজানুর রহমান" },
  { name: "আনোয়ার হোসেন", mobile: "01712345609", teamName: "ফায়ার ফক্স", address: "সোনাগাজী, ফেনী", managerName: "হাবিবুর রহমান" },
  { name: "সাইদুর রহমান", mobile: "01712345610", teamName: "আইস ব্রেকার্স", address: "ফেনী সদর", managerName: "আলমগীর হোসেন" },
  { name: "মনির হোসেন", mobile: "01712345611", teamName: "ডার্ক হর্সেস", address: "দাগনভূঞা, ফেনী", managerName: "বাবুল আক্তার" },
  { name: "রাজু আহমেদ", mobile: "01712345612", teamName: "রয়েল কিংস", address: "ছাগলনাইয়া, ফেনী", managerName: "সোহেল রানা" },
  { name: "বাবু মিয়া", mobile: "01712345613", teamName: "ব্ল্যাক প্যান্থার্স", address: "পরশুরাম, ফেনী", managerName: "ইমরান হোসেন" },
  { name: "সুমন আহমেদ", mobile: "01712345614", teamName: "হোয়াইট টাইগার্স", address: "ফুলগাজী, ফেনী", managerName: "রিপন মিয়া" },
  { name: "হাসান মাহমুদ", mobile: "01712345615", teamName: "গ্রিন আর্মি", address: "সোনাগাজী, ফেনী", managerName: "কবির হোসেন" },
  { name: "ইব্রাহিম খলিল", mobile: "01712345616", teamName: "ইয়েলো স্টর্ম", address: "সোনাগাজী, ফেনী", managerName: "আরিফ হোসেন" },
  { name: "আলী আকবর", mobile: "01712345617", teamName: "পার্পল রেইন", address: "ফেনী সদর", managerName: "জাহিদ হাসান" },
  { name: "খালেদ মাহমুদ", mobile: "01712345618", teamName: "অরেঞ্জ ক্রুসেডার্স", address: "দাগনভূঞা, ফেনী", managerName: "নাজমুল হক" },
  { name: "তারেক রহমান", mobile: "01712345619", teamName: "ক্রিমসন টাইড", address: "ছাগলনাইয়া, ফেনী", managerName: "ফয়সাল আহমেদ" },
  { name: "সাজ্জাদ হোসেন", mobile: "01712345620", teamName: "মিডনাইট ওয়ারিয়র্স", address: "পরশুরাম, ফেনী", managerName: "আশরাফুল ইসলাম" },
  { name: "নাঈম ইসলাম", mobile: "01712345621", teamName: "সানরাইজ ইলেভেন", address: "ফুলগাজী, ফেনী", managerName: "মাহবুব আলম" },
  { name: "ফাহিম হাসান", mobile: "01712345622", teamName: "মুনলাইট স্টার্স", address: "সোনাগাজী, ফেনী", managerName: "রাকিব হাসান" },
  { name: "সাব্বির আহমেদ", mobile: "01712345623", teamName: "স্কাই হকস", address: "সোনাগাজী, ফেনী", managerName: "শফিকুল ইসলাম" },
  { name: "রুবেল হোসেন", mobile: "01712345624", teamName: "সী ওয়েভস", address: "ফেনী সদর", managerName: "আনিসুর রহমান" },
  { name: "পলাশ মিয়া", mobile: "01712345625", teamName: "মাউন্টেন লায়নস", address: "দাগনভূঞা, ফেনী", managerName: "দেলোয়ার হোসেন" },
  { name: "জুয়েল রানা", mobile: "01712345626", teamName: "ডেজার্ট ঈগলস", address: "ছাগলনাইয়া, ফেনী", managerName: "মোস্তফা করিম" },
  { name: "শাকিল আহমেদ", mobile: "01712345627", teamName: "জাঙ্গল কিংস", address: "পরশুরাম, ফেনী", managerName: "আজিজুল হক" },
  { name: "মামুন রশীদ", mobile: "01712345628", teamName: "আর্কটিক উলভস", address: "ফুলগাজী, ফেনী", managerName: "শহিদুল ইসলাম" },
  { name: "আশিক মাহমুদ", mobile: "01712345629", teamName: "ট্রপিক্যাল থান্ডার", address: "সোনাগাজী, ফেনী", managerName: "নুরুল আমিন" },
  { name: "সোহাগ মিয়া", mobile: "01712345630", teamName: "নর্দার্ন লাইটস", address: "সোনাগাজী, ফেনী", managerName: "আব্দুল্লাহ আল মামুন" },
  { name: "জিসান আহমেদ", mobile: "01712345631", teamName: "সাউদার্ন ক্রস", address: "ফেনী সদর", managerName: "মাহফুজুর রহমান" },
  { name: "তুহিন মল্লিক", mobile: "01712345632", teamName: "ইস্টার্ন ড্রাগনস", address: "দাগনভূঞা, ফেনী", managerName: "আমিনুল ইসলাম" },
];

async function seedTeams() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Optional: Clear existing teams
    // await Team.deleteMany({});
    // console.log("🗑️  Cleared existing teams");

    console.log("📝 Inserting 32 teams...");
    
    let inserted = 0;
    let skipped = 0;

    for (const teamData of teamsData) {
      try {
        // Check if team already exists
        const existingTeam = await Team.findOne({
          $or: [
            { teamName: teamData.teamName },
            { mobile: teamData.mobile }
          ]
        });

        if (existingTeam) {
          console.log(`⏭️  Skipped: ${teamData.teamName} (already exists)`);
          skipped++;
          continue;
        }

        await Team.create({
          ...teamData,
          status: "confirmed",
          registeredAt: new Date(),
        });
        console.log(`✅ Added: ${teamData.teamName}`);
        inserted++;
      } catch (err) {
        console.error(`❌ Error adding ${teamData.teamName}:`, err);
      }
    }

    console.log("\n========================================");
    console.log(`✅ Successfully inserted: ${inserted} teams`);
    console.log(`⏭️  Skipped (duplicates): ${skipped} teams`);
    console.log("========================================\n");

  } catch (error) {
    console.error("❌ Error seeding teams:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  }
}

// Run the seed function
seedTeams();
