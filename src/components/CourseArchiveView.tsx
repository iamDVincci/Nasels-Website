import React, { useState, useMemo } from 'react';
import { ArchiveItem, AcademicLevel, ResourceCategory, AcademicTrack, Semester } from '../types';
import { UNIZIK_COURSES } from '../data/coursesData';
import { 
  normalizeAcademicYear, 
  getTagType, 
  getTagStyles, 
  STANDARD_ACADEMIC_YEARS,
  getCategoryLabel
} from '../utils/tagging';
import { 
  GraduationCap, 
  FolderTree, 
  Calendar, 
  BookOpen, 
  FileText, 
  Award, 
  ChevronDown, 
  ChevronRight, 
  Download, 
  Bookmark, 
  Search, 
  Upload, 
  Layers, 
  Tag, 
  Filter, 
  Sparkles, 
  ExternalLink,
  Clock,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface CourseArchiveViewProps {
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
  onOpenContributeWithCourse?: (courseCode: string, courseTitle: string, level: '100' | '200' | '300' | '400') => void;
  onResetFilters: () => void;
}

export const CourseArchiveView: React.FC<CourseArchiveViewProps> = ({
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
  onOpenContributeWithCourse,
  onResetFilters
}) => {
  // Specific Academic Year filter for the course view
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('All');
  // Expanded courses state (keys: course codes)
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>(() => {
    // Default expand first 3 courses
    const initial: Record<string, boolean> = {};
    UNIZIK_COURSES.slice(0, 4).forEach(c => { initial[c.code] = true; });
    return initial;
  });

  // Selected tag filter
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Toggle single course expand/collapse
  const toggleCourse = (code: string) => {
    setExpandedCourses(prev => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    UNIZIK_COURSES.forEach(c => { all[c.code] = true; });
    setExpandedCourses(all);
  };

  const collapseAll = () => {
    setExpandedCourses({});
  };

  // Group all available courses and map their archive materials
  const courseData = useMemo(() => {
    return UNIZIK_COURSES.map(course => {
      // Find all archive items for this course
      const courseItems = items.filter(item => {
        const matchesCode = item.courseCode.trim().toUpperCase().includes(course.code.trim().toUpperCase());
        return matchesCode;
      });

      // Filter by academic year if selected
      let filteredItems = courseItems;
      if (selectedYearFilter !== 'All') {
        filteredItems = filteredItems.filter(item => {
          const normYear = normalizeAcademicYear(item.academicYear);
          return normYear === selectedYearFilter;
        });
      }

      // Filter by category if selected
      if (selectedCategory !== 'all') {
        filteredItems = filteredItems.filter(item => item.category === selectedCategory);
      }

      // Filter by tag if selected
      if (selectedTag !== 'All') {
        filteredItems = filteredItems.filter(item => item.tags.includes(selectedTag));
      }

      // Filter by search query if any
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        filteredItems = filteredItems.filter(item => {
          return item.title.toLowerCase().includes(q) ||
                 item.description.toLowerCase().includes(q) ||
                 item.author.toLowerCase().includes(q) ||
                 item.tags.some(t => t.toLowerCase().includes(q));
        });
      }

      // Sub-categorize content by Academic Year
      const yearBuckets: Record<string, ArchiveItem[]> = {};
      filteredItems.forEach(item => {
        const yearKey = normalizeAcademicYear(item.academicYear);
        if (!yearBuckets[yearKey]) {
          yearBuckets[yearKey] = [];
        }
        yearBuckets[yearKey].push(item);
      });

      // Distinct sorted years for this course
      const sortedYears = Object.keys(yearBuckets).sort((a, b) => {
        if (a === 'Core Curriculum') return 1;
        if (b === 'Core Curriculum') return -1;
        return b.localeCompare(a);
      });

      return {
        course,
        totalItems: courseItems.length,
        filteredCount: filteredItems.length,
        yearBuckets,
        sortedYears
      };
    });
  }, [items, selectedYearFilter, selectedCategory, selectedTag, searchQuery]);

  // Filter courses by Level and Track
  const displayedCourses = useMemo(() => {
    return courseData.filter(({ course, totalItems, filteredCount }) => {
      if (selectedLevel !== 'All' && course.level !== selectedLevel) return false;
      if (selectedSemester !== 'All' && course.semester !== selectedSemester) return false;
      if (selectedTrack !== 'All' && course.track !== selectedTrack && course.track !== 'General/Combined') return false;
      
      // If there is an active search or tag, only show courses that match or have matching items
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesCourseInfo = course.code.toLowerCase().includes(q) || 
                                  course.title.toLowerCase().includes(q) ||
                                  (course.lecturerInCharge && course.lecturerInCharge.toLowerCase().includes(q));
        if (!matchesCourseInfo && filteredCount === 0) return false;
      }

      if (selectedTag !== 'All' && filteredCount === 0) {
        return false;
      }

      return true;
    });
  }, [courseData, selectedLevel, selectedSemester, selectedTrack, searchQuery, selectedTag]);

  // Get all unique academic years across all materials
  const allAvailableYears = useMemo(() => {
    const set = new Set<string>();
    items.forEach(item => {
      set.add(normalizeAcademicYear(item.academicYear));
    });
    return Array.from(set).sort((a, b) => {
      if (a === 'Core Curriculum') return 1;
      if (b === 'Core Curriculum') return -1;
      return b.localeCompare(a);
    });
  }, [items]);

  // Standard tags frequency across current items for the tag bar
  const topTags = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach(item => {
      item.tags.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 18)
      .map(([tag]) => tag);
  }, [items]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'text':
        return <BookOpen className="w-3.5 h-3.5 text-[#6B2361]" />;
      case 'notes':
        return <FileText className="w-3.5 h-3.5 text-[#0E5C36]" />;
      case 'past_question':
        return <Award className="w-3.5 h-3.5 text-[#0E5C36]" />;
      default:
        return <GraduationCap className="w-3.5 h-3.5 text-[#525D56]" />;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Overview & Structure Banner */}
      <div className="bg-[#FAF7EE] rounded-xl border border-[#F0EAD6] p-5 sm:p-6 text-[#141A16] shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-white text-[#0E5C36] text-xs font-bold uppercase tracking-wider border border-[#F0EAD6]">
              <FolderTree className="w-3.5 h-3.5 text-[#0E5C36]" />
              Course Hierarchy & Academic Session Categorization
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-editorial text-[#141A16]">
              NASELS Departmental Course Catalog & Session Archive
            </h2>
            <p className="text-xs text-[#525D56] leading-relaxed max-w-2xl font-sans">
              Each course is categorized with its official UNIZIK syllabus code, credit load, and lecturer in charge. Within each course, materials are systematically sub-categorized by <strong>Academic Session</strong> with standardized tags.
            </p>
          </div>

          {/* Quick Action Controls */}
          <div className="flex flex-wrap items-center gap-2 text-xs shrink-0 font-sans">
            <button
              onClick={expandAll}
              className="px-3.5 py-1.5 rounded-[6px] bg-white border border-[#F0EAD6] text-[#2C3530] hover:text-[#0E5C36] hover:bg-[#FAF7EE] transition-colors cursor-pointer"
            >
              Expand All Courses
            </button>
            <button
              onClick={collapseAll}
              className="px-3.5 py-1.5 rounded-[6px] bg-white border border-[#F0EAD6] text-[#2C3530] hover:text-[#0E5C36] hover:bg-[#FAF7EE] transition-colors cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Academic Year Filter Bar */}
        <div className="mt-5 pt-4 border-t border-[#F0EAD6] flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0E5C36] shrink-0">
            <Calendar className="w-4 h-4 text-[#0E5C36]" />
            <span>Sub-Categorize by Academic Session:</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-sans overflow-x-auto no-scrollbar -mx-1 px-1 py-1 whitespace-nowrap sm:flex-wrap">
            <button
              onClick={() => setSelectedYearFilter('All')}
              className={`px-3 py-1 rounded-[6px] border transition-all cursor-pointer shrink-0 ${
                selectedYearFilter === 'All'
                  ? 'bg-[#0E5C36] text-white border-[#0E5C36] font-bold shadow-2xs'
                  : 'bg-white text-[#2C3530] border-[#F0EAD6] hover:bg-[#FAF7EE]'
              }`}
            >
              All Academic Sessions
            </button>

            {allAvailableYears.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYearFilter(year)}
                className={`px-3 py-1 rounded-[6px] border transition-all cursor-pointer shrink-0 ${
                  selectedYearFilter === year
                    ? 'bg-[#0E5C36] text-white border-[#0E5C36] font-bold shadow-2xs'
                    : 'bg-white text-[#2C3530] border-[#F0EAD6] hover:bg-[#FAF7EE]'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Consistent Tagging System Bar */}
      <div className="bg-white rounded-xl border border-[#F0EAD6] p-4 sm:p-5 shadow-2xs space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0E5C36] font-sans">
            <Tag className="w-3.5 h-3.5 text-[#0E5C36]" />
            <span>Standardized Tag Index</span>
            <span className="text-[10px] text-[#525D56] lowercase font-normal">
              (click any tag to filter)
            </span>
          </div>

          {selectedTag !== 'All' && (
            <button
              onClick={() => setSelectedTag('All')}
              className="text-xs text-[#0E5C36] hover:text-[#083820] font-bold underline cursor-pointer"
            >
              Clear Tag Filter ({selectedTag})
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs overflow-x-auto no-scrollbar -mx-1 px-1 py-1 whitespace-nowrap sm:flex-wrap">
          {topTags.map(tag => {
            const tagType = getTagType(tag);
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isSelected ? 'All' : tag)}
                className={`px-2.5 py-1 rounded-[6px] border transition-all text-xs flex items-center gap-1 cursor-pointer shrink-0 ${
                  isSelected
                    ? 'bg-[#0E5C36] text-white border-[#0E5C36] font-bold shadow-2xs'
                    : `${getTagStyles(tagType)}`
                }`}
              >
                <span>{tag}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Course Categories List */}
      <div className="space-y-4">
        {displayedCourses.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#F0EAD6] p-10 text-center space-y-3 shadow-2xs font-sans">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF7EE] flex items-center justify-center text-[#0E5C36] border border-[#F0EAD6]">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold font-editorial text-[#141A16]">
              No courses matched your current filter
            </h3>
            <p className="text-xs text-[#525D56]">
              Try resetting the level, semester, academic session, or search query.
            </p>
            <button
              onClick={() => {
                onResetFilters();
                setSelectedYearFilter('All');
                setSelectedTag('All');
              }}
              className="px-5 py-2 rounded-[6px] bg-[#0E5C36] text-white text-xs font-semibold hover:bg-[#147B4A] transition-colors shadow-2xs cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          displayedCourses.map(({ course, totalItems, filteredCount, yearBuckets, sortedYears }) => {
            const isExpanded = !!expandedCourses[course.code];
            const hasItems = sortedYears.length > 0;

            return (
              <div 
                key={course.code}
                id={`course-${course.code.replace(/\s+/g, '-')}`}
                className="bg-white rounded-xl border border-[#F0EAD6] shadow-2xs overflow-hidden transition-all"
              >
                {/* Course Header Banner */}
                <div 
                  onClick={() => toggleCourse(course.code)}
                  className="p-5 sm:p-6 bg-white hover:bg-[#FAF7EE]/50 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors border-b border-transparent hover:border-[#F0EAD6]"
                >
                  <div className="flex items-start gap-3.5">
                    <button 
                      className="mt-1 p-1 rounded-[4px] bg-[#FAF7EE] text-[#141A16] hover:bg-[#F0EAD6] transition-colors shrink-0"
                      aria-label="Toggle course expansion"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-[#0E5C36]" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-[#525D56]" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-[4px] bg-[#0E5C36] text-white font-mono text-xs font-bold">
                          {course.code}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#FAF7EE] text-[#0E5C36] border border-[#F0EAD6]">
                          {course.level} Level
                        </span>
                        <span className="text-xs text-[#525D56]">
                          {course.semester} Sem • {course.creditUnits} Units
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-[#6B2361] bg-[#FAF7EE] border border-[#F0EAD6]">
                          {course.track}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold font-editorial text-[#141A16]">
                        {course.title}
                      </h3>

                      {course.lecturerInCharge && (
                        <p className="text-xs text-[#525D56] font-sans">
                          <span className="font-semibold text-[#141A16]">Lecturer:</span> {course.lecturerInCharge}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Course Status & Session Counts */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 shrink-0 pl-7 sm:pl-0 font-sans">
                    <div className="flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-[4px] text-xs font-bold bg-[#FAF7EE] text-[#0E5C36] border border-[#F0EAD6]">
                        {filteredCount} {filteredCount === 1 ? 'Resource' : 'Resources'}
                      </span>
                    </div>

                    {/* Active Academic Sessions Available */}
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#525D56]">
                      {sortedYears.map(yr => (
                        <span key={yr} className="px-1.5 py-0.5 rounded-[4px] bg-[#FAF7EE] border border-[#F0EAD6]">
                          {yr}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Expanded Sub-Categories By Academic Year */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 bg-[#FAF7EE]/50 border-t border-[#F0EAD6] space-y-6">
                    {/* Course Description & Modules Summary */}
                    <div className="p-3.5 bg-white rounded-lg border border-[#F0EAD6] text-xs text-[#525D56] space-y-2">
                      <p className="leading-relaxed font-sans">
                        <strong className="text-[#141A16]">Course Scope:</strong> {course.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#F0EAD6] text-[11px] font-sans">
                        <span className="font-bold text-[#0E5C36] uppercase">Key Modules:</span>
                        {course.coreTopics.slice(0, 4).map((t, idx) => (
                          <span key={idx} className="bg-[#FAF7EE] text-[#141A16] px-2 py-0.5 rounded-[4px] border border-[#F0EAD6]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Academic Year Sub-Categories */}
                    {!hasItems ? (
                      <div className="p-6 bg-white rounded-lg border border-dashed border-[#F0EAD6] text-center space-y-2">
                        <p className="text-xs text-[#525D56]">
                          No resources currently available under this course for the selected session filter.
                        </p>
                        {onOpenContributeWithCourse && (
                          <button
                            onClick={() => onOpenContributeWithCourse(course.code, course.title, course.level)}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-[6px] bg-[#0E5C36] text-white text-xs font-semibold hover:bg-[#147B4A] transition-colors cursor-pointer"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>Contribute Material for {course.code}</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {sortedYears.map((yearKey) => {
                          const yearItems = yearBuckets[yearKey] || [];
                          return (
                            <div 
                              key={yearKey} 
                              className="bg-white rounded-lg border border-[#F0EAD6] overflow-hidden shadow-2xs"
                            >
                              {/* Sub-Category Header: Academic Year */}
                              <div className="bg-[#FAF7EE] px-4 sm:px-5 py-3 border-b border-[#F0EAD6] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-sans">
                                <div className="flex items-center gap-2 text-xs font-bold text-[#141A16]">
                                  <Calendar className="w-4 h-4 text-[#0E5C36]" />
                                  <span>Academic Session: {yearKey}</span>
                                  <span className="text-[11px] font-normal text-[#525D56]">
                                    ({yearItems.length} {yearItems.length === 1 ? 'material' : 'materials'})
                                  </span>
                                </div>

                                <span className="text-[11px] text-[#0E5C36] font-medium italic">
                                  Verified by NASELS UNIZIK Academic Board
                                </span>
                              </div>

                              {/* Items Grid for this Academic Year */}
                              <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                {yearItems.map((item) => {
                                  const isBookmarked = bookmarkedIds.includes(item.id);
                                  const catLabel = getCategoryLabel(item.category);

                                  return (
                                    <div
                                      key={item.id}
                                      onClick={() => onSelectItem(item)}
                                      className="group bg-white hover:bg-[#FAF7EE]/30 rounded-lg border border-[#F0EAD6] p-4 flex flex-col justify-between space-y-3 cursor-pointer hover:border-[#0E5C36]/40 hover:shadow-md hover:-translate-y-0.5 transition-all"
                                    >
                                      <div className="space-y-2">
                                        {/* Meta row */}
                                        <div className="flex items-center justify-between gap-2 font-sans">
                                          <div className="flex items-center gap-1.5">
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] text-[11px] font-bold bg-[#FAF7EE] text-[#0E5C36] border border-[#F0EAD6]">
                                              {getCategoryIcon(item.category)}
                                              <span>{catLabel}</span>
                                            </span>
                                            <span className="text-[11px] text-[#525D56] font-mono font-medium">
                                              {item.fileFormat} • {item.fileSize}
                                            </span>
                                          </div>

                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              onToggleBookmark(item.id);
                                            }}
                                            className={`p-1.5 rounded-[4px] transition-colors cursor-pointer ${
                                              isBookmarked
                                                ? 'bg-[#E7F3EC] text-[#0E5C36]'
                                                : 'text-[#525D56]/60 hover:text-[#0E5C36] hover:bg-[#FAF7EE]'
                                            }`}
                                            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Material'}
                                          >
                                            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-[#0E5C36]' : ''}`} />
                                          </button>
                                        </div>

                                        {/* Material Title */}
                                        <h4 className="text-sm font-bold font-editorial text-[#141A16] group-hover:text-[#0E5C36] transition-colors leading-snug">
                                          {item.title}
                                        </h4>

                                        {/* Author / Source */}
                                        <p className="text-[11px] text-[#525D56] font-sans">
                                          <span className="font-semibold text-[#141A16]">Source:</span> {item.author}
                                        </p>

                                        {/* Description */}
                                        <p className="text-xs text-[#525D56] line-clamp-2 leading-relaxed font-sans">
                                          {item.description}
                                        </p>
                                      </div>

                                      {/* Standardized Tags & Action */}
                                      <div className="pt-2 border-t border-[#F0EAD6] space-y-2.5 font-sans">
                                        {/* Consistent Tag Chips */}
                                        <div className="flex flex-wrap gap-1">
                                          {item.tags.map((tag) => {
                                            const tagType = getTagType(tag);
                                            return (
                                              <span
                                                key={tag}
                                                className={`text-[10px] px-1.5 py-0.5 rounded-[4px] border ${getTagStyles(tagType)}`}
                                              >
                                                {tag}
                                              </span>
                                            );
                                          })}
                                        </div>

                                        {/* Bottom Action */}
                                        <div className="flex items-center justify-between text-xs pt-1">
                                          <span className="text-[11px] text-[#525D56] flex items-center gap-1">
                                            <Download className="w-3 h-3" />
                                            <span>{item.downloadCount} accesses</span>
                                          </span>

                                          <span className="inline-flex items-center gap-1 font-semibold text-[#0E5C36] group-hover:text-[#147B4A] transition-colors">
                                            <span>Open & Practice</span>
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
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
          })
        )}
      </div>
    </div>
  );
};
