import React from 'react';
import { Star, Quote, Award } from 'lucide-react';

export const ScholarTestimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "The past question repository with compulsory question breakdowns was indispensable for my ENG 301 and ENG 313 exams. It accurately mirrors the department's exam standards.",
      author: "Chidera Emmanuel Okonkwo",
      role: "400 Level (Literature Track) • First Class Scholar",
      level: "400L",
    },
    {
      quote: "Having prescribed novels like Arrow of God and Purple Hibiscus with ready thematic matrices and MLA citations cut my term paper research time in half.",
      author: "Blessing N. Chukwu",
      role: "300 Level Penultimate • NASELS Academic Committee",
      level: "300L",
    },
    {
      quote: "As a freshman in ENG 101 Grammar and ENG 103 Phonetics, this archive helped me understand exactly how lecturers grade concord and clause structures.",
      author: "Emeka Somtochukwu",
      role: "200 Level • Departmental Course Representative",
      level: "200L",
    },
  ];

  return (
    <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-xl mx-auto mb-10 space-y-2.5">
        <div className="badge-pill bg-[#E7F3EC] text-[#0E5C36] border border-[#0E5C36]/20">
          Student Voices
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-editorial text-[#141A16] tracking-[-0.02em] leading-snug [text-wrap:balance]">
          Empowering academic excellence in{" "}
          <span className="italic text-[#0E5C36] whitespace-nowrap">Awka and beyond</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((t, idx) => (
          <div 
            key={idx}
            className="bento-card p-5 sm:p-7 flex flex-col justify-between space-y-5 sm:space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#2C3530] leading-relaxed font-editorial italic">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#EAE5D9] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#141A16] font-sans">{t.author}</h4>
                <p className="text-[10px] text-[#5A6860] font-sans">{t.role}</p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E7F3EC] border border-[#0E5C36]/20 text-[10px] font-bold text-[#0E5C36] font-mono">
                {t.level}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
