import { Router, Request, Response } from 'express';
import { store } from '../data/store';

const router = Router();

// GET /api/courses - List courses with optional filtering
router.get('/', (req: Request, res: Response) => {
  try {
    const { level, track, search } = req.query;
    const courses = store.getCourses({
      level: level as string,
      track: track as string,
      search: search as string,
    });
    res.json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/courses/:code - Get single course details
router.get('/:code', (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const course = store.getCourseByCode(code);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: `Course with code '${code}' was not found in NASELS UNIZIK directory.`,
      });
    }
    res.json({ success: true, data: course });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
