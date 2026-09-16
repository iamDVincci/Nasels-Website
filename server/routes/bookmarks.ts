import { Router, Request, Response } from 'express';
import { store } from '../data/store';

const router = Router();

// GET /api/bookmarks
router.get('/', (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'default';
    const ids = store.getBookmarks(userId);
    res.json({ success: true, data: ids });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/bookmarks/toggle
router.post('/toggle', (req: Request, res: Response) => {
  try {
    const { id, userId = 'default' } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Item ID is required.' });
    }
    const updated = store.toggleBookmark(id, userId);
    res.json({
      success: true,
      isBookmarked: updated.includes(id),
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
