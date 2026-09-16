import { ArchiveItem, CourseOutline, AcademicLevel, ResourceCategory, AcademicTrack, Semester } from '../types';
import { INITIAL_ARCHIVE_ITEMS } from '../data/archiveData';
import { UNIZIK_COURSES } from '../data/coursesData';

const BASE_URL = '/api';

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
      if (!res.ok) return null;
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
    const res = await fetch(`${BASE_URL}/ai/solve-question`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Failed to solve question with Gemini AI');
    }
    return json.data.solution;
  },

  // Gemini AI: Analyze Literary Text
  async aiAnalyzeText(payload: {
    title: string;
    author?: string;
    passage?: string;
    analysisType?: string;
  }): Promise<string> {
    const res = await fetch(`${BASE_URL}/ai/analyze-text`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Failed to generate literary critique');
    }
    return json.data.analysis;
  },

  // Gemini AI: Summarize Notes
  async aiSummarizeNotes(payload: {
    content: string;
    courseCode?: string;
    courseTitle?: string;
  }): Promise<string> {
    const res = await fetch(`${BASE_URL}/ai/summarize-notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Failed to summarize notes with Gemini AI');
    }
    return json.data.summary;
  },

  // Gemini AI: Chat
  async aiChat(message: string): Promise<string> {
    const res = await fetch(`${BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || 'Failed to get response from Gemini AI');
    }
    return json.data.reply;
  },
};
