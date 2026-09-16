import React from 'react';
import { 
  Award, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Layers, 
  Clock, 
  HelpCircle,
  Eye,
  Bot
} from 'lucide-react';

interface BentoFeaturesProps {
  onOpenStudyGuide: () => void;
  onExplorePQs: () => void;
  onExploreTexts: () => void;
  onBrowseCourses: () => void;
}

export const BentoFeatures: React.FC<BentoFeaturesProps> = ({
  onOpenStudyGuide,
  onExplorePQs,
  onExploreTexts,
  onBrowseCourses,
}) => {
  return (
    <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="badge-pill bg-[#E7F3EC] text-[#0E5C36] border border-[#0E5C36]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Departmental Excellence</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold font-editorial text-[#141A16] tracking-tight">
          Why UNIZIK scholars rely on the <br className="hidden sm:inline" />
          <span className="italic text-[#0E5C36]">NASELS Archive</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#525D56] font-sans">
          Purpose-built for undergraduate and postgraduate scholars in the Department of English Language & Literature.
        </p>
      </div>

      {/* Bento Grid Layout (2x2 / Asymmetric cards inspired by Zova) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6">
        
        {/* Bento 1: Authentic Past Question Bank (Col 7) */}
        <div className="md:col-span-7 bento-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0E5C36] text-white flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#141A16]">
              Authentic Examination Papers
            </h3>
            <p className="text-xs sm:text-sm text-[#2E3A33] leading-relaxed">
              Access genuine UNIZIK semester examination papers across all levels. Each paper includes 
              full instructions, time allowances, compulsory question breakdowns, and examiner's marking criteria.
            </p>
          </div>

          {/* Micro-UI Preview Card */}
          <div className="bg-[#FAF7EE] p-4 rounded-2xl border border-[#EAE5D9] space-y-2.5 text-xs font-sans">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#141A16] text-white font-mono text-[10px] font-bold">
                  ENG 101
                </span>
                <span className="font-semibold text-[#141A16]">Practical English Grammar</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-[#0E5C36] border border-[#0E5C36]/20 text-[10px] font-bold shadow-2xs">
                COMPULSORY • 30M
              </span>
            </div>
            <p className="text-[#5A6860] text-[11px] italic font-editorial">
              "(a) Define Subject-Verb Concord and explain five distinct types of concord in English..."
            </p>
            <div className="pt-1 flex items-center gap-2 text-[11px] text-[#0E5C36] font-semibold">
              <Eye className="w-3.5 h-3.5" />
              <span>Model Answer & Marking Points Available</span>
            </div>
          </div>

          <div>
            <button
              onClick={onExplorePQs}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E5C36] hover:text-[#083820] underline cursor-pointer"
            >
              <span>Explore Past Questions Bank</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bento 2: Gemini AI Scholastic Assistant (Col 5) */}
        <div className="md:col-span-5 bento-card p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-br from-white via-white to-[#E7F3EC]/30">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#141A16] text-white flex items-center justify-center shadow-xs">
              <Bot className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#141A16]">
              Gemini AI Study Companion
            </h3>
            <p className="text-xs sm:text-sm text-[#2E3A33] leading-relaxed">
              Server-side Gemini AI integration tuned to UNIZIK marking standards. Solves past questions, 
              constructs essay thesis statements, and extracts high-yield revision practice questions.
            </p>
          </div>

          {/* Micro-UI Preview Card */}
          <div className="bg-[#141A16] text-white p-4 rounded-2xl border border-white/10 space-y-2 text-xs font-sans shadow-md">
            <div className="flex items-center justify-between text-[11px] text-emerald-300">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span className="font-semibold">NASELS Scholastic AI</span>
              </span>
              <span className="font-mono text-[9px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-200 border border-emerald-800">
                gemini-2.5-flash
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-editorial">
              "Thesis: Achebe constructs Okonkwo's downfall as the tragic collision between rigid hyper-masculinity and historical inevitability..."
            </p>
          </div>

          <div>
            <button
              onClick={onOpenStudyGuide}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E5C36] hover:text-[#083820] underline cursor-pointer"
            >
              <span>View Exam Answering Strategies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bento 3: Prescribed African & World Literature (Col 5) */}
        <div className="md:col-span-5 bento-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#6B2361] text-white flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#141A16]">
              Recommended Literature Companion
            </h3>
            <p className="text-xs sm:text-sm text-[#2E3A33] leading-relaxed">
              Detailed character indices, thematic matrices, and key examination quotes for Achebe, Soyinka, 
              Clark, Adichie, and prescribed European classics.
            </p>
          </div>

          {/* Micro-UI Chips */}
          <div className="bg-[#FAF7EE] p-4 rounded-2xl border border-[#EAE5D9] space-y-2 text-xs">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B2361]">
              Featured Analyses:
            </div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-white text-[#6B2361] border border-[#6B2361]/20 text-[10px] font-medium shadow-2xs">
                Things Fall Apart
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-[#6B2361] border border-[#6B2361]/20 text-[10px] font-medium shadow-2xs">
                Death & The King's Horseman
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-[#6B2361] border border-[#6B2361]/20 text-[10px] font-medium shadow-2xs">
                Purple Hibiscus
              </span>
            </div>
          </div>

          <div>
            <button
              onClick={onExploreTexts}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B2361] hover:text-[#521949] underline cursor-pointer"
            >
              <span>Explore Literary Analyses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bento 4: Faculty of Arts Course Directory (Col 7) */}
        <div className="md:col-span-7 bento-card p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E7F3EC] text-[#0E5C36] border border-[#0E5C36]/20 flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-editorial text-[#141A16]">
              Complete Faculty Course Directory
            </h3>
            <p className="text-xs sm:text-sm text-[#2E3A33] leading-relaxed">
              Every course outline from 100 Level to 400 Level with credit units, lecturers in charge, 
              core weekly topics, and prescribed reading lists.
            </p>
          </div>

          {/* Micro-UI Course Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs font-sans">
            <div className="p-3 rounded-xl bg-[#FAF7EE] border border-[#EAE5D9]">
              <div className="font-bold text-[#141A16]">100 Level</div>
              <div className="text-[10px] text-[#5A6860]">14 Courses</div>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7EE] border border-[#EAE5D9]">
              <div className="font-bold text-[#141A16]">200 Level</div>
              <div className="text-[10px] text-[#5A6860]">10 Courses</div>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7EE] border border-[#EAE5D9]">
              <div className="font-bold text-[#141A16]">300 Level</div>
              <div className="text-[10px] text-[#5A6860]">9 Courses</div>
            </div>
            <div className="p-3 rounded-xl bg-[#FAF7EE] border border-[#EAE5D9]">
              <div className="font-bold text-[#141A16]">400 Level</div>
              <div className="text-[10px] text-[#5A6860]">7 Courses</div>
            </div>
          </div>

          <div>
            <button
              onClick={onBrowseCourses}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E5C36] hover:text-[#083820] underline cursor-pointer"
            >
              <span>View Course Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
