import { Router, Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { config } from '../config';

const router = Router();

// Lazy initialization of Gemini client
const getGeminiClient = () => {
  if (!config.geminiApiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey: config.geminiApiKey });
};

const SYSTEM_ACADEMIC_PROMPT = `You are the NASELS Scholastic AI Assistant for the Department of English Language and Literature at Nnamdi Azikiwe University (UNIZIK), Awka.
Your tone is academically rigorous, scholarly, eloquent, and supportive of undergraduate English & Literary Studies scholars.
Your motto is "Eloquentia et Sapientia" (Eloquence and Wisdom).
Format your outputs in clear, readable Markdown with bold headings and structured bullet points.
When citing literature, follow MLA 9th Edition style.
When analyzing linguistics and syntax, follow standard systemic functional or transformational generative grammar conventions (NP, VP, AdjP, AdvP, PP, SPCA configurations).`;

// POST /api/ai/solve-question
router.post('/solve-question', async (req: Request, res: Response) => {
  try {
    const { questionText, courseCode, courseTitle, marks } = req.body;
    if (!questionText) {
      return res.status(400).json({ success: false, message: 'questionText is required.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        success: false,
        message: 'Gemini AI is not configured. Please set GEMINI_API_KEY in your .env.local file.',
      });
    }

    const prompt = `${SYSTEM_ACADEMIC_PROMPT}

You are tasked with providing a comprehensive model answer and marking guide for an authentic UNIZIK Department of English Language & Literature examination question.

Course: ${courseCode || 'ENG'} - ${courseTitle || 'English & Literary Studies'}
Marks: ${marks || 'Standard Examination Weight'}
Question:
"""
${questionText}
"""

Provide a detailed response organized as:
1. **Question Interpretation & Examiner's Core Expectation**: What the lecturer is specifically evaluating.
2. **Model Essay Outline & Thesis Statement**: A strong thesis and 3-4 structured paragraph arguments.
3. **Comprehensive Model Answer**: The full model answer with depth, textual/linguistic evidence, and scholarly phrasing.
4. **Key Marking Criteria & Common Pitfalls to Avoid**: What students often miss and how to secure top marks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      success: true,
      data: {
        solution: response.text,
        modelUsed: 'gemini-2.5-flash',
      },
    });
  } catch (error: any) {
    console.error('[AI Error - solve-question]:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'An error occurred while generating the examination solution.',
    });
  }
});

// POST /api/ai/analyze-text
router.post('/analyze-text', async (req: Request, res: Response) => {
  try {
    const { title, author, passage, analysisType = 'general' } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Text title is required.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        success: false,
        message: 'Gemini AI is not configured. Please set GEMINI_API_KEY in your .env.local file.',
      });
    }

    const prompt = `${SYSTEM_ACADEMIC_PROMPT}

Perform an academic literary analysis for undergraduate scholars of English & Literary Studies at UNIZIK.

Literary Text: "${title}" by ${author || 'Prescribed Author'}
Analysis Mode: ${analysisType}
Passage / Focus Theme:
"""
${passage || 'Full work overview and critical reception'}
"""

Provide:
1. **Thematic Significance & Socio-Historical Context**: Situating the work within African or World literary traditions (postcolonial, modernist, feminist, Marxist, or existential).
2. **Literary Devices & Stylistic Analysis**: Imagery, symbolism, narrative point of view, dramatic irony, or figurative diction.
3. **Examination Essay Prompts & Arguments**: How this text typically appears in semester exams.
4. **MLA 9th Edition Works Cited Citation**: Exact citation for student term papers and examination bibliography.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      success: true,
      data: {
        analysis: response.text,
        modelUsed: 'gemini-2.5-flash',
      },
    });
  } catch (error: any) {
    console.error('[AI Error - analyze-text]:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate literary critique.',
    });
  }
});

// POST /api/ai/summarize-notes
router.post('/summarize-notes', async (req: Request, res: Response) => {
  try {
    const { content, courseCode, courseTitle } = req.body;
    if (!content) {
      return res.status(400).json({ success: false, message: 'Lecture note content is required.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        success: false,
        message: 'Gemini AI is not configured. Please set GEMINI_API_KEY in your .env.local file.',
      });
    }

    const prompt = `${SYSTEM_ACADEMIC_PROMPT}

Synthesize these UNIZIK English Language & Literature lecture notes into an exam-ready revision companion.

Course: ${courseCode || ''} ${courseTitle || ''}
Lecture Content:
"""
${content.slice(0, 15000)}
"""

Output the following:
1. **Executive Summary & Core Conceptual Map**: 5-7 key definitions and rules.
2. **Key Theoretical Frameworks & Linguists/Theorists Mentioned**:
3. **5 High-Yield Examination Practice Questions**: Realistic UNIZIK semester questions based on these notes.
4. **Brief Marking Guidelines for Each Practice Question**:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      success: true,
      data: {
        summary: response.text,
        modelUsed: 'gemini-2.5-flash',
      },
    });
  } catch (error: any) {
    console.error('[AI Error - summarize-notes]:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to summarize lecture notes.',
    });
  }
});

// POST /api/ai/chat
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        success: false,
        message: 'Gemini AI is not configured. Please set GEMINI_API_KEY in your .env.local file.',
      });
    }

    const prompt = `${SYSTEM_ACADEMIC_PROMPT}

Student Query:
${message}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      success: true,
      data: {
        reply: response.text,
        modelUsed: 'gemini-2.5-flash',
      },
    });
  } catch (error: any) {
    console.error('[AI Error - chat]:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to communicate with NASELS AI Assistant.',
    });
  }
});

export default router;
