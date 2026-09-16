import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import { config } from './config';
import coursesRouter from './routes/courses';
import archiveRouter from './routes/archive';
import bookmarksRouter from './routes/bookmarks';
import aiRouter from './routes/ai';

const app = express();

// Middleware: Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware: Zero-dependency CORS
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware: Request Logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${req.method} ${req.originalUrl}`);
  next();
});

// API Health Check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    app: 'NASELS UNIZIK Archive API',
    university: 'Nnamdi Azikiwe University, Awka',
    department: 'Department of English Language & Literature',
    motto: 'Eloquentia et Sapientia',
    geminiEnabled: Boolean(config.geminiApiKey),
    environment: config.nodeEnv,
    time: new Date().toISOString(),
  });
});

// Mount API Routers
app.use('/api/courses', coursesRouter);
app.use('/api/archive', archiveRouter);
app.use('/api/bookmarks', bookmarksRouter);
app.use('/api/ai', aiRouter);

// Production Static Serving
const distPath = path.resolve(process.cwd(), 'dist');
if (config.isProduction && fs.existsSync(distPath)) {
  console.log(`[Production] Serving static files from: ${distPath}`);
  app.use(express.static(distPath));

  // SPA fallback
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Global 404 Handler for API
app.use('/api/*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' not found.`,
  });
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server Error]:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal server error occurred.',
  });
});

// Start Server
app.listen(config.port, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`🏛️  NASELS UNIZIK Archive Backend Server`);
  console.log(`📍 Listening on: http://localhost:${config.port}`);
  console.log(`🤖 Gemini AI:   ${config.geminiApiKey ? 'Enabled' : 'Disabled (Set GEMINI_API_KEY in .env.local)'}`);
  console.log(`📚 Environment: ${config.nodeEnv}`);
  console.log(`======================================================\n`);
});

export default app;
