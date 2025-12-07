const dates = [
  { label: "এন্ট্রি ডেডলাইন", date: "১৮ ডিসেম্বর", sub: "२०२५" },
  { label: "ড্র অনুষ্ঠিত", date: "१९ ডিসেম্বর", sub: "२०२५" },
  {
    label: "প্রথম ম্যাচ",
    date: "२० ডিসেম্বর",
    sub: "२०२५",
    highlight: true,
  },
];

export const KeyDates = () => {
  return (
    <section className="py-12 border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24">
          {dates.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group cursor-default"
            >
              <span
                className={`text-xs uppercase tracking-wider mb-2 ${
                  item.highlight ? "text-emerald-500" : "text-slate-500"
                }`}
              >
                {item.label}
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-3xl md:text-4xl font-light ${
                    item.highlight ? "text-white" : "text-slate-300"
                  }`}
                >
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
