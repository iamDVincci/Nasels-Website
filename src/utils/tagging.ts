import { ResourceCategory, AcademicLevel, AcademicTrack } from '../types';

export const STANDARD_ACADEMIC_YEARS = [
  '2023/2024 Session',
  '2022/2023 Session',
  '2021/2022 Session',
  'Core Prescribed Edition',
] as const;

export const STANDARD_TOPIC_SUGGESTIONS: Record<string, string[]> = {
  'ENG 101': ['Grammar', 'Concord', 'Syntax', 'Word Classes', 'Punctuation', 'Sentence Structure'],
  'ENG 102': ['Phonetics', 'IPA', 'Stress Rules', 'Vowels', 'Consonants', 'Intonation'],
  'ENG 111': ['African Prose', 'Narrative Technique', 'Colonialism', 'Achebe', 'Tragedy', 'Characterization'],
  'ENG 112': ['African Drama', 'Dramatic Theory', 'Soyinka', 'Satire', 'Stagecraft', 'Comedy'],
  'ENG 113': ['Poetry', 'Poetic Forms', 'Stanzaic Patterns', 'African Verse', 'Okigbo', 'Imagery'],
  'ENG 201': ['Morphology', 'Allomorphs', 'Word Formation', 'Affixes', 'Compounding', 'Roots & Stems'],
  'ENG 202': ['Syntax', 'IC Analysis', 'Tree Diagrams', 'Phrase Structure', 'Constituency', 'Ambiguity'],
  'ENG 211': ['African Prose', 'Post-Colonial Disillusionment', 'Feminism', 'Adichie', 'Armah', 'Ngũgĩ'],
  'ENG 212': ['African Drama', 'Yoruba Cosmogony', 'Soyinka', 'Tragedy', 'Total Theatre', 'Ritual'],
  'ENG 301': ['Advanced Syntax', 'X-Bar Theory', 'GB Theory', 'Chomsky', 'Movement', 'Theta Roles'],
  'ENG 303': ['Semantics', 'Pragmatics', 'Speech Acts', 'Implicature', 'Sense Relations', 'Politeness'],
  'ENG 313': ['Literary Theory', 'Marxism', 'Structuralism', 'Postcolonialism', 'Eagleton', 'Feminism'],
  'ENG 322': ['Nigerian Literature', 'Civil War Fiction', 'Oral Tradition', 'Adichie', 'Biafra', 'Poetry'],
  'ENG 402': ['Stylistics', 'Discourse Analysis', 'CDA', 'Cohesion', 'Foregrounding', 'Fairclough'],
  'ENG 411': ['Modernism', 'Postmodernism', 'Stream of Consciousness', 'Metafiction', 'Existentialism'],
  'ENG 490': ['Research Methodology', 'MLA 9th Edition', 'Long Essay', 'Literature Review', 'Project Guide'],
};

/**
 * Normalizes academic year into a canonical display string (e.g. "2023/2024" or "Core Curriculum")
 */
export function normalizeAcademicYear(year?: string): string {
  if (!year) return 'General / Core';
  const clean = year.trim();
  if (clean.toLowerCase().includes('core') || clean.toLowerCase().includes('recommended text')) {
    return 'Core Curriculum';
  }
  const match = clean.match(/(\d{4}\/\d{4})/);
  if (match) {
    return match[1];
  }
  return clean;
}

/**
 * Categorizes a tag to apply consistent styling and filtering
 */
export function getTagType(tag: string): 'course' | 'year' | 'category' | 'level' | 'track' | 'topic' {
  const t = tag.trim();
  if (/^ENG\s*\d{3}/i.test(t)) return 'course';
  if (/^\d{4}\/\d{4}/.test(t) || t === 'Core Curriculum' || t.includes('Session')) return 'year';
  if (['Past Question', 'Lecture Notes', 'Prescribed Text', 'Course Outline', 'Exam Paper', 'Curriculum & Guides'].includes(t)) return 'category';
  if (/^\d{3}\s*Level$/i.test(t) || /^\d{3}L$/i.test(t)) return 'level';
  if (['Literature', 'Linguistics', 'Language & Linguistics', 'General/Combined'].includes(t)) return 'track';
  return 'topic';
}

/**
 * Returns consistent styling for a tag based on its standardized taxonomy type
 */
export function getTagStyles(type: 'course' | 'year' | 'category' | 'level' | 'track' | 'topic') {
  switch (type) {
    case 'course':
      return 'bg-slate-900 text-white border-slate-900 font-mono font-bold';
    case 'year':
      return 'bg-slate-50 text-slate-600 border-slate-200 font-medium';
    case 'category':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold';
    case 'level':
      return 'bg-slate-100 text-slate-700 border-slate-200 font-bold';
    case 'track':
      return 'bg-purple-50 text-purple-800 border-purple-200 font-medium';
    case 'topic':
    default:
      return 'bg-white text-slate-600 border-slate-200 hover:border-emerald-600 hover:text-emerald-700';
  }
}

/**
 * Category display mapping
 */
export function getCategoryLabel(category: ResourceCategory | string): string {
  switch (category) {
    case 'past_question':
      return 'Past Question';
    case 'notes':
      return 'Lecture Notes';
    case 'text':
      return 'Prescribed Text';
    case 'outline':
      return 'Course Outline';
    default:
      return 'Academic Resource';
  }
}

/**
 * Builds the canonical standardized tag set for any resource
 */
export function generateStandardTags(params: {
  courseCode: string;
  level: AcademicLevel | string;
  category: ResourceCategory | string;
  academicYear?: string;
  track?: AcademicTrack | string;
  customTopics?: string[];
}): string[] {
  const tags: string[] = [];

  // 1. Course Code Tag (e.g. "ENG 101")
  const cleanCode = params.courseCode.trim().toUpperCase();
  if (cleanCode) {
    tags.push(cleanCode);
  }

  // 2. Academic Level Tag (e.g. "100 Level")
  if (params.level && params.level !== 'All') {
    const levelStr = params.level.includes('Level') ? params.level : `${params.level} Level`;
    tags.push(levelStr);
  }

  // 3. Academic Year Tag (e.g. "2023/2024" or "Core Curriculum")
  const normYear = normalizeAcademicYear(params.academicYear);
  if (normYear) {
    tags.push(normYear);
  }

  // 4. Resource Category Tag (e.g. "Past Question", "Lecture Notes")
  const catLabel = getCategoryLabel(params.category);
  if (catLabel) {
    tags.push(catLabel);
  }

  // 5. Track Tag (e.g. "Literature", "Linguistics")
  if (params.track && params.track !== 'All') {
    const cleanTrack = params.track === 'Language & Linguistics' ? 'Linguistics' : params.track;
    if (cleanTrack !== 'General/Combined') {
      tags.push(cleanTrack);
    }
  }

  // 6. Topic Tags
  if (params.customTopics && params.customTopics.length > 0) {
    params.customTopics.forEach(topic => {
      const trimmed = topic.trim();
      if (trimmed && !tags.some(existing => existing.toLowerCase() === trimmed.toLowerCase())) {
        tags.push(trimmed);
      }
    });
  }

  return tags;
}
