interface TelegramNotificationData {
  teamName: string;
  name: string;
  mobile: string;
  address: string;
  managerName: string;
  registeredAt: string;
}

export async function sendTelegramNotification(
  data: TelegramNotificationData
): Promise<{ success: boolean; error?: string }> {
  const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  const TELEGRAM_ENABLED = process.env.TELEGRAM_ENABLED === "true";

  if (!TELEGRAM_ENABLED || !TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return { success: false, error: "Telegram not configured" };
  }

  const message = `🎉 <b>নতুন দল রেজিস্ট্রেশন!</b>

⚽ <b>দলের নাম:</b> ${data.teamName}
👤 <b>যোগাযোগ:</b> ${data.name}
📞 <b>মোবাইল:</b> ${data.mobile}
📍 <b>ঠিকানা:</b> ${data.address}
👔 <b>ম্যানেজার:</b> ${data.managerName}
📅 <b>সময়:</b> ${data.registeredAt}

━━━━━━━━━━━━━━━━━
🏆 গ্যালাক্সি মিনিবার ফুটবল টুর্নামেন্ট`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    const result = await response.json();

    if (!result.ok) {
      throw new Error(result.description || "Telegram API error");
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
