import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How authentic are the examination papers in this archive?',
      a: 'All past questions are verified papers administered by the Department of English Language and Literature, Faculty of Arts, Nnamdi Azikiwe University (UNIZIK), Awka. They preserve exact section structures, time allowances, and mark distributions.',
    },
    {
      q: 'How does the Gemini AI Exam Solver work?',
      a: 'The server-side Gemini AI Assistant analyzes the authentic UNIZIK question text against standard marking guidelines to construct an executive essay outline, thesis statement, textual/linguistic evidence, and examiner marking pitfalls.',
    },
    {
      q: 'Can students contribute lecture handouts or past questions?',
      a: 'Yes! Use the "Contribute" button in the top navigation bar. You can specify the course code, lecturer in charge, academic year, and topics. Submissions are saved persistently to the departmental database.',
    },
    {
      q: 'Can I study and view materials offline on campus?',
      a: 'Yes! The archive features local persistence and bookmarking. Any saved materials remain cached in your browser so you can study without continuous internet access.',
    },
    {
      q: 'Which citation standard is recommended for UNIZIK English term papers?',
      a: 'The Department of English Language and Literature at UNIZIK strictly mandates the MLA (Modern Language Association) 9th Edition documentation style for literary and linguistic research papers.',
    },
  ];

  return (
    <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 space-y-2.5">
        <div className="badge-pill bg-emerald-50 text-emerald-800 border border-emerald-200">
          Academic Support
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-slate-900 tracking-tight">
          Frequently asked questions
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 font-sans">
          Everything you need to know about the NASELS UNIZIK Archive platform.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div 
              key={idx}
              className="bento-card overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm sm:text-base font-bold font-editorial text-slate-900">
                  {faq.q}
                </span>
                <span className="p-1 rounded-full bg-slate-100 text-slate-700 shrink-0">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
