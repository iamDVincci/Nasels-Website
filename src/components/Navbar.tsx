import React from 'react';
import { 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Search, 
  Bookmark, 
  PlusCircle, 
  Library,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeTab: 'archive' | 'courses' | 'past_questions' | 'texts' | 'saved';
  setActiveTab: (tab: 'archive' | 'courses' | 'past_questions' | 'texts' | 'saved') => void;
  savedCount: number;
  onOpenContribute: () => void;
  onOpenStudyGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  activeTab,
  setActiveTab,
  savedCount,
  onOpenContribute,
  onOpenStudyGuide
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCF7] text-[#3E2F24] border-b border-[#DCD3C1] shadow-xs">
      {/* Top University Brand Bar */}
      <div className="bg-[#F5F1E9] text-[#5A4638] text-xs py-2 px-4 border-b border-[#DCD3C1]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#8B7355] animate-pulse"></span>
            <span className="font-semibold tracking-wider text-[11px] uppercase font-serif text-[#3E2F24]">
              NNAMDI AZIKIWE UNIVERSITY, AWKA • FACULTY OF ARTS
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#5A4638]">Motto: <em className="text-[#8B7355] font-serif font-medium">Discipline, Self-Reliance & Excellence</em></span>
            <span className="hidden md:inline text-[#DCD3C1]">|</span>
            <span className="hidden md:inline text-[#8B7355] font-medium font-serif">NASELS UNIZIK Chapter</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Logo & Department Title */}
        <div 
          onClick={() => setActiveTab('archive')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 bg-[#3E2F24] rounded-full flex items-center justify-center text-[#FDFCF7] font-serif font-bold text-xl shadow-xs group-hover:bg-[#5A4638] transition-colors">
            N
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#3E2F24] font-serif">NASELS ARCHIVE</span>
              <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-[#F5F1E9] text-[#8B7355] font-bold border border-[#DCD3C1]">
                UNIZIK
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-[#8B7355] font-serif font-medium">
              English Language & Literature | UNIZIK
            </p>
          </div>
        </div>

        {/* Global Search Input */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7355]" />
          <input
            type="text"
            placeholder="Search by Course Code (e.g. ENG 101, Achebe, Syntax)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white text-[#3E2F24] placeholder-[#8B7355]/60 rounded-xl border border-[#DCD3C1] focus:outline-none focus:ring-2 focus:ring-[#8B7355] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8B7355] hover:text-[#3E2F24]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={onOpenStudyGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#5A4638] hover:text-[#3E2F24] hover:bg-[#F5F1E9] rounded-lg transition-colors"
            title="Exam & MLA Study Guide"
          >
            <HelpCircle className="w-4 h-4 text-[#8B7355]" />
            <span>Study Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors relative ${
              activeTab === 'saved'
                ? 'bg-[#F5F1E9] text-[#3E2F24] border-[#8B7355] font-bold shadow-2xs'
                : 'text-[#5A4638] border-[#DCD3C1] hover:bg-[#F5F1E9] hover:text-[#3E2F24]'
            }`}
          >
            <Bookmark className="w-4 h-4 text-[#8B7355]" />
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#8B7355] text-white">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenContribute}
            className="flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold bg-[#3E2F24] text-[#FDFCF7] hover:bg-[#5A4638] transition-colors shadow-xs"
          >
            <PlusCircle className="w-4 h-4 text-[#FDFCF7]" />
            <span>Submit Material</span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setActiveTab('saved')}
            className="p-2 text-[#5A4638] hover:text-[#3E2F24] relative"
          >
            <Bookmark className="w-5 h-5 text-[#8B7355]" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[9px] flex items-center justify-center font-bold rounded-full bg-[#8B7355] text-white">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#3E2F24] hover:text-[#8B7355]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#3E2F24]" />}
          </button>
        </div>
      </div>

      {/* Mobile Search & Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFCF7] border-t border-[#DCD3C1] px-4 py-3 space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B7355]" />
            <input
              type="text"
              placeholder="Search courses, texts, or past questions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white text-[#3E2F24] placeholder-[#8B7355]/60 rounded-xl border border-[#DCD3C1]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <button
              onClick={() => { setActiveTab('archive'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-left font-medium border ${activeTab === 'archive' ? 'bg-[#F5F1E9] text-[#3E2F24] border-[#8B7355] font-bold' : 'bg-white text-[#5A4638] border-[#DCD3C1]'}`}
            >
              📚 All Archive
            </button>
            <button
              onClick={() => { setActiveTab('past_questions'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-left font-medium border ${activeTab === 'past_questions' ? 'bg-[#F5F1E9] text-[#3E2F24] border-[#8B7355] font-bold' : 'bg-white text-[#5A4638] border-[#DCD3C1]'}`}
            >
              📝 Past Questions
            </button>
            <button
              onClick={() => { setActiveTab('texts'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-left font-medium border ${activeTab === 'texts' ? 'bg-[#F5F1E9] text-[#3E2F24] border-[#8B7355] font-bold' : 'bg-white text-[#5A4638] border-[#DCD3C1]'}`}
            >
              📖 Recommended Texts
            </button>
            <button
              onClick={() => { setActiveTab('courses'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-xl text-left font-medium border ${activeTab === 'courses' ? 'bg-[#F5F1E9] text-[#3E2F24] border-[#8B7355] font-bold' : 'bg-white text-[#5A4638] border-[#DCD3C1]'}`}
            >
              🎓 Course Outlines
            </button>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => { onOpenContribute(); setMobileMenuOpen(false); }}
              className="flex-1 py-2.5 rounded-full bg-[#3E2F24] text-[#FDFCF7] font-semibold text-xs text-center hover:bg-[#5A4638]"
            >
              + Submit Study Material
            </button>
            <button
              onClick={() => { onOpenStudyGuide(); setMobileMenuOpen(false); }}
              className="px-4 py-2.5 rounded-full bg-white text-[#3E2F24] text-xs font-semibold border border-[#DCD3C1] hover:bg-[#F5F1E9]"
            >
              Guide
            </button>
          </div>
        </div>
      )}

      {/* Sub-Navigation Categories Bar */}
      <div className="hidden md:block bg-[#F5F1E9] border-t border-[#DCD3C1] px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium">
          <div className="flex items-center space-x-2 py-2">
            <button
              onClick={() => setActiveTab('archive')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'archive'
                  ? 'bg-white text-[#3E2F24] font-bold border border-[#DCD3C1] shadow-2xs'
                  : 'text-[#5A4638] hover:text-[#3E2F24] hover:bg-white/60'
              }`}
            >
              <Library className="w-3.5 h-3.5 text-[#8B7355]" />
              <span>Full Archive Directory</span>
            </button>

            <button
              onClick={() => setActiveTab('past_questions')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'past_questions'
                  ? 'bg-white text-[#3E2F24] font-bold border border-[#DCD3C1] shadow-2xs'
                  : 'text-[#5A4638] hover:text-[#3E2F24] hover:bg-white/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#8B7355]" />
              <span>Past Questions Bank (PQ)</span>
            </button>

            <button
              onClick={() => setActiveTab('texts')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'texts'
                  ? 'bg-white text-[#3E2F24] font-bold border border-[#DCD3C1] shadow-2xs'
                  : 'text-[#5A4638] hover:text-[#3E2F24] hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#8B7355]" />
              <span>Recommended Texts & Critiques</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                activeTab === 'courses'
                  ? 'bg-white text-[#3E2F24] font-bold border border-[#DCD3C1] shadow-2xs'
                  : 'text-[#5A4638] hover:text-[#3E2F24] hover:bg-white/60'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#8B7355]" />
              <span>UNIZIK Course Syllabi (100L - 400L)</span>
            </button>
          </div>

          <div className="text-[11px] text-[#8B7355] flex items-center gap-3 font-serif">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#8B7355]"></span>
              Curriculum Updated: 2024/2025 Academic Session
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
