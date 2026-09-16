import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Search, 
  Bookmark, 
  Upload,
  Library,
  HelpCircle,
  Menu,
  X,
  Sparkles,
  Award,
  GraduationCap
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems: { id: 'archive' | 'courses' | 'past_questions' | 'texts'; label: string; icon: any }[] = [
    { id: 'archive', label: 'Archive Vault', icon: Library },
    { id: 'courses', label: 'Course Directory', icon: GraduationCap },
    { id: 'past_questions', label: 'Past Questions', icon: Award },
    { id: 'texts', label: 'Literary Texts', icon: BookOpen },
  ];

  return (
    <header className="sticky top-2 sm:top-4 z-50 max-w-6xl w-full mx-auto px-3 sm:px-6">
      {/* Floating Island Navigation Pill */}
      <div className="glass-nav rounded-full px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-4 transition-all duration-200">
        
        {/* Left: Brand Identity with Crest */}
        <div 
          onClick={() => {
            setActiveTab('archive');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0 group"
        >
          <div className="relative">
            <NaselsCrest size={38} className="group-hover:scale-105 transition-transform duration-200" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#0E5C36] ring-2 ring-white"></span>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold font-editorial text-[#141A16] tracking-tight leading-none">
                NASELS
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-full bg-[#E7F3EC] text-[#0E5C36] font-sans">
                UNIZIK
              </span>
            </div>
            <p className="text-[10px] text-[#525D56] font-sans font-medium tracking-wide">
              Academic Archive
            </p>
          </div>
        </div>

        {/* Center: Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#FAF7EE]/80 p-1 rounded-full border border-[#F0EAD6]">
          {navItems.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#0E5C36] shadow-xs font-bold border border-[#0E5C36]/15'
                    : 'text-[#525D56] hover:text-[#141A16] hover:bg-white/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0E5C36]' : 'text-[#525D56]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Actions (Search, Saved, Study Guide, Upload) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Quick Search Toggle / Input */}
          <div className="relative">
            {searchOpen ? (
              <div className="flex items-center bg-white rounded-full border border-[#0E5C36] px-2.5 py-1 shadow-sm w-44 sm:w-56 animate-in fade-in zoom-in-95 duration-150">
                <Search className="w-3.5 h-3.5 text-[#0E5C36] shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search ENG code, Achebe..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-transparent pl-2 pr-1 text-xs text-[#141A16] focus:outline-none font-sans"
                />
                <button 
                  onClick={() => {
                    onSearchChange('');
                    setSearchOpen(false);
                  }}
                  className="text-xs text-[#525D56] hover:text-[#141A16] p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full text-[#525D56] hover:text-[#141A16] hover:bg-[#FAF7EE] transition-colors cursor-pointer"
                title="Search archive"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Saved Bookmarks Pill */}
          <button
            onClick={() => setActiveTab('saved')}
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer border ${
              activeTab === 'saved'
                ? 'bg-[#E7F3EC] text-[#0E5C36] border-[#0E5C36] font-bold shadow-2xs'
                : 'text-[#2C3530] border-[#F0EAD6] bg-white hover:bg-[#FAF7EE]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-[#0E5C36]" />
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#0E5C36] text-white">
                {savedCount}
              </span>
            )}
          </button>

          {/* Study Guide Link */}
          <button
            onClick={onOpenStudyGuide}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#2C3530] hover:text-[#0E5C36] hover:bg-[#E7F3EC] transition-colors cursor-pointer font-sans"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#0E5C36]" />
            <span>Guide</span>
          </button>

          {/* Primary CTA: Upload / Contribute */}
          <button
            onClick={onOpenContribute}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold bg-[#0E5C36] text-white hover:bg-[#083820] transition-all shadow-sm hover:shadow-md cursor-pointer font-sans"
          >
            <Upload className="w-3.5 h-3.5 text-white shrink-0" />
            <span className="hidden sm:inline">Contribute</span>
            <span className="sm:hidden">Upload</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#525D56] hover:text-[#141A16] hover:bg-[#FAF7EE] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-[#F0EAD6] shadow-xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Mobile Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#525D56]" />
            <input
              type="text"
              placeholder="Search courses, past questions, authors..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7EE] rounded-xl border border-[#F0EAD6] focus:outline-none focus:ring-1 focus:ring-[#0E5C36]"
            />
          </div>

          {/* Mobile Links */}
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            {navItems.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#E7F3EC] text-[#0E5C36] font-bold'
                      : 'text-[#2C3530] hover:bg-[#FAF7EE]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#0E5C36]" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-[#F0EAD6] flex items-center justify-between text-xs">
            <button
              onClick={() => {
                setActiveTab('saved');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-[#0E5C36] font-semibold"
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved Items ({savedCount})</span>
            </button>

            <button
              onClick={() => {
                onOpenStudyGuide();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-[#525D56] hover:text-[#141A16] font-medium"
            >
              <HelpCircle className="w-4 h-4 text-[#0E5C36]" />
              <span>MLA & Exam Guide</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
