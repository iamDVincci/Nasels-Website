import { ArchiveItem, CourseOutline, AcademicLevel, ResourceCategory, AcademicTrack, Semester } from '../types';
import { INITIAL_ARCHIVE_ITEMS } from '../data/archiveData';
import { UNIZIK_COURSES } from '../data/coursesData';

const BASE_URL = '/api';

async function postAiEndpoint(endpoint: string, payload: Record<string, unknown>, field: string): Promise<string | null> {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.success && json.data?.[field] ? json.data[field] : null;
  } catch {
    return null;
  }
}

export interface ArchiveFilterParams {
  level?: AcademicLevel;
  category?: ResourceCategory;
  track?: AcademicTrack;
  semester?: Semester;
  search?: string;
}

export const api = {
  // Check if backend is available
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/health`, { signal: AbortSignal.timeout(3000) });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Archive Items
  async getArchiveItems(params?: ArchiveFilterParams): Promise<ArchiveItem[]> {
    try {
      const query = new URLSearchParams();
      if (params?.level && params.level !== 'All') query.set('level', params.level);
      if (params?.category && params.category !== 'all') query.set('category', params.category);
      if (params?.track && params.track !== 'All') query.set('track', params.track);
      if (params?.semester && params.semester !== 'All') query.set('semester', params.semester);
      if (params?.search) query.set('search', params.search);

      const res = await fetch(`${BASE_URL}/archive?${query.toString()}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('[API Client] Backend unreachable, using client store fallback:', err);
      // Fallback to client localStorage + static data
      const customSaved = localStorage.getItem('nasels_unizik_custom_items');
      const customItems: ArchiveItem[] = customSaved ? JSON.parse(customSaved) : [];
      return [...customItems, ...INITIAL_ARCHIVE_ITEMS];
    }
  },

  // Single Archive Item
  async getArchiveItemById(id: string): Promise<ArchiveItem | null> {
    try {
      const res = await fetch(`${BASE_URL}/archive/${id}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch {
      return INITIAL_ARCHIVE_ITEMS.find(i => i.id === id) || null;
    }
  },

  // Submit Contributed Material
  async contributeMaterial(item: ArchiveItem): Promise<ArchiveItem> {
    try {
      const res = await fetch(`${BASE_URL}/archive`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (err) {
      console.warn('[API Client] Could not reach backend, saved locally:', err);
    }

    // Save locally as fallback
    try {
      const saved = localStorage.getItem('nasels_unizik_custom_items');
      const list: ArchiveItem[] = saved ? JSON.parse(saved) : [];
      const updated = [item, ...list];
      localStorage.setItem('nasels_unizik_custom_items', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
    return item;
  },

  // Increment Download Counter
  async trackDownload(id: string): Promise<number> {
    try {
      const res = await fetch(`${BASE_URL}/archive/${id}/download`, { method: 'POST' });
      if (res.ok) {
        const json = await res.json();
        return json.downloadCount;
      }
    } catch {}
    return 0;
  },

  // Courses
  async getCourses(params?: { level?: string; track?: string; search?: string }): Promise<CourseOutline[]> {
    try {
      const query = new URLSearchParams();
      if (params?.level && params.level !== 'All') query.set('level', params.level);
      if (params?.track && params.track !== 'All') query.set('track', params.track);
      if (params?.search) query.set('search', params.search);

      const res = await fetch(`${BASE_URL}/courses?${query.toString()}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const json = await res.json();
      return json.data;
    } catch {
      return UNIZIK_COURSES;
    }
  },

  // Gemini AI: Solve Examination Question
  async aiSolveQuestion(payload: {
    questionText: string;
    courseCode?: string;
    courseTitle?: string;
    marks?: string;
  }): Promise<string> {
    const live = await postAiEndpoint('/ai/solve-question', payload, 'solution');
    if (live) return live;

    const course = payload.courseCode ? `${payload.courseCode}${payload.courseTitle ? ` (${payload.courseTitle})` : ''}` : 'UNIZIK English & Literary Studies';
    const marksNote = payload.marks ? `Allocated Weight: **${payload.marks}**` : 'Standard Departmental Examination Weight';
    return [
      `### NASELS Academic Solution Guide — ${course}`,
      `*Offline / Static Archive Reference Edition • ${marksNote}*`,
      ``,
      `#### 1. Question Interpretation & Examiner's Core Expectation`,
      `This prompt examines your mastery of core analytical terminology and textual/linguistic evidence in **${course}**. Examiners in the Department of English Language & Literature (UNIZIK) award top marks to scripts that define technical concepts immediately, establish a clear thesis, and anchor every theoretical claim in concrete illustrations or textual citations.`,
      ``,
      `#### 2. Model Essay Outline & Thesis Statement`,
      `- **Thesis**: A high-scoring response demonstrates how the formal or stylistic mechanisms referenced in *"${payload.questionText.slice(0, 120)}${payload.questionText.length > 120 ? '...' : ''}"* operate systematically rather than descriptively.`,
      `- **Paragraph 1 (Conceptual Framing)**: Define key linguistic rules or literary concepts and situate them within the course syllabus.`,
      `- **Paragraph 2 (Primary Evidence & Structural Breakdown)**: Present 2–3 verified examples, clauses, or scenes with close analytical commentary.`,
      `- **Paragraph 3 (Critical Synthesis)**: Contrast competing scholarly perspectives or grammatical exceptions and tie back directly to the prompt.`,
      ``,
      `#### 3. Comprehensive Model Answer Strategy`,
      `1. **Opening**: Address the directive verb (*Analyze, Discuss, Contrast, Transcribe*) in your first two sentences without unnecessary preamble.`,
      `2. **Development**: Use the **P.E.E.L.** structure (Point, Evidence, Explanation, Link). For literature questions, cite specific acts, chapters, or character foils; for language/linguistics courses, display phrase markers, phonemic slant brackets (\`/ /\`), or concord rules explicitly.`,
      `3. **Conclusion**: Consolidate your main findings and reaffirm how they resolve the examination prompt.`,
      ``,
      `#### 4. Key Marking Criteria & Common Pitfalls to Avoid`,
      `- **Avoid Plot Retelling / Colloquial Definitions**: Never summarize an entire chapter when analytical interrogation is required.`,
      `- **Terminological Precision**: Use exact departmental nomenclature (e.g., *Systemic Functional Grammar*, *Postcolonial hybridity*, *Morphophonemic alternation*) consistently.`,
      `- **Presentation**: Number sub-parts clearly and proofread concord and punctuation before submission.`,
    ].join('\n');
  },

  // Gemini AI: Analyze Literary Text
  async aiAnalyzeText(payload: {
    title: string;
    author?: string;
    passage?: string;
    analysisType?: string;
  }): Promise<string> {
    const live = await postAiEndpoint('/ai/analyze-text', payload, 'analysis');
    if (live) return live;

    const authorName = payload.author || 'Prescribed Author';
    const focus = payload.passage ? `\n> **Focus Context**: ${payload.passage.slice(0, 220)}${payload.passage.length > 220 ? '...' : ''}\n` : '';
    return [
      `### Critical Literary Companion — *${payload.title}*`,
      `**Author**: ${authorName} • **Mode**: ${payload.analysisType || 'Departmental Examination Critique'}`,
      focus,
      `#### 1. Thematic Significance & Socio-Historical Context`,
      `*${payload.title}* occupies a pivotal place in NASELS UNIZIK literature syllabi for interrogating power, cultural memory, identity negotiation, and moral agency within its historical moment. Strong examination essays situate ${authorName}'s aesthetic choices alongside African or global literary traditions (postcolonial discourse, modernism, cultural nationalism, or feminist critique).`,
      ``,
      `#### 2. Literary Devices & Stylistic Analysis`,
      `- **Narrative Architecture & Voice**: Examine how focalization, irony, and shifts in register guide reader sympathy and expose ideological tensions.`,
      `- **Imagery & Symbolism**: Trace recurring motifs (ritual spaces, oral proverbs, landscape, domestic thresholds) that concretize abstract thematic conflicts.`,
      `- **Diction & Oral Aesthetics**: Highlight code-switching, proverbs, dramatic dialogue, or syntactic parallelism where applicable.`,
      ``,
      `#### 3. High-Yield Examination Essay Prompts`,
      `- Evaluate how ${authorName} uses central character foils to dramatize competing value systems in *${payload.title}*.`,
      `- Discuss the role of setting and historical pressure in shaping tragic or redemptive outcomes in the work.`,
      ``,
      `#### 4. MLA 9th Edition Works Cited Format`,
      `- ${authorName}. *${payload.title}*. Departmental Course Edition.`,
    ].join('\n');
  },

  // Gemini AI: Summarize Notes
  async aiSummarizeNotes(payload: {
    content: string;
    courseCode?: string;
    courseTitle?: string;
  }): Promise<string> {
    const live = await postAiEndpoint('/ai/summarize-notes', payload, 'summary');
    if (live) return live;

    const course = payload.courseCode ? `${payload.courseCode}${payload.courseTitle ? ` — ${payload.courseTitle}` : ''}` : 'NASELS Lecture Notes';
    const snippet = payload.content.replace(/\s+/g, ' ').trim().slice(0, 260);
    return [
      `### Exam-Ready Revision Brief: ${course}`,
      ``,
      `#### 1. Executive Summary & Core Conceptual Map`,
      `Extracted Focus: *"${snippet}${payload.content.length > 260 ? '...' : ''}"*`,
      `- Master all core definitions and classifications introduced at the start of the handout.`,
      `- Pair every theoretical rule or literary term with at least two authentic textual or grammatical examples.`,
      `- Map relationships between foundational concepts and later lecture modules to handle comparative essay questions.`,
      ``,
      `#### 2. High-Yield Examination Practice Prompts`,
      `1. **Conceptual Definition & Scope**: Define the primary framework covered in **${course}** and illustrate its analytical value with concrete examples.`,
      `2. **Comparative Application**: Contrast two core categories or principles from the lecture notes, noting areas of structural overlap or exception.`,
      `3. **Problem-Solving / Textual Critique**: Apply the lecture methodology to an unseen passage or sentence set under timed exam conditions.`,
      ``,
      `#### 3. Marking Checkpoints`,
      `- Full marks require explicit terminology, clear paragraph topic sentences, and verified examples directly linked to the course syllabus.`,
    ].join('\n');
  },

  // Gemini AI: Chat
  async aiChat(message: string): Promise<string> {
    const live = await postAiEndpoint('/ai/chat', { message }, 'reply');
    if (live) return live;

    return [
      `### NASELS Scholastic Study Reference`,
      `For *"${message.slice(0, 120)}${message.length > 120 ? '...' : ''}"*:`,
      `- **Archive Search Tip**: Use the top Search bar or Course Directory to open verified UNIZIK past questions, examiner hints, and lecture outlines directly in the vault.`,
      `- **Exam Method**: Structure answers using clear thesis statements, P.E.E.L. body paragraphs, and MLA 9th Edition citations where required.`,
    ].join('\n');
  },
};
