import { Router, Request, Response } from 'express';
import { store } from '../data/store';
import { AcademicLevel, ResourceCategory, AcademicTrack, Semester, ArchiveItem } from '../../src/types';

const router = Router();

// GET /api/archive - List archive items with query filters
router.get('/', (req: Request, res: Response) => {
  try {
    const { level, category, track, semester, search } = req.query;

    const items = store.getArchiveItems({
      level: level as AcademicLevel,
      category: category as ResourceCategory,
      track: track as AcademicTrack,
      semester: semester as Semester,
      search: search as string,
    });

    res.json({
      success: true,
      total: items.length,
      data: items,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/archive/stats - Overview statistics
router.get('/stats', (req: Request, res: Response) => {
  try {
    const all = store.getArchiveItems({});
    const stats = {
      total: all.length,
      pastQuestions: all.filter(i => i.category === 'past_question').length,
      texts: all.filter(i => i.category === 'text').length,
      notes: all.filter(i => i.category === 'notes').length,
      outlines: all.filter(i => i.category === 'outline').length,
      levelBreakdown: {
        '100': all.filter(i => i.level === '100').length,
        '200': all.filter(i => i.level === '200').length,
        '300': all.filter(i => i.level === '300').length,
        '400': all.filter(i => i.level === '400').length,
      }
    };
    res.json({ success: true, data: stats });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/archive/:id - Fetch single archive item by ID
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = store.getArchiveItemById(id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: `Academic item '${id}' not found in NASELS archive.`,
      });
    }
    res.json({ success: true, data: item });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/archive - Contribute / add a new academic material
router.post('/', (req: Request, res: Response) => {
  try {
    const body = req.body as Partial<ArchiveItem>;

    // Validate required fields
    if (!body.title || !body.courseCode || !body.level || !body.category) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title, courseCode, level, and category are mandatory.',
      });
    }

    const newItem: ArchiveItem = {
      id: body.id || `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: body.title,
      courseCode: body.courseCode.toUpperCase().trim(),
      courseTitle: body.courseTitle || '',
      level: body.level,
      semester: body.semester || '1st',
      category: body.category,
      track: body.track || 'General/Combined',
      author: body.author || 'NASELS Contributor',
      academicYear: body.academicYear || `${new Date().getFullYear()}/${new Date().getFullYear() + 1} Session`,
      description: body.description || '',
      summaryOrContent: body.summaryOrContent || '',
      fileFormat: body.fileFormat || 'PDF',
      fileSize: body.fileSize || '350 KB',
      tags: body.tags || [body.courseCode, body.level + 'L', body.category],
      verifiedBy: body.verifiedBy || 'NASELS Peer Review / Pending Board Seal',
      downloadCount: 0,
      dateAdded: new Date().toISOString().split('T')[0],
      examDetails: body.examDetails,
      bookDetails: body.bookDetails,
      isCustomUpload: true,
    };

    const saved = store.addArchiveItem(newItem);
    res.status(201).json({
      success: true,
      message: 'Material successfully submitted to NASELS UNIZIK Archive.',
      data: saved,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/archive/:id/download - Track download count
router.post('/:id/download', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const count = store.incrementDownload(id);
    res.json({ success: true, downloadCount: count });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
