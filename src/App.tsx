import React, { useState, useEffect, useMemo } from 'react';
import { ArchiveItem, AcademicLevel, ResourceCategory, AcademicTrack, Semester } from './types';
import { INITIAL_ARCHIVE_ITEMS } from './data/archiveData';
import { Navbar } from './components/Navbar';
import { DepartmentNoticeBanner } from './components/DepartmentNoticeBanner';
import { ArchiveGrid } from './components/ArchiveGrid';
import { CourseDirectory } from './components/CourseDirectory';
import { DocumentViewerModal } from './components/DocumentViewerModal';
import { ContributeModal } from './components/ContributeModal';
import { StudyTipsModal } from './components/StudyTipsModal';
import { NaselsCrest } from './components/NaselsCrest';
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Award, 
  Bookmark, 
  MapPin, 
  Mail, 
  ExternalLink,
  ShieldCheck,
  Heart
} from 'lucide-react';

export default function App() {
  // Archive Items state with localStorage persistence for custom contributions
  const [archiveItems, setArchiveItems] = useState<ArchiveItem[]>(() => {
    try {
      const saved = localStorage.getItem('nasels_unizik_custom_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...INITIAL_ARCHIVE_ITEMS];
      }
    } catch (e) {
      console.error('Failed to parse custom items from storage', e);
    }
    return INITIAL_ARCHIVE_ITEMS;
  });

  // Bookmarked IDs state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nasels_unizik_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Filter States
  const [selectedLevel, setSelectedLevel] = useState<AcademicLevel>('All');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('all');
  const [selectedTrack, setSelectedTrack] = useState<AcademicTrack>('All');
  const [selectedSemester, setSelectedSemester] = useState<Semester>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Active view tab
  const [activeTab, setActiveTab] = useState<'archive' | 'courses' | 'past_questions' | 'texts' | 'saved'>('archive');

  // Modals state
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null);
  const [isContributeOpen, setIsContributeOpen] = useState(false);
  const [isStudyGuideOpen, setIsStudyGuideOpen] = useState(false);
  const [contributePreset, setContributePreset] = useState<{
    code: string;
    title: string;
    level: '100' | '200' | '300' | '400';
  } | undefined>(undefined);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nasels_unizik_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error('Error saving bookmarks', e);
    }
  }, [bookmarkedIds]);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddMaterial = (newItem: ArchiveItem) => {
    setArchiveItems(prev => {
      const updated = [newItem, ...prev];
      // Save custom ones to localStorage
      try {
        const customItems = updated.filter(item => item.isCustomUpload);
        localStorage.setItem('nasels_unizik_custom_items', JSON.stringify(customItems));
      } catch (e) {
        console.error('Error persisting custom item', e);
      }
      return updated;
    });

    // Also auto-open the newly created item
    setSelectedItem(newItem);
  };

  const handleSelectCourseFilter = (courseCode: string) => {
    setSearchQuery(courseCode);
    setActiveTab('archive');
    setSelectedCategory('all');
    setSelectedLevel('All');
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setSelectedLevel('All');
    setSelectedCategory('all');
    setSelectedTrack('All');
    setSelectedSemester('All');
    setSearchQuery('');
  };

  // Switch tab behavior
  const handleTabChange = (tab: 'archive' | 'courses' | 'past_questions' | 'texts' | 'saved') => {
    setActiveTab(tab);
    if (tab === 'past_questions') {
      setSelectedCategory('past_question');
    } else if (tab === 'texts') {
      setSelectedCategory('text');
    } else if (tab === 'archive') {
      setSelectedCategory('all');
    }
  };

  // Filtered Archive Items
  const filteredItems = useMemo(() => {
    return archiveItems.filter(item => {
      // Saved tab filter
      if (activeTab === 'saved') {
        if (!bookmarkedIds.includes(item.id)) return false;
      }

      // Past questions tab filter
      if (activeTab === 'past_questions' && item.category !== 'past_question') {
        return false;
      }

      // Texts tab filter
      if (activeTab === 'texts' && item.category !== 'text') {
        return false;
      }

      // Level filter
      if (selectedLevel !== 'All' && item.level !== selectedLevel) {
        return false;
      }

      // Category filter (if not overridden by tab)
      if (activeTab === 'archive' && selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Track filter
      if (selectedTrack !== 'All' && item.track !== selectedTrack && item.track !== 'General/Combined') {
        return false;
      }

      // Semester filter
      if (selectedSemester !== 'All' && item.semester !== selectedSemester) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesCode = item.courseCode.toLowerCase().includes(q);
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCourseTitle = item.courseTitle.toLowerCase().includes(q);
        const matchesAuthor = item.author.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesContent = item.summaryOrContent.toLowerCase().includes(q);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));

        if (!matchesCode && !matchesTitle && !matchesCourseTitle && !matchesAuthor && !matchesDesc && !matchesContent && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }, [
    archiveItems, 
    bookmarkedIds, 
    activeTab, 
    selectedLevel, 
    selectedCategory, 
    selectedTrack, 
    selectedSemester, 
    searchQuery
  ]);

  // Statistics
  const totalTexts = archiveItems.filter(i => i.category === 'text').length;
  const totalNotes = archiveItems.filter(i => i.category === 'notes').length;
  const totalPQs = archiveItems.filter(i => i.category === 'past_question').length;

  return (
    <div className="min-h-screen bg-[#FAF7EE] flex flex-col selection:bg-[#E7F3EC] selection:text-[#0E5C36] font-sans text-[#141A16]">
      {/* Navigation Header */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        savedCount={bookmarkedIds.length}
        onOpenContribute={() => setIsContributeOpen(true)}
        onOpenStudyGuide={() => setIsStudyGuideOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Department Banner (Only visible on primary tabs) */}
        {activeTab !== 'courses' && (
          <DepartmentNoticeBanner
            totalItems={archiveItems.length}
            totalTexts={totalTexts}
            totalNotes={totalNotes}
            totalPQs={totalPQs}
            onSelectLevel={(lvl) => {
              setSelectedLevel(lvl);
              setActiveTab('archive');
            }}
            onOpenStudyGuide={() => setIsStudyGuideOpen(true)}
          />
        )}

        {/* View Switcher: Course Directory vs Archive Grid */}
        {activeTab === 'courses' ? (
          <CourseDirectory onSelectCourseFilter={handleSelectCourseFilter} />
        ) : (
          <div>
            {/* Header if in Saved Tab */}
            {activeTab === 'saved' && (
              <div className="mb-6 p-4 rounded-xl bg-[#FAF7EE] border border-[#F0EAD6] flex items-center justify-between text-[#141A16] shadow-2xs font-sans">
                <div className="flex items-center gap-2 text-xs font-medium">
                  <Bookmark className="w-4 h-4 fill-[#0E5C36] text-[#0E5C36]" />
                  <span>
                    Viewing your <strong>Saved Bookmarks</strong> ({filteredItems.length} item{filteredItems.length === 1 ? '' : 's'}). These remain stored locally for fast offline access.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('archive')}
                  className="text-xs font-bold text-[#0E5C36] hover:text-[#083820] underline cursor-pointer"
                >
                  Return to Full Archive
                </button>
              </div>
            )}

            {/* Header if in Past Questions Tab */}
            {activeTab === 'past_questions' && (
              <div className="mb-6 p-4 rounded-xl bg-[#FAF7EE] border border-[#F0EAD6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[#141A16] shadow-2xs font-sans">
                <div className="flex items-center gap-2.5 text-xs font-medium">
                  <span className="p-1 rounded-[4px] bg-[#0E5C36] text-white shrink-0">
                    <Award className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span>
                    <strong className="text-[#141A16]">UNIZIK Past Questions Bank:</strong> Authentic semester examination papers with marking guidelines and compulsory question analyses.
                  </span>
                </div>
                <button
                  onClick={() => setIsStudyGuideOpen(true)}
                  className="text-xs font-bold text-[#0E5C36] hover:text-[#083820] underline shrink-0 font-sans"
                >
                  View Exam Strategy Guide
                </button>
              </div>
            )}

            {/* Header if in Texts Tab */}
            {activeTab === 'texts' && (
              <div className="mb-6 p-4 rounded-xl bg-[#FAF7EE] border border-[#F0EAD6] flex items-center justify-between text-[#141A16] shadow-2xs font-sans">
                <div className="flex items-center gap-2.5 text-xs font-medium">
                  <span className="p-1 rounded-[4px] bg-[#6B2361] text-white shrink-0">
                    <BookOpen className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span>
                    <strong className="text-[#141A16]">Recommended Texts & Critical Companions:</strong> Character indexes, thematic matrices, and examination quotes for prescribed African and World literature.
                  </span>
                </div>
              </div>
            )}

            {/* Archive Grid */}
            <ArchiveGrid
              items={filteredItems}
              selectedLevel={selectedLevel}
              setSelectedLevel={setSelectedLevel}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedTrack={selectedTrack}
              setSelectedTrack={setSelectedTrack}
              selectedSemester={selectedSemester}
              setSelectedSemester={setSelectedSemester}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectItem={(item) => setSelectedItem(item)}
              bookmarkedIds={bookmarkedIds}
              onToggleBookmark={handleToggleBookmark}
              onResetFilters={handleResetFilters}
              onOpenContributeWithCourse={(code, title, lvl) => {
                setContributePreset({ code, title, level: lvl });
                setIsContributeOpen(true);
              }}
            />
          </div>
        )}
      </main>

      {/* University & Department Footer */}
      <footer className="no-print bg-[#0A1D13] text-[#FAF7EE] border-t border-[#0E5C36]/30 mt-16 pt-12 pb-8 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: About NASELS */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2.5 text-white">
                <NaselsCrest className="w-7 h-7 shrink-0" />
                <span className="font-editorial font-bold text-lg tracking-tight">NASELS UNIZIK</span>
              </div>
              <p className="text-xs text-[#FAF7EE]/75 leading-relaxed font-sans">
                National Association of Students of English and Literary Studies, Department of English Language & Literature, Nnamdi Azikiwe University, P.M.B. 5025, Awka, Anambra State, Nigeria.
              </p>
              <div className="text-xs text-[#FAF7EE]/90 font-editorial italic">
                "Eloquentia et Sapientia"
              </div>
            </div>

            {/* Col 2: Academic Levels */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-sans">
                Academic Programs
              </h4>
              <ul className="text-xs space-y-2 text-[#FAF7EE]/75 font-sans">
                <li>
                  <button onClick={() => { setSelectedLevel('100'); setActiveTab('archive'); }} className="hover:text-white transition-colors">
                    100 Level (Freshmen Archive)
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedLevel('200'); setActiveTab('archive'); }} className="hover:text-white transition-colors">
                    200 Level (Sophomore Archive)
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedLevel('300'); setActiveTab('archive'); }} className="hover:text-white transition-colors">
                    300 Level (Penultimate Archive)
                  </button>
                </li>
                <li>
                  <button onClick={() => { setSelectedLevel('400'); setActiveTab('archive'); }} className="hover:text-white transition-colors">
                    400 Level (Final Year / Project)
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Department Resources */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-sans">
                Archive Resources
              </h4>
              <ul className="text-xs space-y-2 text-[#FAF7EE]/75 font-sans">
                <li>
                  <button onClick={() => handleTabChange('past_questions')} className="hover:text-white transition-colors">
                    Past Examination Papers (PQ)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabChange('texts')} className="hover:text-white transition-colors">
                    Prescribed Literature Novels & Plays
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabChange('courses')} className="hover:text-white transition-colors">
                    Faculty of Arts Course Outlines
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsStudyGuideOpen(true)} className="hover:text-white transition-colors">
                    MLA 9th Edition Citation Standard
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Departmental Contact */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-sans">
                Departmental Secretariats
              </h4>
              <div className="text-xs text-[#FAF7EE]/75 space-y-2 font-sans">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#0E5C36] shrink-0 mt-0.5" />
                  <span>Faculty of Arts Building, UNIZIK Main Campus, Awka</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#0E5C36] shrink-0" />
                  <span>nasels.unizik@unizik.edu.ng</span>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setIsContributeOpen(true)}
                    className="w-full py-2 px-4 bg-[#0E5C36] hover:bg-[#147B4A] text-white rounded-[6px] text-xs font-semibold transition-colors"
                  >
                    Submit Material to Archive
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#0E5C36]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7EE]/60 gap-2 font-sans">
            <p>
              © {new Date().getFullYear()} NASELS UNIZIK. Department of English Language and Literature.
            </p>
            <p className="flex items-center gap-1">
              Curated for academic excellence by the NASELS Academic Directorate
            </p>
          </div>
        </div>
      </footer>

      {/* Document Reader / Exam Modal */}
      <DocumentViewerModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isBookmarked={selectedItem ? bookmarkedIds.includes(selectedItem.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />

      {/* Contribute Modal */}
      <ContributeModal
        isOpen={isContributeOpen}
        onClose={() => {
          setIsContributeOpen(false);
          setContributePreset(undefined);
        }}
        onAddMaterial={handleAddMaterial}
        initialCourseCode={contributePreset?.code}
        initialCourseTitle={contributePreset?.title}
        initialLevel={contributePreset?.level}
      />

      {/* Study Tips Modal */}
      <StudyTipsModal
        isOpen={isStudyGuideOpen}
        onClose={() => setIsStudyGuideOpen(false)}
      />
    </div>
  );
}
