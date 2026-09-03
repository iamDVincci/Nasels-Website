import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ArchiveItem, AcademicLevel, ResourceCategory, AcademicTrack } from '../types';
import { UNIZIK_COURSES } from '../data/coursesData';
import { 
  generateStandardTags, 
  getTagType, 
  getTagStyles, 
  STANDARD_ACADEMIC_YEARS, 
  STANDARD_TOPIC_SUGGESTIONS 
} from '../utils/tagging';
import { 
  X, 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Paperclip,
  BookOpen,
  GraduationCap,
  Tag,
  Plus,
  Sparkles,
  Layers,
  Calendar
} from 'lucide-react';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMaterial: (item: ArchiveItem) => void;
  initialCourseCode?: string;
  initialCourseTitle?: string;
  initialLevel?: '100' | '200' | '300' | '400';
}

export const ContributeModal: React.FC<ContributeModalProps> = ({
  isOpen,
  onClose,
  onAddMaterial,
  initialCourseCode,
  initialCourseTitle,
  initialLevel
}) => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<string>('custom');
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState('ENG 101');
  const [courseTitle, setCourseTitle] = useState('Practical English Grammar');
  const [level, setLevel] = useState<'100' | '200' | '300' | '400'>('100');
  const [semester, setSemester] = useState<'1st' | '2nd'>('1st');
  const [category, setCategory] = useState<'text' | 'notes' | 'past_question' | 'outline'>('notes');
  const [track, setTrack] = useState<'Literature' | 'Language & Linguistics' | 'General/Combined'>('Language & Linguistics');
  const [author, setAuthor] = useState('');
  const [academicYear, setAcademicYear] = useState<string>('2023/2024 Session');
  const [isCustomYear, setIsCustomYear] = useState(false);
  const [customYearText, setCustomYearText] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [customTopicInput, setCustomTopicInput] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize if passed initial props
  useEffect(() => {
    if (initialCourseCode) {
      const match = UNIZIK_COURSES.find(c => c.code.toLowerCase() === initialCourseCode.toLowerCase());
      if (match) {
        setSelectedCourseIndex(match.code);
        setCourseCode(match.code);
        setCourseTitle(match.title);
        setLevel(match.level as any);
        setSemester(match.semester);
        setTrack(match.track);
        setAuthor(match.lecturerInCharge || '');
        if (STANDARD_TOPIC_SUGGESTIONS[match.code]) {
          setSelectedTopics(STANDARD_TOPIC_SUGGESTIONS[match.code].slice(0, 3));
        }
      } else {
        setCourseCode(initialCourseCode);
        if (initialCourseTitle) setCourseTitle(initialCourseTitle);
        if (initialLevel) setLevel(initialLevel);
      }
    }
  }, [initialCourseCode, initialCourseTitle, initialLevel, isOpen]);

  // Handle course dropdown change
  const handleCourseSelect = (code: string) => {
    setSelectedCourseIndex(code);
    if (code === 'custom') return;

    const course = UNIZIK_COURSES.find(c => c.code === code);
    if (course) {
      setCourseCode(course.code);
      setCourseTitle(course.title);
      setLevel(course.level as any);
      setSemester(course.semester);
      setTrack(course.track);
      if (course.lecturerInCharge) {
        setAuthor(course.lecturerInCharge);
      }
      // Load topic suggestions
      if (STANDARD_TOPIC_SUGGESTIONS[course.code]) {
        setSelectedTopics(STANDARD_TOPIC_SUGGESTIONS[course.code].slice(0, 3));
      } else {
        setSelectedTopics([]);
      }
    }
  };

  // Toggle topic
  const handleToggleTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  // Add custom topic
  const handleAddCustomTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTopicInput.trim()) {
      const topic = customTopicInput.trim();
      if (!selectedTopics.includes(topic)) {
        setSelectedTopics(prev => [...prev, topic]);
      }
      setCustomTopicInput('');
    }
  };

  // Compute live consistent tags
  const effectiveYear = isCustomYear ? customYearText.trim() : academicYear;
  const standardizedTags = useMemo(() => {
    return generateStandardTags({
      courseCode: courseCode.trim().toUpperCase(),
      level,
      category,
      academicYear: effectiveYear || '2023/2024 Session',
      track,
      customTopics: selectedTopics
    });
  }, [courseCode, level, category, effectiveYear, track, selectedTopics]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setUploadedFileName(file.name);
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
    }
    // Read text content if text file
    if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setContent(event.target.result as string);
        }
      };
      reader.readAsText(file);
    } else {
      if (!content) {
        setContent(`Archived Document File: ${file.name}\nSize: ${(file.size / 1024 / 1024).toFixed(2)} MB\nUploaded for NASELS UNIZIK Archive.\n\nDescription:\n${description || 'Authentic departmental academic material uploaded for student revision.'}`);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please enter a title for the material.');
      return;
    }
    if (!courseCode.trim()) {
      setErrorMsg('Please enter or select the course code (e.g. ENG 211).');
      return;
    }
    if (!content.trim()) {
      setErrorMsg('Please provide the text content, questions, or notes transcript.');
      return;
    }

    const finalYear = isCustomYear ? (customYearText.trim() || '2023/2024 Session') : academicYear;

    const newItem: ArchiveItem = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      courseCode: courseCode.trim().toUpperCase(),
      courseTitle: courseTitle.trim() || 'Departmental Course',
      level,
      semester,
      category,
      track,
      author: author.trim() || 'NASELS Student Contributor',
      academicYear: finalYear,
      description: description.trim() || 'Contributed study material for NASELS UNIZIK.',
      summaryOrContent: content.trim(),
      fileFormat: uploadedFileName.endsWith('.pdf') ? 'PDF' : uploadedFileName.endsWith('.docx') ? 'DOCX' : 'TRANSCRIPT',
      fileSize: uploadedFileName ? '1.2 MB' : '450 KB',
      tags: standardizedTags, // Guaranteed consistent tags
      verifiedBy: 'Community Contributor (NASELS UNIZIK)',
      downloadCount: 1,
      dateAdded: new Date().toISOString().split('T')[0],
      isCustomUpload: true,
      examDetails: category === 'past_question' ? {
        session: finalYear,
        semester,
        courseCode: courseCode.trim().toUpperCase(),
        courseTitle: courseTitle.trim(),
        timeAllowed: '2 Hours 30 Minutes',
        instructions: 'Answer all compulsory questions according to departmental guidelines.',
        questions: [
          {
            number: 1,
            text: content.trim(),
            marks: '70 Marks Total',
            compulsory: true,
            modelAnswerHint: 'Student submitted question paper. Refer to official syllabus notes for verification.'
          }
        ]
      } : undefined
    };

    onAddMaterial(newItem);
    onClose();
  };

  // Recommended topics for current course code
  const currentSuggestedTopics = STANDARD_TOPIC_SUGGESTIONS[courseCode.trim().toUpperCase()] || [
    'Grammar', 'Syntax', 'Phonetics', 'African Prose', 'Drama', 'Poetry', 'Literary Criticism', 'Stylistics'
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2A1F18]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#DCD3C1] overflow-hidden text-[#3E2F24]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FDFCF7] text-[#3E2F24] px-6 py-4 flex items-center justify-between border-b border-[#DCD3C1]">
          <div className="flex items-center gap-2.5">
            <Upload className="w-5 h-5 text-[#8B7355]" />
            <div>
              <h2 className="text-base font-bold font-serif text-[#3E2F24]">
                Contribute Material to NASELS Archive
              </h2>
              <p className="text-xs text-[#5A4638] font-serif">
                Department of English Language and Literature, UNIZIK
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#F5F1E9] text-[#8B7355] hover:text-[#3E2F24] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[82vh] overflow-y-auto bg-[#FDFCF7]/40 font-serif">
          {errorMsg && (
            <div className="p-3 bg-[#F5F1E9] border border-rose-300 text-rose-800 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-700" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Drag & Drop File Box */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-4 sm:p-5 text-center cursor-pointer transition-colors ${
              isDragging
                ? 'border-[#8B7355] bg-[#F5F1E9]'
                : 'border-[#DCD3C1] hover:border-[#8B7355] bg-[#FDFCF7]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.md"
            />
            <div className="w-10 h-10 mx-auto rounded-full bg-[#F5F1E9] border border-[#DCD3C1] flex items-center justify-center text-[#8B7355] mb-2">
              <Paperclip className="w-5 h-5" />
            </div>
            <p className="text-xs font-bold text-[#3E2F24]">
              {uploadedFileName ? (
                <span className="text-[#8B7355]">Selected: {uploadedFileName}</span>
              ) : (
                'Drop your lecture handout, question slip, or text PDF here, or click to browse'
              )}
            </p>
            <p className="text-[11px] text-[#5A4638] mt-1">
              Supports PDF, DOCX, TXT, or manual text transcription below
            </p>
          </div>

          {/* Course Category Quick Selector from Official UNIZIK Curriculum */}
          <div className="p-3.5 bg-[#F5F1E9] rounded-xl border border-[#DCD3C1] space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#3E2F24] flex items-center gap-1.5 uppercase tracking-wider">
                <GraduationCap className="w-3.5 h-3.5 text-[#8B7355]" />
                <span>Select Departmental Course Category:</span>
              </label>
              <span className="text-[10px] text-[#8B7355] font-mono">UNIZIK Syllabus</span>
            </div>
            <select
              value={selectedCourseIndex}
              onChange={(e) => handleCourseSelect(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[#DCD3C1] rounded-lg bg-white text-[#3E2F24] focus:outline-none focus:border-[#8B7355]"
            >
              <option value="custom">-- Choose a Course or Enter Custom Below --</option>
              <optgroup label="100 Level Courses">
                {UNIZIK_COURSES.filter(c => c.level === '100').map(c => (
                  <option key={c.code} value={c.code}>{c.code}: {c.title} ({c.semester} Sem)</option>
                ))}
              </optgroup>
              <optgroup label="200 Level Courses">
                {UNIZIK_COURSES.filter(c => c.level === '200').map(c => (
                  <option key={c.code} value={c.code}>{c.code}: {c.title} ({c.semester} Sem)</option>
                ))}
              </optgroup>
              <optgroup label="300 Level Courses">
                {UNIZIK_COURSES.filter(c => c.level === '300').map(c => (
                  <option key={c.code} value={c.code}>{c.code}: {c.title} ({c.semester} Sem)</option>
                ))}
              </optgroup>
              <optgroup label="400 Level Courses">
                {UNIZIK_COURSES.filter(c => c.level === '400').map(c => (
                  <option key={c.code} value={c.code}>{c.code}: {c.title} ({c.semester} Sem)</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#5A4638] uppercase tracking-wider mb-1">
              Document / Material Title *
            </label>
            <input
              type="text"
              placeholder="e.g. ENG 211 First Semester Past Questions (2022/2023) or Soyinka Study Notes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-[#DCD3C1] rounded-xl bg-white text-[#3E2F24] focus:outline-none focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355]"
              required
            />
          </div>

          {/* Course Code & Course Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#5A4638] uppercase tracking-wider mb-1">
                Course Code *
              </label>
              <input
                type="text"
                placeholder="e.g. ENG 101, ENG 211, ENG 313"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-[#DCD3C1] rounded-xl bg-white text-[#3E2F24] focus:outline-none focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] uppercase font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5A4638] uppercase tracking-wider mb-1">
                Course Title
              </label>
              <input
                type="text"
                placeholder="e.g. African Prose Fiction"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-[#DCD3C1] rounded-xl bg-white text-[#3E2F24] focus:outline-none focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355]"
              />
            </div>
          </div>

          {/* Level, Semester, Category, Track */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block font-bold text-[#5A4638] mb-1">Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value as any)}
                className="w-full px-2.5 py-2.5 border border-[#DCD3C1] rounded-xl bg-white text-[#3E2F24] focus:outline-none focus:border-[#8B7355]"
              >
                <option value="100">100 Level</option>
                <option value="200">200 Level</option>
                <option value="300">300 Level</option>
                <option value="400">400 Level</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#5A4638] mb-1">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value as any)}
                className="w-full px-2.5 py-2.5 border border-[#DCD3C1] rounded-xl bg-white text-[#3E2F24] focus:outline-none focus:border-[#8B7355]"
              >
                <option value="1st">1st Semester</option>
                <option value="2nd">2nd Semester</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#5A4638] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-2.5 py-2.5 border border-[#DCD3C1] rounded-xl bg-white text-[#3E2F24] focus:outline-none focus:border-[#8B7355]"
              >
                <option value="past_question">Past Question (PQ)</option>
                <option value="notes">Lecture Notes</option>
                <option value="text">Recommended Text</option>
                <option value="outline">Course Outline & Guide</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#5A4638] mb-1">Discipline</label>
              <select
                value={track}
                onChange={(e) => setTrack(e.target.value as any)}
                className="w-full px-2.5 py-2.5 border border-[#DCD3C1] rounded-xl bg-white text-[#3E2F24] focus:outline-none focus:border-[#8B7355]"
              >
                <option value="Literature">Literature</option>
                <option value="Language & Linguistics">Linguistics</option>
                <option value="General/Combined">Combined</option>
              </select>
            </div>
          </div>

          {/* Academic Session Sub-Category & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#5A4638] uppercase tracking-wider mb-1">
                Author / Lecturer in Charge
              </label>
              <input
                type="text"
                placeholder="e.g. Prof. C. N. Okeke or Chinua Achebe"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border border-[#DCD3C1] rounded-xl bg-white text-[#3E2F24] focus:outline-none focus:border-[#8B7355]"
              />
            </div>

            {/* Academic Session / Year Dropdown */}
            <div>
              <label className="block text-xs font-bold text-[#5A4638] uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Academic Session (Sub-Category) *</span>
                <button
                  type="button"
                  onClick={() => setIsCustomYear(!isCustomYear)}
                  className="text-[11px] text-[#8B7355] hover:underline"
                >
                  {isCustomYear ? 'Choose Standard Year' : 'Enter Custom'}
                </button>
              </label>
              {isCustomYear ? (
                <input
                  type="text"
                  placeholder="e.g. 2020/2021 Session"
                  value={customYearText}
                  onChange={(e) => setCustomYearText(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DCD3C1] rounded-xl bg-white text-[#3E2F24] focus:outline-none focus:border-[#8B7355]"
                  required
                />
              ) : (
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#DCD3C1] rounded-xl bg-white text-[#3E2F24] focus:outline-none focus:border-[#8B7355]"
                >
                  {STANDARD_ACADEMIC_YEARS.map(yr => (
                    <option key={yr} value={yr}>{yr}</option>
                  ))}
                  <option value="2020/2021 Session">2020/2021 Session</option>
                  <option value="2019/2020 Session">2019/2020 Session</option>
                </select>
              )}
            </div>
          </div>

          {/* Brief Description */}
          <div>
            <label className="block text-xs font-bold text-[#5A4638] uppercase tracking-wider mb-1">
              Short Description / Summary
            </label>
            <input
              type="text"
              placeholder="e.g. Comprehensive notes on generative syntax, X-bar schema, and UNIZIK exam practice questions."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-[#DCD3C1] rounded-xl bg-white text-[#3E2F24] focus:outline-none focus:border-[#8B7355]"
            />
          </div>

          {/* Text Content / Questions Transcript */}
          <div>
            <label className="block text-xs font-bold text-[#5A4638] uppercase tracking-wider mb-1">
              Notes Transcript / Questions & Answers *
            </label>
            <textarea
              rows={5}
              placeholder="Paste the examination questions, lecture notes points, or book critical review here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs font-mono border border-[#DCD3C1] rounded-xl bg-white text-[#3E2F24] focus:outline-none focus:border-[#8B7355]"
              required
            />
          </div>

          {/* ========================================================= */}
          {/* CONSISTENT TAGGING SYSTEM INTERFACE */}
          {/* ========================================================= */}
          <div className="p-4 bg-white rounded-xl border border-[#DCD3C1] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#3E2F24]">
                <Tag className="w-4 h-4 text-[#8B7355]" />
                <span>Standardized Tagging System (Auto-Generated)</span>
              </div>
              <span className="text-[10px] text-[#8B7355] font-semibold bg-[#F5F1E9] px-2 py-0.5 rounded border border-[#DCD3C1]">
                {standardizedTags.length} Active Tags
              </span>
            </div>

            <p className="text-[11px] text-[#5A4638] leading-normal">
              Tags are automatically standardized across Course Code, Level, Academic Session, Category, and Track. You can also select or add topic keywords below:
            </p>

            {/* Live Generated Tag Chips */}
            <div className="flex flex-wrap gap-1.5 p-2.5 bg-[#FDFCF7] rounded-lg border border-[#DCD3C1]/80">
              {standardizedTags.map(tag => {
                const tagType = getTagType(tag);
                return (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-0.5 rounded-md border flex items-center gap-1 ${getTagStyles(tagType)}`}
                  >
                    <span>{tag}</span>
                  </span>
                );
              })}
            </div>

            {/* Recommended Topic Chips for this course */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#8B7355] uppercase tracking-wider block">
                Suggested Topic Tags for {courseCode || 'this course'} (Click to add/remove):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentSuggestedTopics.map(topic => {
                  const isSelected = selectedTopics.includes(topic);
                  return (
                    <button
                      type="button"
                      key={topic}
                      onClick={() => handleToggleTopic(topic)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-[#3E2F24] text-[#FDFCF7] border-[#3E2F24] font-bold'
                          : 'bg-white text-[#5A4638] border-[#DCD3C1] hover:border-[#8B7355]'
                      }`}
                    >
                      {isSelected ? `✓ ${topic}` : `+ ${topic}`}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Topic Keyword Input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="Add custom topic tag (e.g. Anaphora, Hamartia, X-Bar)..."
                value={customTopicInput}
                onChange={(e) => setCustomTopicInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCustomTopic(e);
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs border border-[#DCD3C1] rounded-lg bg-white text-[#3E2F24] focus:outline-none focus:border-[#8B7355]"
              />
              <button
                type="button"
                onClick={handleAddCustomTopic}
                className="px-3 py-1.5 rounded-lg bg-[#F5F1E9] text-[#3E2F24] border border-[#DCD3C1] hover:bg-[#DCD3C1] text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Tag</span>
              </button>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-[#DCD3C1] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#5A4638] hover:text-[#3E2F24]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-xs font-semibold rounded-full bg-[#3E2F24] hover:bg-[#5A4638] text-[#FDFCF7] transition-colors shadow-xs"
            >
              Add to NASELS Archive
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
