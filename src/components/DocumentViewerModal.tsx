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
  Award,
  Sparkles,
  Bot,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { api } from '../services/api';

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

  // Gemini AI Assistant State
  const [aiLoading, setAiLoading] = useState<{ [key: string]: boolean }>({});
  const [aiSolutions, setAiSolutions] = useState<{ [key: string]: string }>({});
  const [aiErrors, setAiErrors] = useState<{ [key: string]: string }>({});
  const [showAiSolution, setShowAiSolution] = useState<{ [key: string]: boolean }>({});

  if (!item) return null;

  const toggleHint = (num: number) => {
    setShowAnswerHints(prev => ({
      ...prev,
      [num]: !prev[num]
    }));
  };

  const handleSolveQuestion = async (qNum: number, qText: string, marks?: string) => {
    const key = `q-${qNum}`;
    setShowAiSolution(prev => ({ ...prev, [key]: !prev[key] }));
    if (aiSolutions[key]) return;

    setAiLoading(prev => ({ ...prev, [key]: true }));
    setAiErrors(prev => ({ ...prev, [key]: '' }));
    try {
      const solution = await api.aiSolveQuestion({
        questionText: qText,
        courseCode: item.courseCode,
        courseTitle: item.courseTitle,
        marks,
      });
      setAiSolutions(prev => ({ ...prev, [key]: solution }));
    } catch (err: any) {
      setAiErrors(prev => ({ ...prev, [key]: err.message || 'Could not generate solution' }));
    } finally {
      setAiLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleAnalyzeText = async () => {
    const key = 'text-critique';
    setShowAiSolution(prev => ({ ...prev, [key]: !prev[key] }));
    if (aiSolutions[key]) return;

    setAiLoading(prev => ({ ...prev, [key]: true }));
    setAiErrors(prev => ({ ...prev, [key]: '' }));
    try {
      const analysis = await api.aiAnalyzeText({
        title: item.title,
        author: item.author,
        passage: item.bookDetails?.synopsis || item.description,
      });
      setAiSolutions(prev => ({ ...prev, [key]: analysis }));
    } catch (err: any) {
      setAiErrors(prev => ({ ...prev, [key]: err.message || 'Could not generate critique' }));
    } finally {
      setAiLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleSummarizeNotes = async () => {
    const key = 'notes-summary';
    setShowAiSolution(prev => ({ ...prev, [key]: !prev[key] }));
    if (aiSolutions[key]) return;

    setAiLoading(prev => ({ ...prev, [key]: true }));
    setAiErrors(prev => ({ ...prev, [key]: '' }));
    try {
      const summary = await api.aiSummarizeNotes({
        content: item.summaryOrContent,
        courseCode: item.courseCode,
        courseTitle: item.courseTitle,
      });
      setAiSolutions(prev => ({ ...prev, [key]: summary }));
    } catch (err: any) {
      setAiErrors(prev => ({ ...prev, [key]: err.message || 'Could not summarize notes' }));
    } finally {
      setAiLoading(prev => ({ ...prev, [key]: false }));
    }
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
    api.trackDownload(item.id);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0A1D13]/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-xl shadow-2xl flex flex-col border border-[#F0EAD6] overflow-hidden text-[#141A16]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Non-Printable) */}
        <div className="no-print bg-[#FAF7EE] text-[#141A16] px-3.5 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between border-b border-[#F0EAD6]">
          <div className="flex items-center gap-2 text-xs font-medium font-sans">
            <span className="px-2.5 py-1 rounded-[4px] bg-[#0E5C36] font-bold text-white font-mono shrink-0">
              {item.level}L • {item.courseCode}
            </span>
            <span className="hidden sm:inline text-[#525D56] font-sans truncate max-w-xs md:max-w-md">
              {item.courseTitle}
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
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
              className={`p-1.5 sm:p-2 rounded-[6px] hover:bg-[#F0EAD6] transition-colors ${isBookmarked ? 'text-[#0E5C36]' : 'text-[#525D56] hover:text-[#141A16]'}`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark to My Saved'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#0E5C36]' : ''}`} />
            </button>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="p-1.5 sm:p-2 rounded-[6px] hover:bg-[#F0EAD6] text-[#525D56] hover:text-[#141A16] transition-colors"
              title="Copy text excerpt"
            >
              {copied ? <Check className="w-4 h-4 text-[#0E5C36]" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              className="p-1.5 sm:p-2 rounded-[6px] hover:bg-[#F0EAD6] text-[#525D56] hover:text-[#141A16] transition-colors hidden sm:block"
              title="Print document or save to PDF"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Download Document Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs rounded-[6px] bg-[#0E5C36] hover:bg-[#147B4A] text-white font-semibold transition-colors shadow-2xs font-sans cursor-pointer"
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
              className="p-1.5 sm:p-2 rounded-[6px] hover:bg-[#F0EAD6] text-[#525D56] hover:text-[#141A16] transition-colors"
              title="Close window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-10 bg-[#FAF7EE] print:bg-white print:p-0">
          {/* Official Document Letterhead */}
          <div className="border-b-2 border-[#0E5C36] pb-5 mb-5 text-center">
            <div className="inline-block px-3 py-1 bg-[#E7F3EC] text-[#0E5C36] text-[11px] font-bold rounded-[4px] border border-[#0E5C36]/20 tracking-wider uppercase mb-2 font-sans">
              National Association of Students of English and Literary Studies (NASELS)
            </div>
            <h1 className="text-lg sm:text-2xl font-bold font-editorial tracking-[-0.02em] leading-tight text-[#141A16] uppercase [text-wrap:balance]">
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

                    {/* Action Bar: Hints + Gemini AI Assistant */}
                    <div className="pt-2 border-t border-[#F0EAD6] flex flex-wrap items-center justify-between gap-2 no-print">
                      {q.modelAnswerHint && (
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
                      )}

                      {/* Gemini AI Solver Button */}
                      <button
                        onClick={() => handleSolveQuestion(q.number, q.text, q.marks)}
                        disabled={aiLoading[`q-${q.number}`]}
                        className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-[6px] bg-[#E7F3EC] text-[#0E5C36] hover:bg-[#0E5C36] hover:text-white transition-all cursor-pointer border border-[#0E5C36]/20"
                      >
                        {aiLoading[`q-${q.number}`] ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Consulting Gemini Scholastic AI...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>{showAiSolution[`q-${q.number}`] ? 'Hide Gemini Solution' : 'Solve with Gemini AI'}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Hints Display */}
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

                    {/* Gemini AI Generated Solution Display */}
                    {showAiSolution[`q-${q.number}`] && (
                      <div className="mt-2.5 p-4 rounded-xl bg-[#0A1D13] text-[#FAF7EE] border border-[#0E5C36]/40 text-xs shadow-md animate-in fade-in duration-150 font-sans">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#0E5C36]/40">
                          <div className="flex items-center gap-2 text-[#FAF7EE] font-bold">
                            <Bot className="w-4 h-4 text-[#FAF7EE]" />
                            <span className="font-editorial text-sm">NASELS Scholastic AI • Gemini Model Answer</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#0E5C36] text-white font-mono">
                            UNIZIK Criteria
                          </span>
                        </div>

                        {aiErrors[`q-${q.number}`] ? (
                          <div className="flex items-start gap-2 text-amber-200 py-1">
                            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                            <span>{aiErrors[`q-${q.number}`]}</span>
                          </div>
                        ) : aiLoading[`q-${q.number}`] ? (
                          <div className="flex items-center gap-2 py-3 text-[#FAF7EE]/75">
                            <Loader2 className="w-4 h-4 animate-spin text-[#0E5C36]" />
                            <span>Generating structured essay outline, thesis statement, and marking points...</span>
                          </div>
                        ) : (
                          <div className="whitespace-pre-line text-[#FAF7EE]/90 leading-relaxed font-editorial text-sm">
                            {aiSolutions[`q-${q.number}`]}
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
              {/* Gemini AI Literary Critique Banner */}
              <div className="bg-[#FAF7EE] p-4 rounded-xl border border-[#F0EAD6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs no-print">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#6B2361] text-white flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#141A16]">
                      NASELS AI Literary Critique & MLA Citation
                    </h4>
                    <p className="text-[11px] text-[#525D56]">
                      Generate deep thematic analysis, stylistic breakdown, and MLA 9th format with Gemini.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleAnalyzeText}
                  disabled={aiLoading['text-critique']}
                  className="px-3.5 py-1.5 rounded-[6px] bg-[#6B2361] hover:bg-[#521949] text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                >
                  {aiLoading['text-critique'] ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Analyzing text...</span>
                    </>
                  ) : (
                    <>
                      <Bot className="w-3.5 h-3.5" />
                      <span>{showAiSolution['text-critique'] ? 'Hide Critique' : 'Generate Critique with AI'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Gemini AI Literary Critique Output */}
              {showAiSolution['text-critique'] && (
                <div className="p-5 rounded-xl bg-[#0A1D13] text-[#FAF7EE] border border-[#6B2361]/40 text-xs shadow-md animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#6B2361]/40">
                    <div className="flex items-center gap-2 font-bold text-[#FAF7EE]">
                      <Bot className="w-4 h-4" />
                      <span className="font-editorial text-sm">Gemini Scholastic Literary Critique</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#6B2361] text-white font-mono">
                      MLA 9th Edition
                    </span>
                  </div>

                  {aiErrors['text-critique'] ? (
                    <div className="flex items-start gap-2 text-amber-200 py-1">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{aiErrors['text-critique']}</span>
                    </div>
                  ) : aiLoading['text-critique'] ? (
                    <div className="flex items-center gap-2 py-3 text-[#FAF7EE]/75">
                      <Loader2 className="w-4 h-4 animate-spin text-[#0E5C36]" />
                      <span>Consulting critical frameworks and generating scholarly critique...</span>
                    </div>
                  ) : (
                    <div className="whitespace-pre-line text-[#FAF7EE]/90 leading-relaxed font-editorial text-sm">
                      {aiSolutions['text-critique']}
                    </div>
                  )}
                </div>
              )}

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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-4 border-b border-[#F0EAD6] gap-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#141A16] font-editorial">
                {item.category === 'notes' ? 'Complete Lecture & Syllabus Text' : 'Academic Text Transcript / Summary'}
              </h3>

              {item.category === 'notes' && (
                <button
                  onClick={handleSummarizeNotes}
                  disabled={aiLoading['notes-summary']}
                  className="px-3 py-1 rounded-[6px] bg-[#E7F3EC] hover:bg-[#0E5C36] text-[#0E5C36] hover:text-white border border-[#0E5C36]/20 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer no-print"
                >
                  {aiLoading['notes-summary'] ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Synthesizing notes...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{showAiSolution['notes-summary'] ? 'Hide AI Summary' : 'Generate Revision & Practice Qs'}</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Gemini AI Notes Summary & Practice Questions */}
            {showAiSolution['notes-summary'] && (
              <div className="mb-6 p-5 rounded-xl bg-[#0A1D13] text-[#FAF7EE] border border-[#0E5C36]/40 text-xs shadow-md animate-in fade-in duration-150">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#0E5C36]/40">
                  <div className="flex items-center gap-2 font-bold text-[#FAF7EE]">
                    <Bot className="w-4 h-4 text-[#FAF7EE]" />
                    <span className="font-editorial text-sm">NASELS Scholastic AI • Exam Revision & Practice Questions</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#0E5C36] text-white font-mono">
                    UNIZIK Format
                  </span>
                </div>

                {aiErrors['notes-summary'] ? (
                  <div className="flex items-start gap-2 text-amber-200 py-1">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{aiErrors['notes-summary']}</span>
                  </div>
                ) : aiLoading['notes-summary'] ? (
                  <div className="flex items-center gap-2 py-3 text-[#FAF7EE]/75">
                    <Loader2 className="w-4 h-4 animate-spin text-[#0E5C36]" />
                    <span>Generating executive summary, conceptual maps, and 5 practice questions...</span>
                  </div>
                ) : (
                  <div className="whitespace-pre-line text-[#FAF7EE]/90 leading-relaxed font-editorial text-sm">
                    {aiSolutions['notes-summary']}
                  </div>
                )}
              </div>
            )}

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
