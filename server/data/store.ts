import fs from 'fs';
import path from 'path';
import { ArchiveItem, CourseOutline, AcademicLevel, ResourceCategory, AcademicTrack, Semester } from '../../src/types';
import { INITIAL_ARCHIVE_ITEMS } from '../../src/data/archiveData';
import { UNIZIK_COURSES } from '../../src/data/coursesData';

interface DatabaseSchema {
  archiveItems: ArchiveItem[];
  courses: CourseOutline[];
  bookmarks: { [userId: string]: string[] };
}

class Store {
  private dataDir: string;
  private dbFilePath: string;
  private memoryCache: DatabaseSchema;

  constructor() {
    this.dataDir = path.resolve(process.cwd(), '.data');
    this.dbFilePath = path.join(this.dataDir, 'store.json');
    this.ensureDataDirectory();
    this.memoryCache = this.loadOrSeed();
  }

  private ensureDataDirectory() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  private loadOrSeed(): DatabaseSchema {
    if (fs.existsSync(this.dbFilePath)) {
      try {
        const raw = fs.readFileSync(this.dbFilePath, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          archiveItems: parsed.archiveItems || INITIAL_ARCHIVE_ITEMS,
          courses: parsed.courses || UNIZIK_COURSES,
          bookmarks: parsed.bookmarks || { default: [] }
        };
      } catch (err) {
        console.error('[Store] Failed to read existing store.json, re-seeding...', err);
      }
    }

    // Default Seed
    const initialData: DatabaseSchema = {
      archiveItems: INITIAL_ARCHIVE_ITEMS,
      courses: UNIZIK_COURSES,
      bookmarks: { default: [] }
    };
    this.persist(initialData);
    return initialData;
  }

  private persist(data: DatabaseSchema) {
    try {
      fs.writeFileSync(this.dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('[Store] Error persisting database file:', err);
    }
  }

  // --- Archive Items Methods ---

  public getArchiveItems(filters: {
    level?: AcademicLevel;
    category?: ResourceCategory;
    track?: AcademicTrack;
    semester?: Semester;
    search?: string;
  }): ArchiveItem[] {
    return this.memoryCache.archiveItems.filter(item => {
      if (filters.level && filters.level !== 'All' && item.level !== filters.level) {
        return false;
      }
      if (filters.category && filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }
      if (filters.track && filters.track !== 'All' && item.track !== filters.track && item.track !== 'General/Combined') {
        return false;
      }
      if (filters.semester && filters.semester !== 'All' && item.semester !== filters.semester) {
        return false;
      }
      if (filters.search && filters.search.trim()) {
        const q = filters.search.toLowerCase().trim();
        const matches = (
          item.courseCode.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.courseTitle.toLowerCase().includes(q) ||
          item.author.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.summaryOrContent.toLowerCase().includes(q) ||
          item.tags.some(t => t.toLowerCase().includes(q))
        );
        if (!matches) return false;
      }
      return true;
    });
  }

  public getArchiveItemById(id: string): ArchiveItem | null {
    return this.memoryCache.archiveItems.find(item => item.id === id) || null;
  }

  public addArchiveItem(item: ArchiveItem): ArchiveItem {
    // Check if ID already exists
    const index = this.memoryCache.archiveItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.memoryCache.archiveItems[index] = item;
    } else {
      this.memoryCache.archiveItems.unshift(item);
    }
    this.persist(this.memoryCache);
    return item;
  }

  public incrementDownload(id: string): number {
    const item = this.getArchiveItemById(id);
    if (item) {
      item.downloadCount = (item.downloadCount || 0) + 1;
      this.persist(this.memoryCache);
      return item.downloadCount;
    }
    return 0;
  }

  // --- Courses Methods ---

  public getCourses(filters?: { level?: string; track?: string; search?: string }): CourseOutline[] {
    return this.memoryCache.courses.filter(c => {
      if (filters?.level && filters.level !== 'All' && c.level !== filters.level) {
        return false;
      }
      if (filters?.track && filters.track !== 'All' && c.track !== filters.track && c.track !== 'General/Combined') {
        return false;
      }
      if (filters?.search && filters.search.trim()) {
        const q = filters.search.toLowerCase().trim();
        const matches = (
          c.code.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          (c.lecturerInCharge && c.lecturerInCharge.toLowerCase().includes(q)) ||
          c.coreTopics.some(t => t.toLowerCase().includes(q))
        );
        if (!matches) return false;
      }
      return true;
    });
  }

  public getCourseByCode(code: string): CourseOutline | null {
    const normalized = code.trim().toLowerCase().replace(/\s+/g, ' ');
    return this.memoryCache.courses.find(c => 
      c.code.toLowerCase().replace(/\s+/g, ' ') === normalized
    ) || null;
  }

  // --- Bookmarks Methods ---

  public getBookmarks(userId: string = 'default'): string[] {
    return this.memoryCache.bookmarks[userId] || [];
  }

  public toggleBookmark(id: string, userId: string = 'default'): string[] {
    if (!this.memoryCache.bookmarks[userId]) {
      this.memoryCache.bookmarks[userId] = [];
    }
    const list = this.memoryCache.bookmarks[userId];
    const exists = list.includes(id);
    if (exists) {
      this.memoryCache.bookmarks[userId] = list.filter(item => item !== id);
    } else {
      this.memoryCache.bookmarks[userId].push(id);
    }
    this.persist(this.memoryCache);
    return this.memoryCache.bookmarks[userId];
  }
}

export const store = new Store();
