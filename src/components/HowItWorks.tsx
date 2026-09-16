import React from 'react';
import { Layers, BookOpen, Award, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onSelectLevel: (lvl: any) => void;
  onExploreArchive: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({
  onSelectLevel,
  onExploreArchive,
}) => {
  const steps = [
    {
      number: '01',
      title: 'Choose Academic Level',
      desc: 'Filter directly by 100L Freshmen through 400L Finalist or select your academic track (Literature or Linguistics).',
      tag: 'Step One',
      icon: Layers,
    },
    {
      number: '02',
      title: 'Review Verified Handouts',
      desc: 'Read authentic departmental lecture notes, course outlines, and prescribed literary texts with full thematic breakdowns.',
      tag: 'Step Two',
      icon: BookOpen,
    },
    {
      number: '03',
      title: 'Master Past Questions with AI',
      desc: 'Practice with genuine UNIZIK semester examination papers and consult the Gemini AI Exam Assistant for model answers.',
      tag: 'Step Three',
      icon: Award,
    },
  ];

  return (
    <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-2.5">
        <div className="badge-pill bg-[#E7F3EC] text-[#0E5C36] border border-[#0E5C36]/20 shadow-2xs">
          Academic Workflow
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-[#141A16] tracking-tight">
          Excel in your studies in <span className="italic text-[#0E5C36]">3 simple steps</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#5A6860] font-sans">
          Designed for seamless revision, exam preparation, and departmental research.
        </p>
      </div>

      {/* 3 Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div 
              key={step.number}
              className="bento-card p-6 sm:p-7 flex flex-col justify-between space-y-6 relative overflow-hidden group"
            >
              {/* Step Number Watermark */}
              <span className="absolute top-4 right-5 text-4xl font-bold font-editorial text-[#FAF7EE] group-hover:text-[#E7F3EC] transition-colors select-none">
                {step.number}
              </span>

              <div className="space-y-3 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-[#E7F3EC] text-[#0E5C36] border border-[#0E5C36]/20 flex items-center justify-center font-mono font-bold text-sm shadow-2xs">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-editorial text-[#141A16]">
                  {step.title}
                </h3>
                <p className="text-xs text-[#2E3A33] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EAE5D9] text-xs font-semibold text-[#0E5C36] flex items-center justify-between">
                <span>{step.tag}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
