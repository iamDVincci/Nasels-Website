export type AcademicLevel = '100' | '200' | '300' | '400' | 'All';

export type Semester = '1st' | '2nd' | 'All';

export type ResourceCategory = 'all' | 'text' | 'notes' | 'past_question' | 'outline';

export type AcademicTrack = 'All' | 'Literature' | 'Language & Linguistics' | 'General/Combined';

export interface ExamQuestion {
  number: number;
  section?: string;
  text: string;
  marks?: string;
  compulsory?: boolean;
  modelAnswerHint?: string;
}

export interface ExamPaperDetails {
  session: string;
  semester: '1st' | '2nd';
  courseCode: string;
  courseTitle: string;
  timeAllowed: string;
  totalMarks?: string;
  instructions: string;
  questions: ExamQuestion[];
}

export interface BookAnalysisDetails {
  originalPublicationYear: string;
  literaryMovement: string;
  setting?: string;
  genre: string;
  characters?: { name: string; role: string; description: string }[];
  synopsis: string;
  criticalAnalysis: string;
  themes: { title: string; explanation: string }[];
  notableQuotes: { quote: string; speaker?: string; context: string }[];
}

export interface ArchiveItem {
  id: string;
  title: string;
  courseCode: string;
  courseTitle: string;
  level: '100' | '200' | '300' | '400';
  semester: '1st' | '2nd';
  category: 'text' | 'notes' | 'past_question' | 'outline';
  track: 'Literature' | 'Language & Linguistics' | 'General/Combined';
  author: string;
  academicYear?: string;
  description: string;
  summaryOrContent: string;
  fileFormat: 'PDF' | 'DOCX' | 'EPUB' | 'TRANSCRIPT';
  fileSize: string;
  keyThemes?: string[];
  tags: string[];
  verifiedBy: string;
  downloadCount: number;
  dateAdded: string;
  examDetails?: ExamPaperDetails;
  bookDetails?: BookAnalysisDetails;
  isCustomUpload?: boolean;
}

export interface CourseOutline {
  code: string;
  title: string;
  level: '100' | '200' | '300' | '400';
  semester: '1st' | '2nd';
  creditUnits: number;
  track: 'Literature' | 'Language & Linguistics' | 'General/Combined';
  lecturerInCharge?: string;
  description: string;
  coreTopics: string[];
  recommendedTexts: string[];
}
