import React from 'react';
import { 
  BookOpen, 
  FileText, 
  GraduationCap, 
  Search, 
  Bookmark, 
  Upload,
  Library,
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { NaselsCrest } from './NaselsCrest';

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
    <header className="sticky top-0 z-40 bg-[#FAF7EE] text-[#141A16] border-b border-[#F0EAD6] shadow-2xs">
      {/* Top University Brand Bar */}
      <div className="bg-[#0E5C36] text-[#FAF7EE] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FAF7EE] animate-pulse"></span>
            <span className="font-semibold tracking-wider text-[11px] uppercase font-sans text-[#FAF7EE]">
              NNAMDI AZIKIWE UNIVERSITY, AWKA • FACULTY OF ARTS
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-sans">
            <span className="text-[#FAF7EE]/90">Motto: <em className="text-[#FAF7EE] font-serif font-medium">Discipline, Self-Reliance & Excellence</em></span>
            <span className="hidden md:inline text-[#FAF7EE]/40">|</span>
            <span className="hidden md:inline text-[#FAF7EE] font-semibold">NASELS UNIZIK Chapter</span>
          </div>
        </div>
      </div>

      {/* Main Navbar Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo & Department Title */}
        <div 
          onClick={() => setActiveTab('archive')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <NaselsCrest size={46} className="group-hover:scale-105 transition-transform" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#141A16] font-editorial">
                NASELS ARCHIVE
              </span>
              <span className="text-[10px] uppercase px-2 py-0.5 rounded-[4px] bg-[#E7F3EC] text-[#0E5C36] font-bold border border-[#0E5C36]/20 font-sans tracking-wide">
                UNIZIK CHAPTER
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-wider text-[#525D56] font-sans font-medium">
              Department of English Language & Literature
            </p>
          </div>
        </div>

        {/* Global Search Input */}
        <div className="hidden md:flex flex-1 max-w-md mx-4 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525D56]" />
          <input
            type="text"
            placeholder="Search by Course Code (e.g. ENG 101, Achebe, Syntax)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white text-[#141A16] placeholder-[#525D56]/60 rounded-xl border border-[#F0EAD6] focus:outline-none focus:ring-2 focus:ring-[#0E5C36] focus:border-[#0E5C36] transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#525D56] hover:text-[#141A16]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          <button
            onClick={onOpenStudyGuide}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#2C3530] hover:text-[#0E5C36] hover:bg-[#E7F3EC] rounded-[6px] transition-colors font-sans"
            title="Exam & MLA Study Guide"
          >
            <HelpCircle className="w-4 h-4 text-[#0E5C36]" />
            <span>Study Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-[6px] border transition-colors relative font-sans ${
              activeTab === 'saved'
                ? 'bg-[#E7F3EC] text-[#0E5C36] border-[#0E5C36] font-bold shadow-2xs'
                : 'text-[#2C3530] border-[#F0EAD6] bg-white hover:bg-[#E7F3EC] hover:text-[#0E5C36]'
            }`}
          >
            <Bookmark className="w-4 h-4 text-[#0E5C36]" />
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#0E5C36] text-white">
                {savedCount}
              </span>
            )}
          </button>

          {/* User Requested: Top-right Upload CTA in var(--nasels-green-800) with #FFFFFF text and 6px radius */}
          <button
            onClick={onOpenContribute}
            className="flex items-center gap-1.5 px-4 py-2 rounded-[6px] text-xs font-semibold bg-[#0E5C36] text-[#FFFFFF] hover:bg-[#083820] transition-colors shadow-xs font-sans"
          >
            <Upload className="w-4 h-4 text-[#FFFFFF]" />
            <span>Upload Records</span>
          </button>
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setActiveTab('saved')}
            className="p-2 text-[#2C3530] hover:text-[#0E5C36] relative"
          >
            <Bookmark className="w-5 h-5 text-[#0E5C36]" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 text-[9px] flex items-center justify-center font-bold rounded-full bg-[#0E5C36] text-white">
                {savedCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#141A16] hover:text-[#0E5C36]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#141A16]" />}
          </button>
        </div>
      </div>

      {/* Mobile Search & Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7EE] border-t border-[#F0EAD6] px-4 py-3 space-y-3 font-sans">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525D56]" />
            <input
              type="text"
              placeholder="Search courses, texts, or past questions..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white text-[#141A16] placeholder-[#525D56]/60 rounded-xl border border-[#F0EAD6]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <button
              onClick={() => { setActiveTab('archive'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-[6px] text-left font-medium border ${activeTab === 'archive' ? 'bg-[#0E5C36] text-white border-[#0E5C36] font-bold' : 'bg-white text-[#2C3530] border-[#F0EAD6]'}`}
            >
              📚 All Archive
            </button>
            <button
              onClick={() => { setActiveTab('past_questions'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-[6px] text-left font-medium border ${activeTab === 'past_questions' ? 'bg-[#0E5C36] text-white border-[#0E5C36] font-bold' : 'bg-white text-[#2C3530] border-[#F0EAD6]'}`}
            >
              📝 Past Questions
            </button>
            <button
              onClick={() => { setActiveTab('texts'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-[6px] text-left font-medium border ${activeTab === 'texts' ? 'bg-[#0E5C36] text-white border-[#0E5C36] font-bold' : 'bg-white text-[#2C3530] border-[#F0EAD6]'}`}
            >
              📖 Recommended Texts
            </button>
            <button
              onClick={() => { setActiveTab('courses'); setMobileMenuOpen(false); }}
              className={`p-2.5 rounded-[6px] text-left font-medium border ${activeTab === 'courses' ? 'bg-[#0E5C36] text-white border-[#0E5C36] font-bold' : 'bg-white text-[#2C3530] border-[#F0EAD6]'}`}
            >
              🎓 Course Outlines
            </button>
          </div>

          <div className="pt-2 flex gap-2">
            <button
              onClick={() => { onOpenContribute(); setMobileMenuOpen(false); }}
              className="flex-1 py-2.5 rounded-[6px] bg-[#0E5C36] text-[#FFFFFF] font-semibold text-xs text-center hover:bg-[#083820]"
            >
              + Upload Records
            </button>
            <button
              onClick={() => { onOpenStudyGuide(); setMobileMenuOpen(false); }}
              className="px-4 py-2.5 rounded-[6px] bg-white text-[#141A16] text-xs font-semibold border border-[#F0EAD6] hover:bg-[#E7F3EC]"
            >
              Guide
            </button>
          </div>
        </div>
      )}

      {/* Sub-Navigation Categories Bar */}
      <div className="hidden md:block bg-[#FAF7EE] border-t border-[#F0EAD6] px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium">
          <div className="flex items-center space-x-1.5 py-2 font-sans">
            <button
              onClick={() => setActiveTab('archive')}
              className={`px-3 py-1.5 rounded-[6px] transition-all flex items-center gap-1.5 ${
                activeTab === 'archive'
                  ? 'bg-[#0E5C36] text-white font-bold shadow-2xs'
                  : 'text-[#2C3530] hover:text-[#0E5C36] hover:bg-[#E7F3EC]'
              }`}
            >
              <Library className="w-3.5 h-3.5" />
              <span>Full Archive Directory</span>
            </button>

            <button
              onClick={() => setActiveTab('past_questions')}
              className={`px-3 py-1.5 rounded-[6px] transition-all flex items-center gap-1.5 ${
                activeTab === 'past_questions'
                  ? 'bg-[#0E5C36] text-white font-bold shadow-2xs'
                  : 'text-[#2C3530] hover:text-[#0E5C36] hover:bg-[#E7F3EC]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Past Questions Bank (PQ)</span>
            </button>

            <button
              onClick={() => setActiveTab('texts')}
              className={`px-3 py-1.5 rounded-[6px] transition-all flex items-center gap-1.5 ${
                activeTab === 'texts'
                  ? 'bg-[#0E5C36] text-white font-bold shadow-2xs'
                  : 'text-[#2C3530] hover:text-[#0E5C36] hover:bg-[#E7F3EC]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Recommended Texts & Critiques</span>
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`px-3 py-1.5 rounded-[6px] transition-all flex items-center gap-1.5 ${
                activeTab === 'courses'
                  ? 'bg-[#0E5C36] text-white font-bold shadow-2xs'
                  : 'text-[#2C3530] hover:text-[#0E5C36] hover:bg-[#E7F3EC]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>UNIZIK Course Syllabi (100L - 400L)</span>
            </button>
          </div>

          <div className="text-[11px] text-[#525D56] flex items-center gap-3 font-sans">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0E5C36]"></span>
              Curriculum Updated: 2024/2025 Academic Session
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
