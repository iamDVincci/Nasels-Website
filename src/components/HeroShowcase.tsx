import React, { useState } from 'react';
import { 
  Library, 
  ArrowRight, 
  Sparkles, 
  Award, 
  BookOpen, 
  ChevronRight, 
  GraduationCap, 
  ShieldCheck, 
  Users, 
  Zap, 
  Lock, 
  AlertCircle
} from 'lucide-react';
import { AcademicLevel, ArchiveItem } from '../types';

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
  // Showcase active level tab (100L, 200L, 300L, 400L)
  const [activeLevelTab, setActiveLevelTab] = useState<'100' | '200' | '300' | '400'>('100');
  // Showcase Gemini solver tab
  const [solverTab, setSolverTab] = useState<'marking' | 'thesis' | 'pitfalls'>('marking');

  const levelDemos = {
    '100': {
      label: '100 Level (Freshmen)',
      badge: 'Freshmen Vault',
      pq: {
        code: 'ENG 101',
        title: 'Practical English Grammar',
        session: '2022/2023 First Semester',
        time: '3 Hours • 70 Marks',
        question: 'Q1 [Compulsory • 30 Marks]: (a) Formulate a rigorous linguistic definition of Subject-Verb Concord. (b) With authentic sentence illustrations, analyze five distinct types of concord in English.',
        marks: '30 Marks (Compulsory)',
      },
      text: {
        code: 'ENG 111',
        title: 'Things Fall Apart',
        author: 'Chinua Achebe',
        genre: 'African Prose Fiction',
        themes: ['Colonial Disruption', 'Okonkwo\'s Hubris', 'Igbo Cosmology'],
        citation: 'Achebe, Chinua. Things Fall Apart. Heinemann, 1958.',
      },
      aiBreakdown: {
        marking: 'Award 6 marks for structural definition; 12 marks for 4 distinct concord types (Grammatical, Notional, Proximity, Concord of Person); 12 marks for authentic sentence illustrations.',
        thesis: 'Concord in English syntax operates as a tripartite nexus between morphological agreement, semantic intent (notional concord), and linear cognitive proximity.',
        pitfalls: 'Examiners heavily penalize candidates who confuse proximity concord with grammatical errors or neglect collective nouns in notional concord.',
      }
    },
    '200': {
      label: '200 Level (Sophomore)',
      badge: 'Sophomore Vault',
      pq: {
        code: 'ENG 211',
        title: 'African Prose Fiction',
        session: '2022/2023 First Semester',
        time: '3 Hours • 70 Marks',
        question: 'Q2 [Compulsory • 30 Marks]: "Ezeulu\'s tragic collapse in Arrow of God is precipitated by his refusal to distinguish between divine mandate and personal vengeance." Critically evaluate this assertion.',
        marks: '30 Marks (Compulsory)',
      },
      text: {
        code: 'ENG 212',
        title: 'Death and the King\'s Horseman',
        author: 'Wole Soyinka',
        genre: 'African Drama',
        themes: ['Metaphysical Transition', 'Duty vs Self', 'Colonial Incomprehension'],
        citation: 'Soyinka, Wole. Death and the King\'s Horseman. Marion Boyars, 1975.',
      },
      aiBreakdown: {
        marking: '8 marks for historical and theological context of Ulu; 12 marks for textual evidence of Ezeulu\'s dual conflict with Nwaka and Winterbottom; 10 marks for critical evaluation of tragic flaw.',
        thesis: 'Achebe constructs Ezeulu not merely as a tragic protagonist, but as the metaphysical embodiment of an epistemic rift between ritual piety and aristocratic hubris.',
        pitfalls: 'Avoid treating Ezeulu merely as a victim of British colonial administration; UNIZIK examiners require balanced scrutiny of his internal political feud with Ezidemili.',
      }
    },
    '300': {
      label: '300 Level (Penultimate)',
      badge: 'Penultimate Vault',
      pq: {
        code: 'ENG 301',
        title: 'Advanced Syntactic Theory',
        session: '2022/2023 Second Semester',
        time: '3 Hours • 70 Marks',
        question: 'Q1 [Compulsory • 30 Marks]: Explicate the architecture of X-Bar Syntax. Provide tree diagrams for structural ambiguity in coordinate noun phrases and demonstrate c-command relations.',
        marks: '30 Marks (Compulsory)',
      },
      text: {
        code: 'ENG 313',
        title: 'Literary Theory and Criticism',
        author: 'Terry Eagleton / Edward Said',
        genre: 'Critical Theory',
        themes: ['Orientalist Discourse', 'Ideological State Apparatus', 'Structuralism'],
        citation: 'Said, Edward W. Orientalism. Pantheon Books, 1978.',
      },
      aiBreakdown: {
        marking: '10 marks for X-bar schema (Specifier-Head-Complement); 10 marks for hierarchical binary branching; 10 marks for formal c-command definition and asymmetric binding.',
        thesis: 'X-Bar theory resolves empirical inadequacies of Phrase Structure Rules by restricting binary branching and projecting endocentric maximal projections.',
        pitfalls: 'Ensure tree diagrams distinctly label XP, X-bar, and X^0 nodes; failure to show intermediate projection bars results in automatic mark forfeiture.',
      }
    },
    '400': {
      label: '400 Level (Finalist)',
      badge: 'Graduating Scholars',
      pq: {
        code: 'ENG 402',
        title: 'Stylistics & Discourse Analysis',
        session: '2022/2023 First Semester',
        time: '3 Hours • 70 Marks',
        question: 'Q1 [Compulsory • 30 Marks]: Carry out a comprehensive Systemic Functional Linguistic (SFL) transitivity analysis on the provided political address, categorizing Material, Mental, and Relational processes.',
        marks: '30 Marks (Compulsory)',
      },
      text: {
        code: 'ENG 490',
        title: 'B.A. Final Year Thesis Seminar',
        author: 'Departmental Board of Studies',
        genre: 'Scholarly Methodology',
        themes: ['MLA 9th Edition Standard', 'Corpus Sampling', 'Literature Review Matrix'],
        citation: 'Modern Language Association. MLA Handbook. 9th ed., MLA, 2021.',
      },
      aiBreakdown: {
        marking: '10 marks for process type identification; 10 marks for participant role categorization (Actor, Goal, Sensor, Phenomenon); 10 marks for ideational meaning critique.',
        thesis: 'Hallidayan transitivity serves as a diagnostic instrument that unpacks how syntactic process choices encode ideological hegemony and agency attribution.',
        pitfalls: 'Never confuse relational identifying processes with relational attributive processes; UNIZIK examiners deduct marks if reversibility tests are omitted.',
      }
    },
  };

  const demo = levelDemos[activeLevelTab];

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] pointer-events-none hero-glow -z-10 select-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header: Eyebrow Badge, Main Headline, Subtext */}
        <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-5">
          
          {/* Eyebrow Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E7F3EC] border border-[#0E5C36]/20 text-xs font-semibold text-[#0E5C36] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#0E5C36] animate-pulse"></span>
            <span>Faculty of Arts • Official Academic Repository</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#0E5C36]" />
          </div>

          {/* Primary Punchy Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-editorial text-[#141A16] tracking-tight leading-[1.12]">
            Academic insight for modern <br className="hidden sm:inline" />
            <span className="italic text-[#0E5C36]">literary scholarship.</span>
          </h1>

          {/* Subtitle description */}
          <p className="text-sm sm:text-base text-[#2E3A33] font-sans leading-relaxed max-w-2xl mx-auto font-normal">
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
              className="px-5 py-3 rounded-full bg-white hover:bg-[#FAF7EE] text-[#141A16] border border-[#EAE5D9] font-semibold text-xs sm:text-sm transition-all shadow-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-[#0E5C36]" />
              <span>Browse Course Outlines</span>
            </button>
          </div>

          {/* Trust Metric Row */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-[#5A6860] font-sans">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0E5C36]" />
              <span className="font-semibold text-[#141A16]">Faculty Verified</span> Syllabus
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#0E5C36]" />
              <span className="font-semibold text-[#141A16]">1,200+</span> Scholars Supported
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#6B2361]" />
              <span className="font-semibold text-[#141A16]">Gemini AI</span> Model Solutions
            </div>
          </div>
        </div>

        {/* Centerpiece Showcase: Zova-grade Interactive Application Mockup Card */}
        <div className="mt-10 sm:mt-14 relative">
          
          {/* Main Elevated Showcase Window */}
          <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-[#EAE5D9] shadow-xl overflow-hidden transition-all">
            
            {/* Window Chrome Header */}
            <div className="bg-[#FAF7EE] border-b border-[#EAE5D9] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
              
              {/* macOS Window Controls + URL */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-red-400/50 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-amber-400/50 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-green-400/50 inline-block"></span>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#EAE5D9] text-[11px] text-[#5A6860] font-mono shadow-2xs">
                  <Lock className="w-3 h-3 text-[#0E5C36]" />
                  <span>nasels.unizik.edu.ng/vault/{activeLevelTab}L</span>
                </div>
              </div>

              {/* Level Switcher Segmented Tabs */}
              <div className="flex items-center bg-white p-1 rounded-full border border-[#EAE5D9] shadow-2xs text-xs font-sans">
                {(['100', '200', '300', '400'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setActiveLevelTab(lvl);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeLevelTab === lvl
                        ? 'bg-[#0E5C36] text-white shadow-xs font-bold'
                        : 'text-[#2E3A33] hover:text-[#0E5C36]'
                    }`}
                  >
                    {lvl}L
                  </button>
                ))}
              </div>

              {/* Status Badge */}
              <div className="hidden md:flex items-center gap-1.5 text-[11px] font-medium text-[#0E5C36]">
                <span className="w-2 h-2 rounded-full bg-[#0E5C36] animate-ping"></span>
                <span>Live Faculty Vault</span>
              </div>
            </div>

            {/* Showcase Window Interior Body */}
            <div className="p-5 sm:p-7 space-y-6 bg-white">
              
              {/* Stat Metric Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-[#FAF7EE] border border-[#EAE5D9] space-y-0.5">
                  <div className="text-[11px] text-[#5A6860] flex items-center justify-between">
                    <span>Verified Syllabi</span>
                    <Library className="w-3.5 h-3.5 text-[#0E5C36]" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-editorial text-[#141A16]">{totalItems}+ Items</div>
                  <div className="text-[10px] text-[#0E5C36] font-medium">100% Faculty Aligned</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7EE] border border-[#EAE5D9] space-y-0.5">
                  <div className="text-[11px] text-[#5A6860] flex items-center justify-between">
                    <span>Past Questions</span>
                    <Award className="w-3.5 h-3.5 text-[#0E5C36]" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-editorial text-[#141A16]">{totalPQs} Papers</div>
                  <div className="text-[10px] text-[#0E5C36] font-medium">Full Mark Schemes</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7EE] border border-[#EAE5D9] space-y-0.5">
                  <div className="text-[11px] text-[#5A6860] flex items-center justify-between">
                    <span>Literature Works</span>
                    <BookOpen className="w-3.5 h-3.5 text-[#6B2361]" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-editorial text-[#141A16]">{totalTexts} Texts</div>
                  <div className="text-[10px] text-[#6B2361] font-medium">Thematic Matrices</div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF7EE] border border-[#EAE5D9] space-y-0.5">
                  <div className="text-[11px] text-[#5A6860] flex items-center justify-between">
                    <span>AI Exam Assistant</span>
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="text-lg sm:text-xl font-bold font-editorial text-[#141A16]">Gemini 2.5</div>
                  <div className="text-[10px] text-[#0E5C36] font-medium">Active & Ready</div>
                </div>
              </div>

              {/* 3-Column Interactive Material Showcase */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
                
                {/* Column 1: Authentic Past Question (Col 4) */}
                <div className="lg:col-span-4 rounded-2xl bg-[#FAF7EE]/70 border border-[#EAE5D9] p-4 sm:p-5 flex flex-col justify-between space-y-3">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#141A16] text-white font-mono text-[10px] font-bold">
                        {demo.pq.code}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E7F3EC] text-[#0E5C36] border border-[#0E5C36]/20 text-[10px] font-bold">
                        {demo.pq.marks}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold font-editorial text-[#141A16] leading-snug">
                        {demo.pq.title}
                      </h4>
                      <p className="text-[11px] text-[#5A6860]">{demo.pq.session} • {demo.pq.time}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#EAE5D9] text-xs text-[#2E3A33] font-sans leading-relaxed">
                      <p className="line-clamp-4 font-normal text-[11px]">
                        {demo.pq.question}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectLevel(activeLevelTab);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#FAF7EE] text-[#0E5C36] border border-[#EAE5D9] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>View All {activeLevelTab}L Papers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Column 2: Prescribed Literature Masterwork (Col 4) */}
                <div className="lg:col-span-4 rounded-2xl bg-[#FAF7EE]/70 border border-[#EAE5D9] p-4 sm:p-5 flex flex-col justify-between space-y-3">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#6B2361] text-white font-mono text-[10px] font-bold">
                        {demo.text.code}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#F6EAF4] text-[#6B2361] border border-[#6B2361]/20 text-[10px] font-bold">
                        Prescribed Text
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold font-editorial text-[#141A16] leading-snug">
                        {demo.text.title}
                      </h4>
                      <p className="text-[11px] text-[#5A6860]">By {demo.text.author} • {demo.text.genre}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {demo.text.themes.map((t, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded-full bg-white text-[#6B2361] border border-[#EAE5D9] text-[10px] font-medium shadow-2xs">
                            #{t}
                          </span>
                        ))}
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-[#EAE5D9] text-[11px] text-[#5A6860] font-mono leading-tight">
                        <span className="text-[#6B2361] font-semibold">MLA 9th: </span>
                        {demo.text.citation}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectLevel(activeLevelTab);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#FAF7EE] text-[#6B2361] border border-[#EAE5D9] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>Explore Literature Matrix</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Column 3: Gemini AI Study Solver Demo (Col 4) */}
                <div className="lg:col-span-4 rounded-2xl bg-[#141A16] text-white p-4 sm:p-5 flex flex-col justify-between space-y-3 shadow-md">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[#E7F3EC] font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Gemini AI Tutor</span>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Exam Solver
                      </span>
                    </div>

                    {/* Interactive Subtabs */}
                    <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/10 text-[10px] font-sans">
                      <button
                        onClick={() => setSolverTab('marking')}
                        className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                          solverTab === 'marking' ? 'bg-white text-[#141A16] font-bold' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        Mark Scheme
                      </button>
                      <button
                        onClick={() => setSolverTab('thesis')}
                        className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                          solverTab === 'thesis' ? 'bg-white text-[#141A16] font-bold' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        Model Thesis
                      </button>
                      <button
                        onClick={() => setSolverTab('pitfalls')}
                        className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                          solverTab === 'pitfalls' ? 'bg-white text-[#141A16] font-bold' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        Pitfalls
                      </button>
                    </div>

                    {/* Solver Content Preview */}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-200 leading-relaxed font-sans min-h-[90px]">
                      {solverTab === 'marking' && (
                        <p className="italic font-serif">
                          "{demo.aiBreakdown.marking}"
                        </p>
                      )}
                      {solverTab === 'thesis' && (
                        <p className="italic font-serif">
                          "{demo.aiBreakdown.thesis}"
                        </p>
                      )}
                      {solverTab === 'pitfalls' && (
                        <div className="flex items-start gap-1.5 text-amber-200">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                          <p>{demo.aiBreakdown.pitfalls}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={onOpenStudyGuide}
                    className="w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Open Full Study Handbook</span>
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
