const rulesList = [
  "খেলা নক-আউট পদ্ধতিতে অনুষ্ঠিত হবে।",
  "প্রতি দলে ৬ জন মাঠে এবং ৩ জন অতিরিক্ত খেলোয়াড় থাকবে।",
  "এক দলের তালিকাভুক্ত খেলোয়াড় অন্য দলে খেলতে পারবে না।",
  "প্রত্যেক দলের জন্য নির্দিষ্ট জার্সি পরিধান বাধ্যতামূলক।",
  "ম্যাচ চলাকালীন টার্ফের ভিতর খেলোয়াড় ও ম্যানেজার ছাড়া কেউ থাকবে না।",
  "রেফারীর সিদ্ধান্তই চূড়ান্ত বলে গণ্য হবে।",
  "ম্যাচ শুরুর ২০ মিনিট পূর্বে রিপোর্ট করতে হবে।",
  "খেলার বল কমিটি সরবরাহ করবে।",
  "প্রতি ম্যাচ ফি ৫০০ টাকা।",
  "হলুদ কার্ড ২০০ টাকা, লাল কার্ড ৩০০ টাকা জরিমানা।",
  "উশৃঙ্খল আচরণের জন্য দল বা খেলোয়াড় বহিষ্কার হতে পারে।",
  "ম্যাচের সময়কাল ২০+৫+২০ মিনিট।",
  "খেলাটি সম্পূর্ণ খালি পায়ে খেলতে হবে।",
];

export const Rules = () => {
  return (
    <section id="rules" className="py-24 bg-slate-900/20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-light text-white mb-12 text-center">
            নিয়মাবলী
          </h2>

          <div className="grid gap-6">
            {rulesList.map((rule, index) => (
              <div
                key={index}
                className="group flex items-start gap-4 p-4 hover:bg-white/[0.02] rounded-lg transition-colors border-b border-white/[0.02] last:border-0"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs text-slate-500 font-mono group-hover:border-emerald-500/50 group-hover:text-emerald-500 transition-colors">
                  {index + 1}
                </span>
                <p className="text-slate-400 font-light leading-relaxed group-hover:text-slate-200 transition-colors">
                  {rule}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-xs text-slate-600">
            কমিটি যেকোনো নিয়ম পরিবর্তন বা পরিবর্ধন করার ক্ষমতা রাখে।
          </p>
        </div>
      </div>
    </section>
  );
};
