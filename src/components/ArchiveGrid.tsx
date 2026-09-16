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
  // Archive View Mode: default to clean 'grid' for modern uncluttered SaaS aesthetic
  const [archiveViewMode, setArchiveViewMode] = useState<'courses' | 'grid'>('grid');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'text':
        return <BookOpen className="w-3.5 h-3.5 text-purple-700" />;
      case 'notes':
        return <FileText className="w-3.5 h-3.5 text-emerald-700" />;
      case 'past_question':
        return <Award className="w-3.5 h-3.5 text-slate-700" />;
      default:
        return <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'text':
        return { label: 'Recommended Text', bg: 'bg-purple-50 text-purple-800 border-purple-200' };
      case 'notes':
        return { label: 'Lecture Notes', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'past_question':
        return { label: 'Past Question Paper', bg: 'bg-slate-100 text-slate-800 border-slate-200' };
      default:
        return { label: 'Course Outline', bg: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case '100':
        return 'bg-emerald-700 text-white';
      case '200':
        return 'bg-emerald-800 text-white';
      case '300':
        return 'bg-purple-800 text-white';
      case '400':
        return 'bg-slate-900 text-white';
      default:
        return 'bg-emerald-700 text-white';
    }
  };

  // Calculate counts
  const totalCount = items.length;

  return (
    <div className="space-y-6">
      {/* View Mode Switcher Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">Archive Organization</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
              {archiveViewMode === 'courses' ? 'Structured Course Categories' : 'Resource Cards Matrix'}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {archiveViewMode === 'courses' 
              ? 'Organized by Departmental Courses, with each course sub-categorized by Academic Year.'
              : 'Direct card view displaying authenticated past questions, literature texts, and lecture notes.'}
          </p>
        </div>

        {/* Mode Toggle Buttons */}
        <div className="flex items-center bg-slate-100/80 p-1 rounded-full border border-slate-200 shrink-0 font-sans">
          <button
            onClick={() => setArchiveViewMode('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              archiveViewMode === 'grid'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Cards Grid</span>
          </button>

          <button
            onClick={() => setArchiveViewMode('courses')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              archiveViewMode === 'courses'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5" />
            <span>By Course</span>
          </button>
        </div>
      </div>

      {/* Filtering Header Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4 font-sans">
        {/* Row 1: Academic Level Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-emerald-700" />
            <span>Academic Level</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {(['All', '100', '200', '300', '400'] as AcademicLevel[]).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-[#0E5C36] text-white border-[#0E5C36] shadow-xs'
                    : 'bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200'
                }`}
              >
                {lvl === 'All' ? 'All Levels' : `${lvl} Level`}
              </button>
            ))}
          </div>
        </div>

        <div className="h-px bg-slate-100" />

        {/* Row 2: Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All Resources' },
              { id: 'past_question', label: 'Past Questions (PQ)' },
              { id: 'text', label: 'Recommended Texts' },
              { id: 'notes', label: 'Lecture Notes' },
              { id: 'outline', label: 'Outlines' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ResourceCategory)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-full border transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#0E5C36] text-white font-bold border-[#0E5C36] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
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
              className="bg-slate-50 border border-slate-200 text-slate-800 py-1.5 px-3.5 rounded-full focus:outline-none focus:border-emerald-600 font-medium"
            >
              <option value="All">All Disciplines</option>
              <option value="Literature">Literature in English</option>
              <option value="Language & Linguistics">English Language & Linguistics</option>
            </select>

            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value as Semester)}
              className="bg-slate-50 border border-slate-200 text-slate-800 py-1.5 px-3.5 rounded-full focus:outline-none focus:border-emerald-600 font-medium"
            >
              <option value="All">All Semesters</option>
              <option value="1st">1st Semester</option>
              <option value="2nd">2nd Semester</option>
            </select>

            {(selectedLevel !== 'All' || selectedCategory !== 'all' || selectedTrack !== 'All' || selectedSemester !== 'All' || searchQuery) && (
              <button
                onClick={onResetFilters}
                className="text-xs text-emerald-800 hover:text-emerald-950 font-semibold underline px-1 cursor-pointer"
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
          <div className="flex items-center justify-between text-xs text-slate-500 px-1 font-sans">
            <p>
              Showing <span className="font-bold text-slate-900">{Math.min(visibleCount, totalCount)}</span> of <span className="font-bold text-slate-900">{totalCount}</span> academic materials
              {selectedLevel !== 'All' && ` for ${selectedLevel} Level`}
              {selectedCategory !== 'all' && ` • ${selectedCategory.replace('_', ' ')}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>

            <span className="hidden sm:inline text-emerald-800 font-medium text-[11px]">
              Click card to preview or solve with AI
            </span>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-xs font-sans">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-200">
                <Search className="w-6 h-6 text-slate-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold font-editorial text-slate-900">
                No matching academic materials found
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {items.slice(0, visibleCount).map((item) => {
                  const badge = getCategoryBadge(item.category);
                  const isBookmarked = bookmarkedIds.includes(item.id);
                  const yearNormalized = normalizeAcademicYear(item.academicYear);

                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectItem(item)}
                      className="group bg-white rounded-2xl border border-slate-200 p-5 transition-all duration-200 hover:border-emerald-600/40 hover:-translate-y-0.5 hover:shadow-md cursor-pointer flex flex-col justify-between"
                    >
                      {/* Card Content Top */}
                      <div className="space-y-3">
                        {/* Meta Top */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="bg-slate-900 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full font-mono">
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
                            className={`p-1.5 rounded-full hover:bg-slate-100 transition-colors ${
                              isBookmarked ? 'text-[#0E5C36]' : 'text-slate-400 hover:text-slate-700'
                            }`}
                            title={isBookmarked ? 'Saved to bookmarks' : 'Save bookmark'}
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#0E5C36]' : ''}`} />
                          </button>
                        </div>

                        {/* Academic Year Session */}
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200 w-fit font-sans">
                          <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Session: {yearNormalized}</span>
                        </div>

                        {/* Title & Course */}
                        <div>
                          <h3 className="font-editorial font-bold text-base text-slate-900 group-hover:text-[#0E5C36] transition-colors leading-snug line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-1 font-sans truncate">
                            {item.courseTitle}
                          </p>
                        </div>

                        {/* Author */}
                        <p className="text-xs text-slate-500 font-sans">
                          By <span className="font-semibold text-slate-900">{item.author}</span>
                        </p>

                        {/* Summary */}
                        <p className="text-xs text-slate-600 font-sans line-clamp-2 leading-relaxed">
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
                      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-500 font-sans font-medium">
                          {item.fileFormat} • {item.fileSize} • Sem {item.semester}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectItem(item);
                          }}
                          className="bg-emerald-50 text-emerald-800 hover:bg-[#0E5C36] hover:text-white font-semibold text-xs px-3.5 py-1 rounded-full transition-colors cursor-pointer flex items-center gap-1 font-sans"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Load More Pagination Button */}
              {items.length > visibleCount && (
                <div className="pt-4 text-center">
                  <button
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    className="px-6 py-2.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-50 shadow-xs transition-colors cursor-pointer"
                  >
                    Load More Materials ({items.length - visibleCount} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
