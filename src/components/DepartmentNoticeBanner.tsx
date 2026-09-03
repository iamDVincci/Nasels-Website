import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Award, 
  Sparkles, 
  BellRing,
  ArrowRight,
  Library
} from 'lucide-react';
import { AcademicLevel } from '../types';

interface DepartmentNoticeBannerProps {
  totalItems: number;
  totalTexts: number;
  totalNotes: number;
  totalPQs: number;
  onSelectLevel: (lvl: AcademicLevel) => void;
  onOpenStudyGuide: () => void;
}

export const DepartmentNoticeBanner: React.FC<DepartmentNoticeBannerProps> = ({
  totalItems,
  totalTexts,
  totalNotes,
  totalPQs,
  onSelectLevel,
  onOpenStudyGuide
}) => {
  return (
    <div className="space-y-5">
      {/* Notice Alert Ticker */}
      <div className="bg-[#F5F1E9] border border-[#DCD3C1] rounded-2xl p-3.5 sm:px-5 sm:py-3 flex flex-wrap items-center justify-between gap-3 text-xs text-[#3E2F24] shadow-xs">
        <div className="flex items-center gap-2.5">
          <span className="p-1 rounded-full bg-[#8B7355] text-white font-bold shrink-0">
            <BellRing className="w-3.5 h-3.5 text-white" />
          </span>
          <p className="font-medium">
            <strong className="text-[#3E2F24] font-semibold">NASELS Academic Notice:</strong> First Semester Examinations Past Question Bank updated with 2023/2024 papers & model marking guides.
          </p>
        </div>

        <button 
          onClick={onOpenStudyGuide}
          className="inline-flex items-center gap-1 font-semibold text-[#8B7355] hover:text-[#746046] underline text-xs font-serif"
        >
          <span>View Exam Answering Strategies</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Hero Card */}
      <div className="relative overflow-hidden bg-[#F5F1E9] text-[#3E2F24] rounded-2xl border border-[#DCD3C1] p-6 sm:p-10 shadow-xs">
        {/* Subtle decorative background circle matching Natural Tones design HTML */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#DCD3C1] rounded-full opacity-30 pointer-events-none select-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#8B7355] border border-[#DCD3C1] text-xs font-semibold shadow-2xs">
            <Library className="w-3.5 h-3.5 text-[#8B7355]" />
            <span className="font-serif">Official Departmental Repository</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif tracking-tight text-[#3E2F24] leading-tight">
            Preserving the Legacy of the <span className="italic text-[#8B7355]">Written Word.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#5A4638] font-serif leading-relaxed max-w-2xl">
            Department of English Language & Literature, Faculty of Arts, Nnamdi Azikiwe University, Awka.
            Digital access to recommended literary texts, comprehensive lecture notes, course outlines, and past examination questions.
          </p>

          {/* Quick Level Navigation Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#8B7355] font-serif font-bold mr-1">Quick Jump:</span>
            {(['100', '200', '300', '400'] as AcademicLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => onSelectLevel(lvl)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white hover:bg-[#8B7355] hover:text-white border border-[#DCD3C1] text-[#3E2F24] transition-all shadow-2xs font-serif"
              >
                {lvl} Level
              </button>
            ))}
          </div>
        </div>

        {/* Live Academic Metric Counter Bar */}
        <div className="mt-8 pt-6 border-t border-[#DCD3C1] grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-[#DCD3C1] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-2 text-[#8B7355] mb-1.5">
              <div className="w-7 h-7 rounded-md bg-[#F5F1E9] flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#8B7355]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B7355] font-serif">Core Texts</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#3E2F24]">{totalTexts}</div>
            <p className="text-xs text-[#5A4638] font-serif">Prose, Drama & Poetry</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#DCD3C1] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-2 text-[#8B7355] mb-1.5">
              <div className="w-7 h-7 rounded-md bg-[#F5F1E9] flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#8B7355]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B7355] font-serif">Lecture Notes</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#3E2F24]">{totalNotes}</div>
            <p className="text-xs text-[#5A4638] font-serif">Syllabus Handouts</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#DCD3C1] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-2 text-[#8B7355] mb-1.5">
              <div className="w-7 h-7 rounded-md bg-[#F5F1E9] flex items-center justify-center">
                <Award className="w-4 h-4 text-[#8B7355]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B7355] font-serif">Past Questions</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#3E2F24]">{totalPQs}</div>
            <p className="text-xs text-[#5A4638] font-serif">Model Marking Guides</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#DCD3C1] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-2 text-[#8B7355] mb-1.5">
              <div className="w-7 h-7 rounded-md bg-[#F5F1E9] flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-[#8B7355]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B7355] font-serif">Curriculum</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-[#3E2F24]">16+</div>
            <p className="text-xs text-[#5A4638] font-serif">100L - 400L Syllabi</p>
          </div>
        </div>
      </div>
    </div>
  );
};
