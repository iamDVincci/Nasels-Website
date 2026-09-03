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
        return <BookOpen className="w-4 h-4 text-[#8B7355]" />;
      case 'notes':
        return <FileText className="w-4 h-4 text-[#5A4638]" />;
      case 'past_question':
        return <Award className="w-4 h-4 text-[#3E2F24]" />;
      default:
        return <GraduationCap className="w-4 h-4 text-[#8B7355]" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'text':
        return { label: 'Recommended Text', bg: 'bg-[#F5F1E9] text-[#8B7355] border-[#DCD3C1]' };
      case 'notes':
        return { label: 'Lecture Notes', bg: 'bg-[#F5F1E9] text-[#3E2F24] border-[#DCD3C1]' };
      case 'past_question':
        return { label: 'Past Question (PQ)', bg: 'bg-[#F5F1E9] text-[#746046] border-[#DCD3C1]' };
      default:
        return { label: 'Course Outline', bg: 'bg-[#F5F1E9] text-[#5A4638] border-[#DCD3C1]' };
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case '100':
        return 'bg-[#8B7355] text-white';
      case '200':
        return 'bg-[#746046] text-white';
      case '300':
        return 'bg-[#5A4638] text-white';
      case '400':
        return 'bg-[#3E2F24] text-[#FDFCF7]';
      default:
        return 'bg-[#3E2F24] text-white';
    }
  };

  // Calculate counts
  const totalCount = items.length;

  return (
    <div className="space-y-6 font-serif">
      {/* View Mode Switcher Header */}
      <div className="bg-white rounded-2xl border border-[#DCD3C1] shadow-2xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B7355]">Archive Organization:</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F5F1E9] text-[#3E2F24] border border-[#DCD3C1]">
              {archiveViewMode === 'courses' ? 'Structured Course Categories' : 'All Resources Matrix'}
            </span>
          </div>
          <p className="text-xs text-[#5A4638]">
            {archiveViewMode === 'courses' 
              ? 'Organized by Departmental Courses, with each course sub-categorized by Academic Year.'
              : 'Flat catalog displaying all authenticated texts, lecture notes, and past examination papers.'}
          </p>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex items-center bg-[#F5F1E9] p-1 rounded-xl border border-[#DCD3C1] shrink-0">
          <button
            onClick={() => setArchiveViewMode('courses')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              archiveViewMode === 'courses'
                ? 'bg-[#3E2F24] text-[#FDFCF7] shadow-xs'
                : 'text-[#5A4638] hover:text-[#3E2F24]'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>Course Categories (By Year)</span>
          </button>

          <button
            onClick={() => setArchiveViewMode('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
              archiveViewMode === 'grid'
                ? 'bg-[#3E2F24] text-[#FDFCF7] shadow-xs'
                : 'text-[#5A4638] hover:text-[#3E2F24]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Resource Cards Grid</span>
          </button>
        </div>
      </div>

      {/* Filtering Header Toolbar */}
      <div className="bg-white rounded-2xl border border-[#DCD3C1] shadow-2xs p-5 sm:p-6 space-y-4">
        {/* Row 1: Academic Level Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B7355] uppercase tracking-wider">
            <Layers className="w-4 h-4 text-[#8B7355]" />
            <span>Academic Level:</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(['All', '100', '200', '300', '400'] as AcademicLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  selectedLevel === lvl
                    ? 'bg-[#3E2F24] text-[#FDFCF7] shadow-xs'
                    : 'bg-[#F5F1E9] text-[#5A4638] hover:bg-[#DCD3C1] hover:text-[#3E2F24]'
                }`}
              >
                {lvl === 'All' ? 'All Levels' : `${lvl} Level`}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-[#DCD3C1]/60" />

        {/* Row 2: Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Resource Types' },
              { id: 'past_question', label: 'Past Questions (PQ)' },
              { id: 'text', label: 'Recommended Texts' },
              { id: 'notes', label: 'Lecture Notes' },
              { id: 'outline', label: 'Curriculum & Guides' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ResourceCategory)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#8B7355] text-white font-bold border-[#8B7355] shadow-2xs'
                    : 'bg-white text-[#5A4638] border-[#DCD3C1] hover:bg-[#F5F1E9] hover:text-[#3E2F24]'
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
              className="bg-[#F5F1E9] border border-[#DCD3C1] text-[#3E2F24] py-1.5 px-3 rounded-xl focus:outline-none focus:border-[#8B7355]"
            >
              <option value="All">All Disciplines</option>
              <option value="Literature">Literature in English</option>
              <option value="Language & Linguistics">English Language & Linguistics</option>
            </select>

            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value as Semester)}
              className="bg-[#F5F1E9] border border-[#DCD3C1] text-[#3E2F24] py-1.5 px-3 rounded-xl focus:outline-none focus:border-[#8B7355]"
            >
              <option value="All">All Semesters</option>
              <option value="1st">1st Semester</option>
              <option value="2nd">2nd Semester</option>
            </select>

            {(selectedLevel !== 'All' || selectedCategory !== 'all' || selectedTrack !== 'All' || selectedSemester !== 'All' || searchQuery) && (
              <button
                onClick={onResetFilters}
                className="text-xs text-[#8B7355] hover:text-[#3E2F24] font-semibold underline px-1"
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
          <div className="flex items-center justify-between text-xs text-[#5A4638] px-1">
            <p>
              Showing <span className="font-bold text-[#3E2F24]">{totalCount}</span> academic material{totalCount === 1 ? '' : 's'} 
              {selectedLevel !== 'All' && ` for ${selectedLevel} Level`}
              {selectedCategory !== 'all' && ` • ${selectedCategory.replace('_', ' ')}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>

            <span className="hidden sm:inline text-[#8B7355] italic">
              Click any card to read, practice questions, or download
            </span>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#DCD3C1] p-12 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#F5F1E9] flex items-center justify-center text-[#8B7355]">
                <Search className="w-7 h-7 text-[#8B7355]" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#3E2F24]">
                No matching academic materials found
              </h3>
              <p className="text-xs text-[#5A4638] max-w-md mx-auto">
                We couldn't find any resources matching your search terms or current filter combination. Try adjusting the level or resetting your filters.
              </p>
              <button
                onClick={onResetFilters}
                className="px-6 py-2.5 rounded-full bg-[#3E2F24] text-[#FDFCF7] text-xs font-semibold hover:bg-[#5A4638] transition-colors shadow-xs"
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
                    className="group bg-white rounded-2xl border border-[#DCD3C1] shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
                  >
                    {/* Card Header Top */}
                    <div className="p-5 sm:p-6 space-y-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${getLevelColor(item.level)} font-mono`}>
                            {item.level}L
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F5F1E9] text-[#3E2F24] border border-[#DCD3C1] font-mono">
                            {item.courseCode}
                          </span>
                          <span className="text-[11px] text-[#8B7355] font-medium">
                            {item.semester} Sem
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(item.id);
                          }}
                          className={`p-1.5 rounded-full hover:bg-[#F5F1E9] transition-colors ${
                            isBookmarked ? 'text-[#8B7355]' : 'text-[#DCD3C1] hover:text-[#8B7355]'
                          }`}
                          title={isBookmarked ? 'Saved to bookmarks' : 'Save bookmark'}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#8B7355]' : ''}`} />
                        </button>
                      </div>

                      {/* Academic Year Sub-Category Indicator */}
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#746046] bg-[#F5F1E9] px-2.5 py-1 rounded-lg border border-[#DCD3C1]/80 w-fit">
                        <Calendar className="w-3.5 h-3.5 text-[#8B7355]" />
                        <span>Academic Session: {yearNormalized}</span>
                      </div>

                      {/* Title & Course */}
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#8B7355]">
                          {getCategoryIcon(item.category)}
                          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${badge.bg}`}>
                            {badge.label}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-[#3E2F24] group-hover:text-[#8B7355] transition-colors mt-2 line-clamp-2 leading-snug">
                          {item.title}
                        </h3>

                        <p className="text-xs text-[#5A4638] mt-1 font-medium truncate">
                          {item.courseTitle}
                        </p>
                      </div>

                      {/* Author / Lecturer */}
                      <div className="text-xs text-[#5A4638] flex items-center gap-1.5">
                        <span className="text-[#8B7355]">By:</span>
                        <span className="font-semibold text-[#3E2F24] truncate">{item.author}</span>
                      </div>

                      {/* Excerpt / Summary */}
                      <p className="text-xs text-[#5A4638] line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Standardized Tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.tags.map((tag) => {
                          const tagType = getTagType(tag);
                          return (
                            <span 
                              key={tag} 
                              onClick={(e) => {
                                e.stopPropagation();
                                setSearchQuery(tag);
                              }}
                              className={`text-[10px] px-2 py-0.5 rounded-md border ${getTagStyles(tagType)} cursor-pointer transition-colors`}
                              title={`Filter by tag: ${tag}`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="bg-[#FDFCF7] px-5 py-3.5 border-t border-[#DCD3C1] flex items-center justify-between text-xs text-[#5A4638]">
                      <div className="flex items-center gap-1.5 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B7355]" />
                        <span className="truncate max-w-[120px] sm:max-w-[150px]">Verified UNIZIK</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#8B7355] font-mono">
                          {item.fileFormat} • {item.fileSize}
                        </span>
                        <span className="text-[#8B7355] font-bold group-hover:text-[#3E2F24] group-hover:translate-x-0.5 transition-all flex items-center gap-0.5">
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
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
