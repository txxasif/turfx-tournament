import { Phone } from "lucide-react";

const contacts = [
  { name: "মাইনুল", phone: "01839759953", label: "বিকাশ পেমেন্ট" },
  { name: "নাজমুল", phone: "01864726073", label: "আয়োজক" },
  { name: "ইব্রাহিম", phone: "01868685752", label: "আয়োজক" },
];

export const Contact = () => {
  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-white mb-4">যোগাযোগ</h2>
            <p className="text-slate-500 font-light">
              আপনার দলের এন্ট্রি নিশ্চিত করতে কল করুন
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contacts.map((person, idx) => (
              <a
                key={idx}
                href={`tel:${person.phone}`}
                className="group glass-panel p-8 rounded-xl text-center hover:bg-white/[0.05] transition-all duration-300"
              >
                <h3 className="text-xl font-medium text-white mb-2">
                  {person.name}
                </h3>
                <div className="flex items-center justify-center gap-2 text-emerald-400 mb-3">
                  <Phone size={14} />
                  <span className="font-mono text-lg">{person.phone}</span>
                </div>
                <span className="text-xs text-slate-600 uppercase tracking-widest group-hover:text-slate-500 transition-colors">
                  {person.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
