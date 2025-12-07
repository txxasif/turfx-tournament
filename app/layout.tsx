import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "গ্যালাক্সি মিনিবার ফুটবল টুর্নামেন্ট ২০২৫",
  description:
    "গ্যালাক্সি মিনিবার ফুটবল টুর্নামেন্ট সিজন ২০২৫ - টার্ফ এক্স সোনাগাজী। চ্যাম্পিয়ন পুরস্কার ২৫,০০০ টাকা।",
  keywords: [
    "ফুটবল",
    "টুর্নামেন্ট",
    "সোনাগাজী",
    "গ্যালাক্সি মিনিবার",
    "টার্ফ এক্স",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body
        className={`${notoSansBengali.variable} font-sans bg-slate-950 text-slate-300 antialiased selection:bg-emerald-500/30 selection:text-emerald-200`}
      >
        {children}
      </body>
    </html>
  );
}
