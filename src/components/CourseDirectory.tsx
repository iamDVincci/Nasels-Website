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
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-[#F5F1E9] rounded-2xl border border-[#DCD3C1] p-6 sm:p-8 shadow-xs text-[#3E2F24]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#8B7355] text-xs font-bold uppercase tracking-wider mb-2 border border-[#DCD3C1] font-serif shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-[#8B7355]" />
            Curriculum & Syllabi Directory
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#3E2F24] tracking-tight">
            UNIZIK B.A. English Language & Literature Course Outlines
          </h2>
          <p className="text-sm text-[#5A4638] mt-2 leading-relaxed font-serif">
            Complete syllabus outlines, credit loads, and core modular topics for all undergraduate courses offered in the Department of English Language & Literature, Faculty of Arts, Nnamdi Azikiwe University.
          </p>
        </div>

        {/* Level Switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[#DCD3C1]">
          {(['100', '200', '300', '400', 'All'] as AcademicLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all font-serif ${
                selectedLevel === lvl
                  ? 'bg-[#3E2F24] text-[#FDFCF7] shadow-xs'
                  : 'bg-white text-[#5A4638] border border-[#DCD3C1] hover:bg-[#DCD3C1] hover:text-[#3E2F24]'
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
            className="bg-white rounded-2xl border border-[#DCD3C1] shadow-2xs hover:shadow-xl hover:-translate-y-0.5 transition-all p-6 flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header Badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#3E2F24] text-[#FDFCF7] text-xs font-black tracking-wide font-mono">
                      {course.code}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-semibold bg-[#F5F1E9] text-[#3E2F24] border border-[#DCD3C1] font-serif">
                      {course.creditUnits} Credit Units
                    </span>
                    <span className="text-xs text-[#8B7355] font-medium font-serif">
                      {course.semester} Semester
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-serif text-[#3E2F24] mt-2">
                    {course.title}
                  </h3>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#8B7355] bg-[#F5F1E9] border border-[#DCD3C1] shrink-0 font-serif">
                  {course.track}
                </span>
              </div>

              {/* Lecturer in charge */}
              {course.lecturerInCharge && (
                <div className="flex items-center gap-1.5 text-xs text-[#3E2F24] bg-[#F5F1E9] p-2.5 rounded-xl border border-[#DCD3C1] font-serif">
                  <UserCheck className="w-3.5 h-3.5 text-[#8B7355] shrink-0" />
                  <span><strong>Lecturer(s):</strong> {course.lecturerInCharge}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-xs text-[#5A4638] leading-relaxed font-serif">
                {course.description}
              </p>

              {/* Core Topics Checklist */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#8B7355] font-serif">
                  <ListChecks className="w-3.5 h-3.5 text-[#8B7355]" />
                  <span>Core Syllabus Modules:</span>
                </div>
                <ul className="text-xs text-[#5A4638] space-y-1 pl-4 list-disc font-serif">
                  {course.coreTopics.map((topic, idx) => (
                    <li key={idx} className="leading-normal">{topic}</li>
                  ))}
                </ul>
              </div>

              {/* Recommended Reading */}
              {course.recommendedTexts.length > 0 && (
                <div className="pt-2 border-t border-[#DCD3C1]/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7355] block mb-1 font-serif">
                    Prescribed Reading:
                  </span>
                  <p className="text-xs text-[#5A4638] font-serif italic">
                    {course.recommendedTexts.join(' • ')}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom CTA to View Archived Material */}
            <div className="mt-5 pt-3 border-t border-[#DCD3C1] flex items-center justify-end">
              <button
                onClick={() => onSelectCourseFilter(course.code)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FDFCF7] bg-[#3E2F24] hover:bg-[#5A4638] px-4 py-2 rounded-full transition-colors shadow-xs font-serif"
              >
                <FileSearch className="w-3.5 h-3.5 text-[#FDFCF7]" />
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
