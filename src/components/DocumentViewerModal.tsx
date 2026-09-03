import React, { useState } from 'react';
import { ArchiveItem } from '../types';
import { 
  X, 
  Download, 
  Printer, 
  Bookmark, 
  Share2, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut,
  Calendar,
  Clock,
  Award
} from 'lucide-react';

interface DocumentViewerModalProps {
  item: ArchiveItem | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  item,
  onClose,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [showAnswerHints, setShowAnswerHints] = useState<{ [key: number]: boolean }>({});
  const [fontSizeClass, setFontSizeClass] = useState<'text-sm' | 'text-base' | 'text-lg'>('text-base');
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!item) return null;

  const toggleHint = (num: number) => {
    setShowAnswerHints(prev => ({
      ...prev,
      [num]: !prev[num]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const textToCopy = `${item.title}\nCourse: ${item.courseCode} - ${item.courseTitle}\nAuthor/Lecturer: ${item.author}\n\n${item.summaryOrContent}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // Generate text blob for student download
    let exportContent = `==========================================================\n`;
    exportContent += `NNAMDI AZIKIWE UNIVERSITY, AWKA\n`;
    exportContent += `DEPARTMENT OF ENGLISH LANGUAGE AND LITERATURE (NASELS ARCHIVE)\n`;
    exportContent += `==========================================================\n\n`;
    exportContent += `TITLE: ${item.title}\n`;
    exportContent += `COURSE: ${item.courseCode} - ${item.courseTitle}\n`;
    exportContent += `LEVEL: ${item.level} Level | SEMESTER: ${item.semester} Semester\n`;
    exportContent += `CATEGORY: ${item.category.toUpperCase()}\n`;
    exportContent += `AUTHOR / SOURCE: ${item.author}\n`;
    exportContent += `ACADEMIC YEAR: ${item.academicYear || 'Current Session'}\n`;
    exportContent += `VERIFICATION: ${item.verifiedBy}\n\n`;
    exportContent += `----------------------------------------------------------\n`;
    exportContent += `CONTENT / EXAMINATION MATERIAL:\n`;
    exportContent += `----------------------------------------------------------\n\n`;
    exportContent += item.summaryOrContent;

    if (item.examDetails) {
      exportContent += `\n\nEXAMINATION QUESTIONS:\n`;
      item.examDetails.questions.forEach(q => {
        exportContent += `\nQuestion ${q.number} [${q.marks || 'Marks not specified'}] ${q.compulsory ? '(COMPULSORY)' : ''}:\n${q.text}\n`;
        if (q.modelAnswerHint) {
          exportContent += `\n[Model Answer / Examiner's Key Points]:\n${q.modelAnswerHint}\n`;
        }
      });
    }

    if (item.bookDetails) {
      exportContent += `\n\nCRITICAL ANALYSIS & THEMATIC BREAKDOWN:\n`;
      exportContent += `Genre: ${item.bookDetails.genre}\nSetting: ${item.bookDetails.setting || 'Not specified'}\n`;
      exportContent += `Synopsis: ${item.bookDetails.synopsis}\n\nCritical Reading:\n${item.bookDetails.criticalAnalysis}\n\nThemes:\n`;
      item.bookDetails.themes.forEach(t => {
        exportContent += `- ${t.title}: ${t.explanation}\n`;
      });
    }

    const blob = new Blob([exportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.courseCode}_${item.title.replace(/[^a-zA-Z0-9]/g, '_')}_NASELS.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#2A1F18]/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl flex flex-col border border-[#DCD3C1] overflow-hidden text-[#3E2F24]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Non-Printable) */}
        <div className="no-print bg-[#FDFCF7] text-[#3E2F24] px-5 py-3 flex items-center justify-between border-b border-[#DCD3C1]">
          <div className="flex items-center gap-2 text-xs font-medium">
            <span className="px-2.5 py-1 rounded-md bg-[#3E2F24] font-bold text-[#FDFCF7] font-mono">
              {item.level}L • {item.courseCode}
            </span>
            <span className="hidden sm:inline text-[#5A4638] font-serif truncate max-w-xs md:max-w-md">
              {item.courseTitle}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Font Size Adjusters */}
            <div className="hidden sm:flex items-center bg-[#F5F1E9] border border-[#DCD3C1] rounded-lg px-1 text-xs">
              <button
                onClick={() => setFontSizeClass('text-sm')}
                className={`p-1 px-2 hover:text-[#3E2F24] ${fontSizeClass === 'text-sm' ? 'text-[#3E2F24] font-bold' : 'text-[#8B7355]'}`}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => setFontSizeClass('text-base')}
                className={`p-1 px-2 hover:text-[#3E2F24] ${fontSizeClass === 'text-base' ? 'text-[#3E2F24] font-bold' : 'text-[#8B7355]'}`}
                title="Default text"
              >
                A
              </button>
              <button
                onClick={() => setFontSizeClass('text-lg')}
                className={`p-1 px-2 hover:text-[#3E2F24] ${fontSizeClass === 'text-lg' ? 'text-[#3E2F24] font-bold' : 'text-[#8B7355]'}`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(item.id)}
              className={`p-2 rounded-lg hover:bg-[#F5F1E9] transition-colors ${isBookmarked ? 'text-[#8B7355]' : 'text-[#8B7355]/60 hover:text-[#3E2F24]'}`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark to My Saved'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#8B7355]' : ''}`} />
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg hover:bg-[#F5F1E9] text-[#8B7355] hover:text-[#3E2F24] transition-colors"
              title="Copy text excerpt"
            >
              {copied ? <Check className="w-4 h-4 text-[#8B7355]" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg hover:bg-[#F5F1E9] text-[#8B7355] hover:text-[#3E2F24] transition-colors"
              title="Print document or save to PDF"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Download Document Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs rounded-full bg-[#3E2F24] hover:bg-[#5A4638] text-[#FDFCF7] font-semibold transition-colors shadow-xs font-serif"
              title="Download full material"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Downloaded</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </>
              )}
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-2 ml-1 rounded-lg hover:bg-[#F5F1E9] text-[#8B7355] hover:text-[#3E2F24] transition-colors"
              title="Close window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#FDFCF7] print:bg-white print:p-0">
          {/* Official Document Letterhead */}
          <div className="border-b-2 border-[#3E2F24] pb-6 mb-6 text-center">
            <div className="inline-block px-3 py-1 bg-[#F5F1E9] text-[#8B7355] text-[11px] font-bold rounded-full border border-[#DCD3C1] tracking-wider uppercase mb-2 font-serif">
              National Association of Students of English and Literary Studies (NASELS)
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-[#3E2F24] uppercase">
              NNAMDI AZIKIWE UNIVERSITY, AWKA
            </h1>
            <p className="text-sm font-semibold tracking-wide text-[#5A4638] font-serif mt-0.5">
              FACULTY OF ARTS • DEPARTMENT OF ENGLISH LANGUAGE AND LITERATURE
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-medium text-[#5A4638] font-serif">
              <span className="px-3 py-1 bg-[#F5F1E9] text-[#3E2F24] border border-[#DCD3C1] rounded-lg font-semibold">
                COURSE: {item.courseCode} — {item.courseTitle}
              </span>
              <span>LEVEL: {item.level}L</span>
              <span>SEMESTER: {item.semester} Semester</span>
              {item.academicYear && <span>SESSION: {item.academicYear}</span>}
            </div>
          </div>

          {/* Document Title & Meta Header */}
          <div className="mb-6 bg-white p-5 rounded-2xl border border-[#DCD3C1] shadow-2xs">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8B7355] bg-[#F5F1E9] px-2.5 py-0.5 rounded-full border border-[#DCD3C1] font-serif">
                  {item.category === 'past_question' 
                    ? 'Official Examination Question Paper' 
                    : item.category === 'text' 
                    ? 'Recommended Literary Work & Critique' 
                    : item.category === 'notes' 
                    ? 'Comprehensive Lecture Handout' 
                    : 'Course Syllabus & Guide'}
                </span>
                <h2 className="text-lg sm:text-xl font-bold font-serif text-[#3E2F24] mt-2">
                  {item.title}
                </h2>
                <p className="text-xs text-[#5A4638] mt-1 font-serif">
                  <strong className="text-[#3E2F24]">Author / Course Lecturer:</strong> {item.author}
                </p>
              </div>

              <div className="text-right text-xs text-[#8B7355] shrink-0 font-serif">
                <div className="flex items-center justify-end gap-1 text-[#8B7355] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8B7355]" />
                  <span>{item.verifiedBy}</span>
                </div>
                <div className="mt-1">
                  Format: <span className="font-semibold text-[#3E2F24]">{item.fileFormat}</span> ({item.fileSize})
                </div>
              </div>
            </div>

            {item.description && (
              <p className="mt-3.5 text-xs sm:text-sm text-[#5A4638] italic border-l-2 border-[#8B7355] pl-3.5 font-serif">
                {item.description}
              </p>
            )}
          </div>

          {/* PAST QUESTION SPECIFIC DISPLAY */}
          {item.category === 'past_question' && item.examDetails && (
            <div className="space-y-6">
              {/* Exam Instructions Banner */}
              <div className="bg-[#F5F1E9] border border-[#DCD3C1] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-[#3E2F24] space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-[#3E2F24] font-serif">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#8B7355]" />
                    <span>Time Allowed: {item.examDetails.timeAllowed}</span>
                  </div>
                  <div>
                    Total Marks: {item.examDetails.totalMarks || '70 Marks'}
                  </div>
                </div>
                <p className="pt-1 font-serif text-[#5A4638]">
                  <strong>INSTRUCTIONS:</strong> {item.examDetails.instructions}
                </p>
              </div>

              {/* Questions List */}
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-[#DCD3C1]">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#3E2F24] font-serif">
                    Examination Questions
                  </h3>
                  <span className="text-xs text-[#8B7355] font-serif">
                    Click hints to reveal model answering guidelines
                  </span>
                </div>

                {item.examDetails.questions.map((q) => (
                  <div 
                    key={q.number} 
                    className="p-5 rounded-2xl bg-white border border-[#DCD3C1] shadow-2xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#3E2F24] text-[#FDFCF7] flex items-center justify-center text-xs font-bold shrink-0 font-mono">
                          {q.number}
                        </span>
                        {q.compulsory && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F5F1E9] text-[#8B7355] border border-[#DCD3C1] font-serif">
                            COMPULSORY
                          </span>
                        )}
                        {q.section && (
                          <span className="text-xs font-semibold text-[#8B7355] font-serif">
                            {q.section}
                          </span>
                        )}
                      </div>

                      {q.marks && (
                        <span className="px-2.5 py-0.5 text-xs font-bold text-[#3E2F24] bg-[#F5F1E9] border border-[#DCD3C1] rounded-lg font-mono">
                          {q.marks}
                        </span>
                      )}
                    </div>

                    {/* Question Text */}
                    <div className={`${fontSizeClass} font-serif text-[#3E2F24] whitespace-pre-line leading-relaxed pl-1`}>
                      {q.text}
                    </div>

                    {/* Model Answer Hint Toggle */}
                    {q.modelAnswerHint && (
                      <div className="pt-2 border-t border-[#DCD3C1]/60 no-print">
                        <button
                          onClick={() => toggleHint(q.number)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-[#8B7355] hover:text-[#3E2F24] transition-colors font-serif"
                        >
                          {showAnswerHints[q.number] ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-[#8B7355]" />
                              <span>Hide Model Answer & Marking Points</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5 text-[#8B7355]" />
                              <span>Reveal Model Answer & Marking Points</span>
                            </>
                          )}
                        </button>

                        {showAnswerHints[q.number] && (
                          <div className="mt-2.5 p-4 rounded-xl bg-[#F5F1E9] text-[#3E2F24] text-xs font-serif leading-relaxed border border-[#DCD3C1] animate-in fade-in duration-100">
                            <div className="font-bold text-[#8B7355] mb-1.5 text-xs uppercase tracking-wider font-serif flex items-center gap-1.5">
                              <Award className="w-3.5 h-3.5 text-[#8B7355]" />
                              Examiner’s Key Points & Model Architecture:
                            </div>
                            <div className="whitespace-pre-line text-[#5A4638] font-serif text-xs">
                              {q.modelAnswerHint}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RECOMMENDED TEXT DETAILED BREAKDOWN */}
          {item.category === 'text' && item.bookDetails && (
            <div className="space-y-6">
              {/* Literary Metadata Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-[#DCD3C1] text-xs font-serif">
                <div>
                  <span className="text-[#8B7355] block text-[11px]">Original Year</span>
                  <span className="font-bold text-[#3E2F24]">{item.bookDetails.originalPublicationYear}</span>
                </div>
                <div>
                  <span className="text-[#8B7355] block text-[11px]">Genre</span>
                  <span className="font-bold text-[#3E2F24]">{item.bookDetails.genre}</span>
                </div>
                <div>
                  <span className="text-[#8B7355] block text-[11px]">Literary Movement</span>
                  <span className="font-bold text-[#3E2F24]">{item.bookDetails.literaryMovement}</span>
                </div>
                <div>
                  <span className="text-[#8B7355] block text-[11px]">Setting</span>
                  <span className="font-bold text-[#3E2F24]">{item.bookDetails.setting || 'Nigeria'}</span>
                </div>
              </div>

              {/* Characters Guide */}
              {item.bookDetails.characters && item.bookDetails.characters.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-[#DCD3C1]">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#3E2F24] font-serif mb-3.5">
                    Major Dramatis Personae / Character Index
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {item.bookDetails.characters.map((char, idx) => (
                      <div key={idx} className="p-3.5 bg-[#F5F1E9] rounded-xl border border-[#DCD3C1] text-xs font-serif">
                        <div className="flex items-center justify-between">
                          <strong className="text-[#3E2F24] text-sm font-serif">{char.name}</strong>
                          <span className="text-[10px] px-2 py-0.5 bg-white text-[#8B7355] border border-[#DCD3C1] rounded-full font-medium">
                            {char.role}
                          </span>
                        </div>
                        <p className="text-[#5A4638] mt-1.5 leading-relaxed">{char.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Thematic Matrix */}
              {item.bookDetails.themes && (
                <div className="bg-white p-6 rounded-2xl border border-[#DCD3C1]">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#3E2F24] font-serif mb-3.5">
                    Core Themes & Critical Interpretation
                  </h3>
                  <div className="space-y-3.5">
                    {item.bookDetails.themes.map((th, i) => (
                      <div key={i} className="border-l-2 border-[#8B7355] pl-3.5 py-1">
                        <h4 className="text-xs font-bold text-[#3E2F24] font-serif">{th.title}</h4>
                        <p className="text-xs text-[#5A4638] mt-1 leading-relaxed font-serif">{th.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notable Excerpts & Quotations */}
              {item.bookDetails.notableQuotes && (
                <div className="bg-[#F5F1E9] text-[#3E2F24] p-6 rounded-2xl border border-[#DCD3C1]">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B7355] font-serif mb-3">
                    Key Citations for Examination Essays
                  </h3>
                  <div className="space-y-3.5 text-xs">
                    {item.bookDetails.notableQuotes.map((q, i) => (
                      <blockquote key={i} className="border-l-2 border-[#8B7355] pl-3.5 py-1 italic font-serif">
                        "{q.quote}"
                        <footer className="text-[11px] text-[#8B7355] not-italic font-sans mt-1">
                          — {q.speaker || 'Narrator'} ({q.context})
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MAIN TEXT BODY / LECTURE NOTES BODY */}
          <div className="mt-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#DCD3C1] shadow-2xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#3E2F24] font-serif mb-4 pb-2 border-b border-[#DCD3C1]">
              {item.category === 'notes' ? 'Complete Lecture & Syllabus Text' : 'Academic Text Transcript / Summary'}
            </h3>
            <div className={`prose max-w-none text-[#3E2F24] font-serif ${fontSizeClass} leading-relaxed whitespace-pre-line space-y-4`}>
              {item.summaryOrContent}
            </div>
          </div>

          {/* Document Footer Verification */}
          <div className="mt-8 pt-4 border-t border-[#DCD3C1] text-center text-xs text-[#8B7355] font-serif">
            <p className="italic">
              "Eloquentia et Sapientia" — National Association of Students of English and Literary Studies (NASELS)
            </p>
            <p className="mt-1 text-[#5A4638]">
              Archived by NASELS Academic Directorate • Nnamdi Azikiwe University, Awka
            </p>
          </div>
        </div>

        {/* Modal Bottom Sticky Bar */}
        <div className="no-print bg-[#F5F1E9] border-t border-[#DCD3C1] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-[#5A4638] flex items-center gap-2 font-serif">
            <span>Tags:</span>
            <div className="flex flex-wrap gap-1">
              {item.tags.map((t, idx) => (
                <span key={idx} className="px-2.5 py-0.5 bg-white text-[#5A4638] border border-[#DCD3C1] rounded-full text-[11px]">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-full border border-[#DCD3C1] bg-white hover:bg-[#F5F1E9] text-[#3E2F24] font-medium flex items-center gap-1.5 transition-colors font-serif"
            >
              <Printer className="w-3.5 h-3.5 text-[#8B7355]" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-5 py-2 rounded-full bg-[#3E2F24] hover:bg-[#5A4638] text-[#FDFCF7] font-semibold flex items-center gap-1.5 transition-colors shadow-xs font-serif"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Text (.txt)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
