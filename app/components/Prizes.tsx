import { Trophy, Award, Star, Target, Medal } from "lucide-react";

const individualAwards = [
  { text: "প্রত্যেক ম্যাচে ম্যান অফ দ্যা ম্যাচ", icon: Star },
  { text: "প্লেয়ার অফ দ্যা টুর্নামেন্ট", icon: Award },
  { text: "সেরা গোল কিপার", icon: Medal },
  { text: "টপ গোল স্কোরার", icon: Target },
];

export const Prizes = () => {
  return (
    <section id="prizes" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="inline-block text-emerald-500 font-medium tracking-[0.2em] text-xs uppercase mb-4">
            পুরস্কার
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            চ্যাম্পিয়নশিপ প্রাইজ
          </h2>
        </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Champion Card */}
          <div className="bg-linear-to-br from-yellow-500/10 via-emerald-500/5 to-transparent border border-yellow-500/20 p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:border-yellow-500/40 transition-all duration-500">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 rounded-full blur-3xl group-hover:bg-yellow-500/30 transition-all duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Trophy size={18} className="text-yellow-500" />
                <span className="text-yellow-500 font-semibold tracking-wide uppercase text-xs">
                  চ্যাম্পিয়ন
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
                ২৫,০০০/-
              </h3>
              <p className="text-slate-400 text-sm">+ ট্রফি</p>
            </div>
          </div>

          {/* Runner Up Card */}
          <div className="bg-slate-900/50 border border-white/5 p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Medal size={18} className="text-slate-400" />
                <span className="text-slate-400 font-medium uppercase text-xs tracking-wide">
                  রানার্সআপ
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-200 mb-3">
                ১৭,০০০/-
              </h3>
              <p className="text-slate-500 text-sm">+ ট্রফি</p>
            </div>
          </div>
        </div>

        {/* Individual Awards */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h4 className="text-xl text-white font-medium">বিশেষ পুরস্কার</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {individualAwards.map((award, i) => (
              <div
                key={i}
                className="group bg-slate-900/30 border border-white/5 rounded-xl p-5 text-center hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <award.icon size={18} className="text-emerald-500" />
                </div>
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  {award.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
