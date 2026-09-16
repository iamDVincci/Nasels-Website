import React, { useState } from 'react';
import { 
  Library, 
  ArrowRight, 
  Sparkles, 
  Award, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Clock, 
  ChevronRight,
  GraduationCap,
  Star,
  Users,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { AcademicLevel, ArchiveItem } from '../types';
import { NaselsCrest } from './NaselsCrest';

interface HeroShowcaseProps {
  totalItems: number;
  totalPQs: number;
  totalTexts: number;
  totalNotes: number;
  onSelectLevel: (lvl: AcademicLevel) => void;
  onExploreArchive: () => void;
  onBrowseCourses: () => void;
  onOpenStudyGuide: () => void;
  onSelectItem?: (item: ArchiveItem) => void;
}

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({
  totalItems,
  totalPQs,
  totalTexts,
  totalNotes,
  onSelectLevel,
  onExploreArchive,
  onBrowseCourses,
  onOpenStudyGuide,
}) => {
  // Showcase dashboard active preview tab (100L, 200L, 300L, 400L)
  const [activeLevelTab, setActiveLevelTab] = useState<'100' | '200' | '300' | '400'>('100');

  const levelDetails = {
    '100': {
      title: '100 Level (Freshmen Archive)',
      focus: 'Foundational Grammar, Prose Fiction & Phonetics',
      courses: ['ENG 101 (Grammar)', 'ENG 111 (Prose)', 'ENG 113 (Poetry)', 'ENG 103 (Phonetics)'],
      pqs: '6 Verified Papers',
      geminiHighlights: 'Concord & Clause Tree Generation',
      badge: 'Freshmen Vault',
    },
    '200': {
      title: '200 Level (Sophomore Archive)',
      focus: 'African Prose, Drama & Structural Syntax',
      courses: ['ENG 211 (African Prose)', 'ENG 212 (African Drama)', 'ENG 202 (Syntax)', 'ENG 221 (Oral Lit)'],
      pqs: '5 Verified Papers',
      geminiHighlights: 'Achebe & Soyinka Critical Matrix',
      badge: 'Sophomore Vault',
    },
    '300': {
      title: '300 Level (Penultimate Archive)',
      focus: 'Critical Theory, Transformational Syntax & Semantics',
      courses: ['ENG 301 (Adv Syntax)', 'ENG 313 (Literary Theory)', 'ENG 303 (Semantics)', 'ENG 322 (Nigerian Lit)'],
      pqs: '5 Verified Papers',
      geminiHighlights: 'X-Bar Schemas & Marxist Literary Critique',
      badge: 'Penultimate Vault',
    },
    '400': {
      title: '400 Level (Final Year Archive)',
      focus: 'Discourse Analysis, Stylistics & B.A. Long Essay',
      courses: ['ENG 402 (Stylistics)', 'ENG 411 (Postmodern Lit)', 'ENG 490 (Long Essay/Thesis)'],
      pqs: '4 Verified Papers',
      geminiHighlights: 'MLA 9th Edition Thesis Bibliography',
      badge: 'Graduating Scholars',
    },
  };

  const current = levelDetails[activeLevelTab];

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      {/* Background Subtle Radial Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none hero-glow -z-10 select-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header: Badge, Main Headline, Subtext */}
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
          
          {/* Announcement Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>NASELS UNIZIK Academic Archive & Past Questions Bank</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-600" />
          </div>

          {/* Primary Punchy Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-editorial text-slate-900 tracking-tight leading-[1.12]">
            Academic insight for modern <br className="hidden sm:inline" />
            <span className="italic text-[#0E5C36]">literary scholarship.</span>
          </h1>

          {/* Subtitle description */}
          <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed max-w-2xl mx-auto font-normal">
            The official academic repository of the Department of English Language & Literature, 
            Nnamdi Azikiwe University, Awka. Access authenticated course outlines, past examination papers 
            with examiner marking schemes, and Gemini AI study breakdowns.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 font-sans">
            <button
              onClick={onExploreArchive}
              className="px-6 py-3 rounded-full bg-[#0E5C36] hover:bg-[#083820] text-white font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg inline-flex items-center gap-2 cursor-pointer group"
            >
              <span>Explore Archive Vault</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={onBrowseCourses}
              className="px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold text-xs sm:text-sm transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-emerald-700" />
              <span>Browse Course Outlines</span>
            </button>
          </div>

          {/* Trust Metric Row */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-slate-600 font-sans">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span className="font-semibold text-slate-900">Faculty Verified</span> Syllabus
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-700" />
              <span className="font-semibold text-slate-900">1,200+</span> Scholars Supported
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#6B2361]" />
              <span className="font-semibold text-slate-900">Gemini AI</span> Model Answers
            </div>
          </div>
        </div>

        {/* Centerpiece Showcase: Floating Interactive Mockup Card */}
        <div className="mt-10 sm:mt-14 relative">
          
          {/* Main Floating Mockup Card */}
          <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl overflow-hidden transition-all">
            
            {/* Top Bar of the Mockup: Level Switcher Tabs */}
            <div className="bg-slate-50/90 border-b border-slate-200 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <NaselsCrest size={28} className="shrink-0" />
                <span className="text-xs font-bold font-editorial text-slate-900">
                  NASELS Interactive Vault
                </span>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {current.badge}
                </span>
              </div>

              {/* Level Segmented Controls */}
              <div className="flex items-center bg-white p-1 rounded-full border border-slate-200 shadow-xs text-xs font-sans">
                {(['100', '200', '300', '400'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setActiveLevelTab(lvl);
                      onSelectLevel(lvl);
                    }}
                    className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      activeLevelTab === lvl
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lvl}L
                  </button>
                ))}
              </div>
            </div>

            {/* Showcase Card Interior Content */}
            <div className="p-5 sm:p-8 space-y-6">
              
              {/* Stat Pillars Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between text-slate-500 text-xs">
                    <span>Verified Items</span>
                    <Library className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-editorial text-slate-900">
                    {totalItems}+
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium">100% Course Outlines</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between text-slate-500 text-xs">
                    <span>Past Exam Papers</span>
                    <Award className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-editorial text-slate-900">
                    {totalPQs} Papers
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium">With Mark Schemes</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between text-slate-500 text-xs">
                    <span>Prescribed Texts</span>
                    <BookOpen className="w-3.5 h-3.5 text-[#6B2361]" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-editorial text-slate-900">
                    {totalTexts} Works
                  </div>
                  <div className="text-[11px] text-[#6B2361] font-medium">Thematic Matrices</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between text-slate-500 text-xs">
                    <span>Gemini AI Tutor</span>
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-editorial text-slate-900">
                    Available
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium">Model Solutions</div>
                </div>
              </div>

              {/* Active Level Course Showcase Preview */}
              <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <h3 className="text-sm font-bold font-editorial text-slate-900">
                      {current.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600">
                    Curriculum Focus: <strong className="text-slate-900">{current.focus}</strong>
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {current.courses.map((course, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 text-[11px] font-medium shadow-2xs"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onSelectLevel(activeLevelTab)}
                    className="px-4 py-2 rounded-full bg-[#0E5C36] hover:bg-[#083820] text-white text-xs font-semibold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View {activeLevelTab}L Archive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
