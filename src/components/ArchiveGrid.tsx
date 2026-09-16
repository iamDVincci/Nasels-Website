import React, { useState } from 'react';
import { ArchiveItem, AcademicLevel, ResourceCategory, AcademicTrack, Semester } from '../types';
import { CourseArchiveView } from './CourseArchiveView';
import { 
  getTagType, 
  getTagStyles, 
  normalizeAcademicYear, 
  getCategoryLabel 
} from '../utils/tagging';
import { 
  BookOpen, 
  FileText, 
  Award, 
  Download, 
  Bookmark, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ExternalLink,
  Search,
  Filter,
  Layers,
  GraduationCap,
  FolderTree,
  LayoutGrid,
  Calendar,
  Tag
} from 'lucide-react';

interface ArchiveGridProps {
  items: ArchiveItem[];
  selectedLevel: AcademicLevel;
  setSelectedLevel: (lvl: AcademicLevel) => void;
  selectedCategory: ResourceCategory;
  setSelectedCategory: (cat: ResourceCategory) => void;
  selectedTrack: AcademicTrack;
  setSelectedTrack: (track: AcademicTrack) => void;
  selectedSemester: Semester;
  setSelectedSemester: (sem: Semester) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectItem: (item: ArchiveItem) => void;
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onResetFilters: () => void;
  onOpenContributeWithCourse?: (courseCode: string, courseTitle: string, level: '100' | '200' | '300' | '400') => void;
}

export const ArchiveGrid: React.FC<ArchiveGridProps> = ({
  items,
  selectedLevel,
  setSelectedLevel,
  selectedCategory,
  setSelectedCategory,
  selectedTrack,
  setSelectedTrack,
  selectedSemester,
  setSelectedSemester,
  searchQuery,
  setSearchQuery,
  onSelectItem,
  bookmarkedIds,
  onToggleBookmark,
  onResetFilters,
  onOpenContributeWithCourse
}) => {
  // Archive View Mode: 'courses' (Hierarchical Course & Academic Year categories) vs 'grid' (All items cards)
  const [archiveViewMode, setArchiveViewMode] = useState<'courses' | 'grid'>('courses');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'text':
        return <BookOpen className="w-3.5 h-3.5 text-[#6B2361]" />;
      case 'notes':
        return <FileText className="w-3.5 h-3.5 text-[#0E5C36]" />;
      case 'past_question':
        return <Award className="w-3.5 h-3.5 text-[#334155]" />;
      default:
        return <GraduationCap className="w-3.5 h-3.5 text-[#0E5C36]" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'text':
        return { label: 'Recommended Text', bg: 'bg-[#F6EAF4] text-[#6B2361] border-[#6B2361]/20' };
      case 'notes':
        return { label: 'Lecture Notes', bg: 'bg-[#E7F3EC] text-[#0E5C36] border-[#0E5C36]/20' };
      case 'past_question':
        return { label: 'Past Question Paper', bg: 'bg-[#F1F5F9] text-[#334155] border-[#E2E8F0]' };
      default:
        return { label: 'Course Outline', bg: 'bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]' };
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case '100':
        return 'bg-[#0E5C36] text-white';
      case '200':
        return 'bg-[#147B4A] text-white';
      case '300':
        return 'bg-[#6B2361] text-white';
      case '400':
        return 'bg-[#141A16] text-white';
      default:
        return 'bg-[#0E5C36] text-white';
    }
  };

  // Calculate counts
  const totalCount = items.length;

  return (
    <div className="space-y-6">
      {/* View Mode Switcher Header */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-[#EBE5D8] shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E5C36]">Archive Organization</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#E7F3EC] text-[#0E5C36] border border-[#0E5C36]/20">
              {archiveViewMode === 'courses' ? 'Structured Course Categories' : 'All Resources Matrix'}
            </span>
          </div>
          <p className="text-xs text-[#525D56]">
            {archiveViewMode === 'courses' 
              ? 'Organized by Departmental Courses, with each course sub-categorized by Academic Year.'
              : 'Flat catalog displaying all authenticated texts, lecture notes, and past examination papers.'}
          </p>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex items-center bg-[#FAF7EE] p-1 rounded-full border border-[#EBE5D8] shrink-0 font-sans">
          <button
            onClick={() => setArchiveViewMode('courses')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              archiveViewMode === 'courses'
                ? 'bg-[#0E5C36] text-white shadow-xs'
                : 'text-[#525D56] hover:text-[#0E5C36]'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Course Categories</span>
          </button>

          <button
            onClick={() => setArchiveViewMode('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              archiveViewMode === 'grid'
                ? 'bg-[#0E5C36] text-white shadow-xs'
                : 'text-[#525D56] hover:text-[#0E5C36]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Resource Cards</span>
          </button>
        </div>
      </div>

      {/* Filtering Header Toolbar */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#EBE5D8] shadow-xs p-5 sm:p-6 space-y-4 font-sans">
        {/* Row 1: Academic Level Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0E5C36] uppercase tracking-wider">
            <Layers className="w-4 h-4 text-[#0E5C36]" />
            <span>Academic Level</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(['All', '100', '200', '300', '400'] as AcademicLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                  selectedLevel === lvl
                    ? 'bg-[#0E5C36] text-white border-[#0E5C36] shadow-xs'
                    : 'bg-[#FAF7EE] text-[#525D56] border-[#EBE5D8] hover:bg-[#E7F3EC] hover:text-[#0E5C36]'
                }`}
              >
                {lvl === 'All' ? 'All Levels' : `${lvl} Level`}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-[#F0EAD6]" />

        {/* Row 2: Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Resources' },
              { id: 'past_question', label: 'Past Questions (PQ)' },
              { id: 'text', label: 'Recommended Texts' },
              { id: 'notes', label: 'Lecture Notes' },
              { id: 'outline', label: 'Curriculum & Outlines' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ResourceCategory)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#0E5C36] text-white font-bold border-[#0E5C36] shadow-xs'
                    : 'bg-white text-[#525D56] border-[#EBE5D8] hover:bg-[#FAF7EE] hover:text-[#141A16]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sub filters: Track & Semester */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value as AcademicTrack)}
              className="bg-[#FAF7EE] border border-[#EBE5D8] text-[#141A16] py-1.5 px-3 rounded-full focus:outline-none focus:border-[#0E5C36] font-medium"
            >
              <option value="All">All Disciplines</option>
              <option value="Literature">Literature in English</option>
              <option value="Language & Linguistics">English Language & Linguistics</option>
            </select>

            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value as Semester)}
              className="bg-[#FAF7EE] border border-[#EBE5D8] text-[#141A16] py-1.5 px-3 rounded-full focus:outline-none focus:border-[#0E5C36] font-medium"
            >
              <option value="All">All Semesters</option>
              <option value="1st">1st Semester</option>
              <option value="2nd">2nd Semester</option>
            </select>

            {(selectedLevel !== 'All' || selectedCategory !== 'all' || selectedTrack !== 'All' || selectedSemester !== 'All' || searchQuery) && (
              <button
                onClick={onResetFilters}
                className="text-xs text-[#0E5C36] hover:text-[#083820] font-semibold underline px-1 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main View Display */}
      {archiveViewMode === 'courses' ? (
        /* Hierarchical View: Grouped by Course and sub-categorized by Academic Year */
        <CourseArchiveView
          items={items}
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
          onSelectItem={onSelectItem}
          bookmarkedIds={bookmarkedIds}
          onToggleBookmark={onToggleBookmark}
          onOpenContributeWithCourse={onOpenContributeWithCourse}
          onResetFilters={onResetFilters}
        />
      ) : (
        /* Flat Grid View: All Resources Cards Matrix */
        <div className="space-y-6">
          {/* Resource Count & Active Filters Indicator */}
          <div className="flex items-center justify-between text-xs text-[#525D56] px-1 font-sans">
            <p>
              Showing <span className="font-bold text-[#141A16]">{totalCount}</span> academic material{totalCount === 1 ? '' : 's'} 
              {selectedLevel !== 'All' && ` for ${selectedLevel} Level`}
              {selectedCategory !== 'all' && ` • ${selectedCategory.replace('_', ' ')}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>

            <span className="hidden sm:inline text-[#0E5C36] italic">
              Click any card to read, practice questions, or download
            </span>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#EBE5D8] p-12 text-center space-y-4 shadow-xs font-sans">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FAF7EE] flex items-center justify-center text-[#0E5C36] border border-[#EBE5D8]">
                <Search className="w-6 h-6 text-[#0E5C36]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-editorial text-[#141A16]">
                No matching academic materials found
              </h3>
              <p className="text-xs text-[#525D56] max-w-md mx-auto leading-relaxed">
                We couldn't find any resources matching your search terms or current filter combination. Try adjusting the level or resetting your filters.
              </p>
              <button
                onClick={onResetFilters}
                className="px-6 py-2.5 rounded-full bg-[#0E5C36] text-white text-xs font-semibold hover:bg-[#147B4A] transition-colors shadow-xs cursor-pointer"
              >
                Clear All Filters & Show All
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {items.map((item) => {
                const badge = getCategoryBadge(item.category);
                const isBookmarked = bookmarkedIds.includes(item.id);
                const yearNormalized = normalizeAcademicYear(item.academicYear);

                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className="group bg-white/90 backdrop-blur-xs rounded-2xl border border-[#EBE5D8] p-5 transition-all duration-200 hover:border-[#0E5C36]/40 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(14,92,54,0.08)] cursor-pointer flex flex-col justify-between"
                  >
                    {/* Card Content Top */}
                    <div className="space-y-3">
                      {/* Meta Top */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="bg-[#141A16] text-[#FFFFFF] text-[11px] font-bold px-2.5 py-0.5 rounded-full font-mono">
                            {item.courseCode}
                          </span>
                          <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                            {badge.label}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getLevelColor(item.level)}`}>
                            {item.level}L
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(item.id);
                          }}
                          className={`p-1.5 rounded-full hover:bg-[#FAF7EE] transition-colors ${
                            isBookmarked ? 'text-[#0E5C36]' : 'text-[#525D56]/50 hover:text-[#0E5C36]'
                          }`}
                          title={isBookmarked ? 'Saved to bookmarks' : 'Save bookmark'}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#0E5C36]' : ''}`} />
                        </button>
                      </div>

                      {/* Academic Year Session */}
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#525D56] bg-[#FAF7EE] px-2.5 py-1 rounded-full border border-[#EBE5D8] w-fit font-sans">
                        <Calendar className="w-3.5 h-3.5 text-[#0E5C36]" />
                        <span>Session: {yearNormalized}</span>
                      </div>

                      {/* Title & Course */}
                      <div>
                        <h3 className="font-editorial font-bold text-base text-[#141A16] group-hover:text-[#0E5C36] transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#525D56] mt-1 font-sans truncate">
                          {item.courseTitle}
                        </p>
                      </div>

                      {/* Author */}
                      <p className="text-xs text-[#525D56] font-sans">
                        By <span className="font-semibold text-[#141A16]">{item.author}</span>
                      </p>

                      {/* Summary */}
                      <p className="text-xs text-[#2C3530] font-sans line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Standardized Tags */}
                      <div className="flex flex-wrap gap-1 pt-1 font-sans">
                        {item.tags.map((tag) => {
                          const tagType = getTagType(tag);
                          return (
                            <span 
                              key={tag} 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSearchQuery(tag);
                              }}
                              className={`text-[10px] px-2.5 py-0.5 rounded-full border ${getTagStyles(tagType)} cursor-pointer transition-colors`}
                              title={`Filter by tag: ${tag}`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-4 pt-3.5 border-t border-[#F0EAD6] flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[#525D56] font-sans font-medium">
                        {item.fileFormat} • {item.fileSize} • Sem {item.semester}
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(item);
                        }}
                        className="bg-[#E7F3EC] text-[#0E5C36] hover:bg-[#0E5C36] hover:text-white font-semibold text-xs px-3 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-1 font-sans"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
