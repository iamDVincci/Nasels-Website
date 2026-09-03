import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Award, 
  BellRing,
  ArrowRight,
  Library
} from 'lucide-react';
import { AcademicLevel } from '../types';
import { NaselsCrest } from './NaselsCrest';

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
    <div className="space-y-4">
      {/* Notice Alert Ticker */}
      <div className="bg-[#FAF7EE] border border-[#F0EAD6] rounded-xl p-3 sm:px-5 sm:py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#141A16] shadow-2xs font-sans">
        <div className="flex items-center gap-2.5">
          <span className="p-1 rounded-[4px] bg-[#0E5C36] text-white font-bold shrink-0">
            <BellRing className="w-3.5 h-3.5 text-white" />
          </span>
          <p className="font-medium text-[#2C3530]">
            <strong className="text-[#141A16] font-semibold">NASELS Academic Notice:</strong> First Semester Examinations Past Question Bank updated with 2023/2024 papers & model marking guides.
          </p>
        </div>

        <button 
          onClick={onOpenStudyGuide}
          className="inline-flex items-center gap-1 font-semibold text-[#0E5C36] hover:text-[#083820] underline text-xs font-sans cursor-pointer"
        >
          <span>View Exam Answering Strategies</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Main Hero Card */}
      <div className="relative overflow-hidden bg-[#F4EFE6] text-[#141A16] rounded-2xl border border-[#F0EAD6] p-6 sm:p-10 shadow-xs">
        {/* Subtle decorative background ring */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#0E5C36]/5 rounded-full pointer-events-none select-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-white text-[#0E5C36] border border-[#F0EAD6] text-xs font-semibold shadow-2xs font-sans">
              <Library className="w-3.5 h-3.5 text-[#0E5C36]" />
              <span>Official Departmental Repository</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-editorial tracking-tight text-[#141A16] leading-tight">
              Preserving the Legacy of the <span className="italic text-[#141A16]">Written Word.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#2C3530] font-sans leading-relaxed max-w-xl">
              Department of English Language & Literature, Faculty of Arts, Nnamdi Azikiwe University, Awka.
              Digital repository for authenticated literary texts, comprehensive lecture notes, course outlines, and past examination questions.
            </p>

            {/* Quick Level Navigation Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2 font-sans">
              <span className="text-xs uppercase tracking-wider text-[#525D56] font-bold mr-1">Quick Jump:</span>
              {(['100', '200', '300', '400'] as AcademicLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => onSelectLevel(lvl)}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-[6px] bg-white hover:bg-[#E7F3EC] hover:text-[#0E5C36] hover:border-[#0E5C36] border border-[#F0EAD6] text-[#2C3530] transition-all shadow-2xs cursor-pointer"
                >
                  {lvl} Level
                </button>
              ))}
            </div>
          </div>

          {/* Official Departmental Crest Showcase Badge */}
          <div className="hidden sm:flex flex-col items-center bg-white p-4.5 rounded-2xl border border-[#F0EAD6] shadow-sm shrink-0 select-none group hover:border-[#0E5C36]/40 transition-all">
            <NaselsCrest size={100} className="shadow-xs mb-2.5" />
            <div className="text-center font-sans">
              <div className="text-[11px] font-bold text-[#0E5C36] uppercase tracking-wider">
                NASELS Emblem
              </div>
              <div className="text-[10px] text-[#525D56]">
                UNIZIK Chapter
              </div>
              <div className="text-[9px] text-[#6B2361] font-editorial italic mt-0.5">
                "Eloquentia et Sapientia"
              </div>
            </div>
          </div>
        </div>

        {/* Live Academic Metric Counter Bar */}
        <div className="mt-8 pt-6 border-t border-[#F0EAD6] grid grid-cols-2 sm:grid-cols-4 gap-4 font-sans">
          <div className="bg-white p-4 rounded-xl border border-[#F0EAD6] shadow-2xs hover:border-[#0E5C36] hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-2 text-[#0E5C36] mb-1.5">
              <div className="w-7 h-7 rounded-[6px] bg-[#E7F3EC] flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#0E5C36]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E5C36]">Core Texts</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-editorial text-[#141A16]">{totalTexts}</div>
            <p className="text-xs text-[#525D56]">Prose, Drama & Poetry</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#F0EAD6] shadow-2xs hover:border-[#0E5C36] hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-2 text-[#0E5C36] mb-1.5">
              <div className="w-7 h-7 rounded-[6px] bg-[#E7F3EC] flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#0E5C36]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E5C36]">Lecture Notes</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-editorial text-[#141A16]">{totalNotes}</div>
            <p className="text-xs text-[#525D56]">Syllabus Handouts</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#F0EAD6] shadow-2xs hover:border-[#0E5C36] hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-2 text-[#0E5C36] mb-1.5">
              <div className="w-7 h-7 rounded-[6px] bg-[#E7F3EC] flex items-center justify-center">
                <Award className="w-4 h-4 text-[#0E5C36]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E5C36]">Past Questions</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-editorial text-[#141A16]">{totalPQs}</div>
            <p className="text-xs text-[#525D56]">Model Marking Guides</p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#F0EAD6] shadow-2xs hover:border-[#0E5C36] hover:-translate-y-0.5 transition-all">
            <div className="flex items-center gap-2 text-[#6B2361] mb-1.5">
              <div className="w-7 h-7 rounded-[6px] bg-[#F6EAF4] flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-[#6B2361]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B2361]">Curriculum</span>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-editorial text-[#141A16]">16+</div>
            <p className="text-xs text-[#525D56]">100L - 400L Syllabi</p>
          </div>
        </div>
      </div>
    </div>
  );
};
