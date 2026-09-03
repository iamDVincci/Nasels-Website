import React, { useState } from 'react';
import { UNIZIK_COURSES } from '../data/coursesData';
import { CourseOutline, AcademicLevel } from '../types';
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  UserCheck, 
  ArrowRight, 
  ListChecks, 
  CheckCircle,
  FileSearch
} from 'lucide-react';

interface CourseDirectoryProps {
  onSelectCourseFilter: (courseCode: string) => void;
}

export const CourseDirectory: React.FC<CourseDirectoryProps> = ({ onSelectCourseFilter }) => {
  const [selectedLevel, setSelectedLevel] = useState<AcademicLevel>('100');

  const filteredCourses = UNIZIK_COURSES.filter(c => selectedLevel === 'All' || c.level === selectedLevel);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Info */}
      <div className="bg-[#FAF7EE] rounded-xl border border-[#F0EAD6] p-6 sm:p-8 shadow-2xs text-[#141A16]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[4px] bg-white text-[#0E5C36] text-xs font-bold uppercase tracking-wider mb-2 border border-[#F0EAD6] font-sans shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-[#0E5C36]" />
            Curriculum & Syllabi Directory
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-[#141A16] tracking-tight">
            UNIZIK B.A. English Language & Literature Course Outlines
          </h2>
          <p className="text-sm text-[#525D56] mt-2 leading-relaxed font-sans">
            Complete syllabus outlines, credit loads, and core modular topics for all undergraduate courses offered in the Department of English Language & Literature, Faculty of Arts, Nnamdi Azikiwe University.
          </p>
        </div>

        {/* Level Switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[#F0EAD6]">
          {(['100', '200', '300', '400', 'All'] as AcademicLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-4 py-2 text-xs font-bold rounded-[6px] transition-all font-sans cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-[#0E5C36] text-white shadow-2xs'
                  : 'bg-white text-[#2C3530] border border-[#F0EAD6] hover:bg-[#FAF7EE] hover:text-[#0E5C36]'
              }`}
            >
              {lvl === 'All' ? 'All Undergrad Courses' : `${lvl} Level Syllabus`}
            </button>
          ))}
        </div>
      </div>

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCourses.map((course) => (
          <div 
            key={course.code}
            className="bg-white rounded-xl border border-[#F0EAD6] shadow-2xs hover:shadow-md hover:border-[#0E5C36]/40 hover:-translate-y-0.5 transition-all p-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header Badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-[4px] bg-[#0E5C36] text-white text-xs font-black tracking-wide font-mono">
                      {course.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-[4px] text-[11px] font-semibold bg-[#FAF7EE] text-[#0E5C36] border border-[#F0EAD6] font-sans">
                      {course.creditUnits} Credit Units
                    </span>
                    <span className="text-xs text-[#525D56] font-medium font-sans">
                      {course.semester} Semester
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-editorial text-[#141A16] mt-2">
                    {course.title}
                  </h3>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#6B2361] bg-[#FAF7EE] border border-[#F0EAD6] shrink-0 font-sans">
                  {course.track}
                </span>
              </div>

              {/* Lecturer in charge */}
              {course.lecturerInCharge && (
                <div className="flex items-center gap-1.5 text-xs text-[#141A16] bg-[#FAF7EE] p-2.5 rounded-lg border border-[#F0EAD6] font-sans">
                  <UserCheck className="w-3.5 h-3.5 text-[#0E5C36] shrink-0" />
                  <span><strong>Lecturer(s):</strong> {course.lecturerInCharge}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-[#525D56] leading-relaxed font-sans">
                {course.description}
              </p>

              {/* Core Topics Checklist */}
              <div className="space-y-1.5 pt-1 font-sans">
                <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#0E5C36]">
                  <ListChecks className="w-3.5 h-3.5 text-[#0E5C36]" />
                  <span>Core Syllabus Modules:</span>
                </div>
                <ul className="text-xs text-[#525D56] space-y-1 pl-4 list-disc">
                  {course.coreTopics.map((topic, idx) => (
                    <li key={idx} className="leading-normal">{topic}</li>
                  ))}
                </ul>
              </div>

              {/* Recommended Reading */}
              {course.recommendedTexts.length > 0 && (
                <div className="pt-2 border-t border-[#F0EAD6] font-sans">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B2361] block mb-1">
                    Prescribed Reading:
                  </span>
                  <p className="text-xs text-[#525D56] italic">
                    {course.recommendedTexts.join(' • ')}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom CTA to View Archived Material */}
            <div className="mt-5 pt-3 border-t border-[#F0EAD6] flex items-center justify-end font-sans">
              <button
                onClick={() => onSelectCourseFilter(course.code)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#0E5C36] hover:bg-[#147B4A] px-4 py-2 rounded-[6px] transition-colors shadow-2xs cursor-pointer"
              >
                <FileSearch className="w-3.5 h-3.5 text-white" />
                <span>View {course.code} Materials in Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
