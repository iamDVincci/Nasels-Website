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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0A1D13]/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-xl shadow-2xl flex flex-col border border-[#F0EAD6] overflow-hidden text-[#141A16]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Non-Printable) */}
        <div className="no-print bg-[#FAF7EE] text-[#141A16] px-5 py-3 flex items-center justify-between border-b border-[#F0EAD6]">
          <div className="flex items-center gap-2 text-xs font-medium font-sans">
            <span className="px-2.5 py-1 rounded-[4px] bg-[#0E5C36] font-bold text-white font-mono">
              {item.level}L • {item.courseCode}
            </span>
            <span className="hidden sm:inline text-[#525D56] font-sans truncate max-w-xs md:max-w-md">
              {item.courseTitle}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Font Size Adjusters */}
            <div className="hidden sm:flex items-center bg-white border border-[#F0EAD6] rounded-[6px] px-1 text-xs">
              <button
                onClick={() => setFontSizeClass('text-sm')}
                className={`p-1 px-2 hover:text-[#141A16] ${fontSizeClass === 'text-sm' ? 'text-[#0E5C36] font-bold' : 'text-[#525D56]'}`}
                title="Small text"
              >
                A-
              </button>
              <button
                onClick={() => setFontSizeClass('text-base')}
                className={`p-1 px-2 hover:text-[#141A16] ${fontSizeClass === 'text-base' ? 'text-[#0E5C36] font-bold' : 'text-[#525D56]'}`}
                title="Default text"
              >
                A
              </button>
              <button
                onClick={() => setFontSizeClass('text-lg')}
                className={`p-1 px-2 hover:text-[#141A16] ${fontSizeClass === 'text-lg' ? 'text-[#0E5C36] font-bold' : 'text-[#525D56]'}`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(item.id)}
              className={`p-2 rounded-[6px] hover:bg-[#F0EAD6] transition-colors ${isBookmarked ? 'text-[#0E5C36]' : 'text-[#525D56] hover:text-[#141A16]'}`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark to My Saved'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#0E5C36]' : ''}`} />
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-[6px] hover:bg-[#F0EAD6] text-[#525D56] hover:text-[#141A16] transition-colors"
              title="Copy text excerpt"
            >
              {copied ? <Check className="w-4 h-4 text-[#0E5C36]" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-[6px] hover:bg-[#F0EAD6] text-[#525D56] hover:text-[#141A16] transition-colors"
              title="Print document or save to PDF"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Download Document Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs rounded-[6px] bg-[#0E5C36] hover:bg-[#147B4A] text-white font-semibold transition-colors shadow-2xs font-sans cursor-pointer"
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
              className="p-2 ml-1 rounded-[6px] hover:bg-[#F0EAD6] text-[#525D56] hover:text-[#141A16] transition-colors"
              title="Close window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#FAF7EE] print:bg-white print:p-0">
          {/* Official Document Letterhead */}
          <div className="border-b-2 border-[#0E5C36] pb-6 mb-6 text-center">
            <div className="inline-block px-3 py-1 bg-[#E7F3EC] text-[#0E5C36] text-[11px] font-bold rounded-[4px] border border-[#0E5C36]/20 tracking-wider uppercase mb-2 font-sans">
              National Association of Students of English and Literary Studies (NASELS)
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-editorial tracking-tight text-[#141A16] uppercase">
              NNAMDI AZIKIWE UNIVERSITY, AWKA
            </h1>
            <p className="text-sm font-semibold tracking-wide text-[#525D56] font-sans mt-0.5">
              FACULTY OF ARTS • DEPARTMENT OF ENGLISH LANGUAGE AND LITERATURE
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-medium text-[#525D56] font-sans">
              <span className="px-3 py-1 bg-white text-[#141A16] border border-[#F0EAD6] rounded-[4px] font-semibold">
                COURSE: {item.courseCode} — {item.courseTitle}
              </span>
              <span>LEVEL: {item.level}L</span>
              <span>SEMESTER: {item.semester} Semester</span>
              {item.academicYear && <span>SESSION: {item.academicYear}</span>}
            </div>
          </div>

          {/* Document Title & Meta Header */}
          <div className="mb-6 bg-white p-5 rounded-xl border border-[#F0EAD6] shadow-2xs font-sans">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0E5C36] bg-[#FAF7EE] px-2.5 py-0.5 rounded-[4px] border border-[#F0EAD6] font-sans">
                  {item.category === 'past_question' 
                    ? 'Official Examination Question Paper' 
                    : item.category === 'text' 
                    ? 'Recommended Literary Work & Critique' 
                    : item.category === 'notes' 
                    ? 'Comprehensive Lecture Handout' 
                    : 'Course Syllabus & Guide'}
                </span>
                <h2 className="text-lg sm:text-xl font-bold font-editorial text-[#141A16] mt-2">
                  {item.title}
                </h2>
                <p className="text-xs text-[#525D56] mt-1 font-sans">
                  <strong className="text-[#141A16]">Author / Course Lecturer:</strong> {item.author}
                </p>
              </div>

              <div className="text-right text-xs text-[#525D56] shrink-0 font-sans">
                <div className="flex items-center justify-end gap-1 text-[#0E5C36] font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0E5C36]" />
                  <span>{item.verifiedBy}</span>
                </div>
                <div className="mt-1">
                  Format: <span className="font-semibold text-[#141A16]">{item.fileFormat}</span> ({item.fileSize})
                </div>
              </div>
            </div>

            {item.description && (
              <p className="mt-3.5 text-xs sm:text-sm text-[#525D56] italic border-l-2 border-[#0E5C36] pl-3.5 font-sans">
                {item.description}
              </p>
            )}
          </div>

          {/* PAST QUESTION SPECIFIC DISPLAY */}
          {item.category === 'past_question' && item.examDetails && (
            <div className="space-y-6 font-sans">
              {/* Exam Instructions Banner */}
              <div className="bg-[#FAF7EE] border border-[#F0EAD6] rounded-xl p-4 sm:p-5 text-xs sm:text-sm text-[#141A16] space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between font-bold text-[#141A16]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#0E5C36]" />
                    <span>Time Allowed: {item.examDetails.timeAllowed}</span>
                  </div>
                  <div className="text-[#0E5C36] font-mono font-bold">
                    Total Marks: {item.examDetails.totalMarks || '70 Marks'}
                  </div>
                </div>
                <p className="pt-1 text-[#525D56]">
                  <strong>INSTRUCTIONS:</strong> {item.examDetails.instructions}
                </p>
              </div>

              {/* Questions List */}
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-2 border-b border-[#F0EAD6]">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#141A16] font-editorial">
                    Examination Questions
                  </h3>
                  <span className="text-xs text-[#0E5C36]">
                    Click hints to reveal model answering guidelines
                  </span>
                </div>

                {item.examDetails.questions.map((q) => (
                  <div 
                    key={q.number} 
                    className="p-5 rounded-xl bg-white border border-[#F0EAD6] shadow-2xs space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-[4px] bg-[#0E5C36] text-white flex items-center justify-center text-xs font-bold shrink-0 font-mono shadow-2xs">
                          {q.number}
                        </span>
                        {q.compulsory && (
                          <span className="px-2.5 py-0.5 rounded-[4px] text-[11px] font-bold bg-[#FAF7EE] text-[#0E5C36] border border-[#F0EAD6]">
                            COMPULSORY
                          </span>
                        )}
                        {q.section && (
                          <span className="text-xs font-semibold text-[#6B2361]">
                            {q.section}
                          </span>
                        )}
                      </div>

                      {q.marks && (
                        <span className="px-2.5 py-0.5 text-xs font-bold text-[#0E5C36] bg-[#FAF7EE] border border-[#F0EAD6] rounded-[4px] font-mono">
                          {q.marks}
                        </span>
                      )}
                    </div>

                    {/* Question Text */}
                    <div className={`${fontSizeClass} font-editorial text-[#141A16] whitespace-pre-line leading-relaxed pl-1`}>
                      {q.text}
                    </div>

                    {/* Model Answer Hint Toggle */}
                    {q.modelAnswerHint && (
                      <div className="pt-2 border-t border-[#F0EAD6] no-print">
                        <button
                          onClick={() => toggleHint(q.number)}
                          className="flex items-center gap-1.5 text-xs font-semibold text-[#0E5C36] hover:text-[#147B4A] transition-colors cursor-pointer"
                        >
                          {showAnswerHints[q.number] ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-[#0E5C36]" />
                              <span>Hide Model Answer & Marking Points</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5 text-[#0E5C36]" />
                              <span>Reveal Model Answer & Marking Points</span>
                            </>
                          )}
                        </button>

                        {showAnswerHints[q.number] && (
                          <div className="mt-2.5 p-4 rounded-lg bg-[#FAF7EE] text-[#141A16] text-xs leading-relaxed border border-[#F0EAD6] animate-in fade-in duration-100 font-sans">
                            <div className="font-bold text-[#0E5C36] mb-1.5 text-xs uppercase tracking-wider flex items-center gap-1.5">
                              <Award className="w-3.5 h-3.5 text-[#0E5C36]" />
                              Examiner’s Key Points & Model Architecture:
                            </div>
                            <div className="whitespace-pre-line text-[#525D56] text-xs font-sans">
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
            <div className="space-y-6 font-sans">
              {/* Literary Metadata Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-xl border border-[#F0EAD6] text-xs shadow-2xs">
                <div>
                  <span className="text-[#525D56] block text-[11px]">Original Year</span>
                  <span className="font-bold text-[#141A16]">{item.bookDetails.originalPublicationYear}</span>
                </div>
                <div>
                  <span className="text-[#525D56] block text-[11px]">Genre</span>
                  <span className="font-bold text-[#141A16]">{item.bookDetails.genre}</span>
                </div>
                <div>
                  <span className="text-[#525D56] block text-[11px]">Literary Movement</span>
                  <span className="font-bold text-[#141A16]">{item.bookDetails.literaryMovement}</span>
                </div>
                <div>
                  <span className="text-[#525D56] block text-[11px]">Setting</span>
                  <span className="font-bold text-[#141A16]">{item.bookDetails.setting || 'Nigeria'}</span>
                </div>
              </div>

              {/* Characters Guide */}
              {item.bookDetails.characters && item.bookDetails.characters.length > 0 && (
                <div className="bg-white p-6 rounded-xl border border-[#F0EAD6] shadow-2xs">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#141A16] font-editorial mb-3.5">
                    Major Dramatis Personae / Character Index
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {item.bookDetails.characters.map((char, idx) => (
                      <div key={idx} className="p-3.5 bg-[#FAF7EE] rounded-lg border border-[#F0EAD6] text-xs font-sans">
                        <div className="flex items-center justify-between">
                          <strong className="text-[#141A16] text-sm font-editorial">{char.name}</strong>
                          <span className="text-[10px] px-2 py-0.5 bg-white text-[#0E5C36] border border-[#F0EAD6] rounded-full font-medium">
                            {char.role}
                          </span>
                        </div>
                        <p className="text-[#525D56] mt-1.5 leading-relaxed">{char.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Thematic Matrix */}
              {item.bookDetails.themes && (
                <div className="bg-white p-6 rounded-xl border border-[#F0EAD6] shadow-2xs">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#141A16] font-editorial mb-3.5">
                    Core Themes & Critical Interpretation
                  </h3>
                  <div className="space-y-3.5 font-sans">
                    {item.bookDetails.themes.map((th, i) => (
                      <div key={i} className="border-l-2 border-[#0E5C36] pl-3.5 py-1">
                        <h4 className="text-xs font-bold text-[#141A16]">{th.title}</h4>
                        <p className="text-xs text-[#525D56] mt-1 leading-relaxed">{th.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notable Excerpts & Quotations */}
              {item.bookDetails.notableQuotes && (
                <div className="bg-[#FAF7EE] text-[#141A16] p-6 rounded-xl border border-[#F0EAD6] shadow-2xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#0E5C36] font-sans mb-3">
                    Key Citations for Examination Essays
                  </h3>
                  <div className="space-y-3.5 text-xs font-sans">
                    {item.bookDetails.notableQuotes.map((q, i) => (
                      <blockquote key={i} className="border-l-2 border-[#6B2361] pl-3.5 py-1 italic font-editorial">
                        "{q.quote}"
                        <footer className="text-[11px] text-[#525D56] not-italic font-sans mt-1">
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
          <div className="mt-6 bg-white p-6 sm:p-8 rounded-xl border border-[#F0EAD6] shadow-2xs">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#141A16] font-editorial mb-4 pb-2 border-b border-[#F0EAD6]">
              {item.category === 'notes' ? 'Complete Lecture & Syllabus Text' : 'Academic Text Transcript / Summary'}
            </h3>
            <div className={`prose max-w-none text-[#141A16] font-editorial ${fontSizeClass} leading-relaxed whitespace-pre-line space-y-4`}>
              {item.summaryOrContent}
            </div>
          </div>

          {/* Document Footer Verification */}
          <div className="mt-8 pt-4 border-t border-[#F0EAD6] text-center text-xs text-[#525D56] font-sans">
            <p className="font-editorial italic text-[#0E5C36]">
              "Eloquentia et Sapientia" — National Association of Students of English and Literary Studies (NASELS)
            </p>
            <p className="mt-1 text-[#525D56]">
              Archived by NASELS Academic Directorate • Nnamdi Azikiwe University, Awka
            </p>
          </div>
        </div>

        {/* Modal Bottom Sticky Bar */}
        <div className="no-print bg-[#FAF7EE] border-t border-[#F0EAD6] px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
          <div className="text-[#525D56] flex items-center gap-2">
            <span className="font-semibold text-[#141A16]">Tags:</span>
            <div className="flex flex-wrap gap-1">
              {item.tags.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-white text-[#525D56] border border-[#F0EAD6] rounded-[4px] text-[11px]">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-[6px] border border-[#F0EAD6] bg-white hover:bg-[#FAF7EE] text-[#141A16] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#525D56]" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-5 py-2 rounded-[6px] bg-[#0E5C36] hover:bg-[#147B4A] text-white font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
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
