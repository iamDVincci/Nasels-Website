import { ArchiveItem } from '../types';
import { generateStandardTags } from '../utils/tagging';

export const INITIAL_ARCHIVE_ITEMS: ArchiveItem[] = [
  // ==========================================
  // 100 LEVEL: ENG 101 - Practical English Grammar
  // ==========================================
  {
    id: 'pq-101-2023-first-sem',
    title: 'ENG 101 Official Examination Paper (2023/2024 First Semester)',
    courseCode: 'ENG 101',
    courseTitle: 'Practical English Grammar',
    level: '100',
    semester: '1st',
    category: 'past_question',
    track: 'Language & Linguistics',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'Official UNIZIK first semester degree examination questions for ENG 101, testing concord, tense aspect system, clause analysis, and correction of grammatical blunders.',
    fileFormat: 'PDF',
    fileSize: '420 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 101',
      level: '100',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Language & Linguistics',
      customTopics: ['Grammar', 'Concord', 'Tense & Aspect', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Academic Board / UNIZIK',
    downloadCount: 3120,
    dateAdded: '2024-03-20',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
FACULTY OF ARTS
DEPARTMENT OF ENGLISH LANGUAGE AND LITERATURE
FIRST SEMESTER EXAMINATION 2023/2024 SESSION

COURSE CODE: ENG 101
COURSE TITLE: Practical English Grammar
CREDIT UNITS: 3 Units
TIME ALLOWED: 2 Hours 30 Minutes

INSTRUCTIONS: Answer Question ONE (COMPULSORY) and ANY OTHER TWO questions.`,
    examDetails: {
      session: '2023/2024',
      semester: '1st',
      courseCode: 'ENG 101',
      courseTitle: 'Practical English Grammar',
      timeAllowed: '2 Hours 30 Minutes',
      totalMarks: '70 Marks',
      instructions: 'Answer Question ONE (COMPULSORY) and ANY OTHER TWO questions.',
      questions: [
        {
          number: 1,
          compulsory: true,
          marks: '30 Marks',
          text: '(a) Define Subject-Verb Concord and explain five distinct types of concord in English with two clear illustrative sentences for each type.\n(b) Identify and correct the grammatical errors in the following sentences, stating the grammatical rule violated in each case:\n(i) Neither the lecturer nor the students was present in the auditorium.\n(ii) One of the boys that comes here everyday has travelled to Awka.\n(iii) The committee have submitted its final report to the Dean.\n(iv) Bread and butter are my elder brother’s favourite breakfast.\n(v) Every man, woman, and child were accounted for after the matriculation.',
          modelAnswerHint: 'Pay attention to: Grammatical Concord, Notional Concord, Principle of Proximity, Mandative Subjunctive Concord, and Correlative Concord. In 1b(i), proximity requires "were"; in (ii) relative pronoun "that" refers to plural "boys" so verb should be "come"; in (iv) "Bread and butter" forms a single idea, requiring singular "is".'
        },
        {
          number: 2,
          marks: '20 Marks',
          text: 'With clear examples, differentiate between Tense and Aspect in the English verbal system. Discuss the Primary Auxiliaries (BE, HAVE, DO) and their functional syntactic distribution.',
          modelAnswerHint: 'Tense relates event time to speech time (past vs present). Aspect refers to internal temporal contour of the event (progressive vs perfective).'
        },
        {
          number: 3,
          marks: '20 Marks',
          text: 'Analyze the syntactic structure of the following sentences into Clause Elements (S, V, O, C, A). State the realization of each element:\n(a) Yesterday, the diligent NASELS students elected their new executive council enthusiastically.\n(b) The Vice-Chancellor considered the Faculty of Arts conference extremely successful.',
          modelAnswerHint: '(a) A (Yesterday) + S (the diligent NASELS students) + V (elected) + O (their new executive council) + A (enthusiastically). (b) S + V + Od + Co.'
        }
      ]
    }
  },
  {
    id: 'notes-101-grammar-concord',
    title: 'ENG 101 Comprehensive Lecture Notes: Modern English Grammar & Syntax Handout',
    courseCode: 'ENG 101',
    courseTitle: 'Practical English Grammar',
    level: '100',
    semester: '1st',
    category: 'notes',
    track: 'Language & Linguistics',
    author: 'Prof. C. N. Okeke & Dr. E. O. Okafor',
    academicYear: '2023/2024 Session',
    description: 'Master compendium covering parts of speech, word formation processes, grammatical units hierarchy, clause structures, and concord rules with practical exercises.',
    fileFormat: 'PDF',
    fileSize: '2.4 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 101',
      level: '100',
      category: 'notes',
      academicYear: '2023/2024 Session',
      track: 'Language & Linguistics',
      customTopics: ['Grammar', 'Concord', 'Syntax', 'Word Classes']
    }),
    verifiedBy: 'NASELS Academic Committee',
    downloadCount: 2840,
    dateAdded: '2023-11-10',
    summaryOrContent: `## Module 1: The Hierarchy of Grammatical Units
English syntax operates on a five-tier grammatical rank scale:
1. **Morpheme** (Minimal meaningful grammatical unit)
2. **Word** (Constituent composed of one or more morphemes)
3. **Phrase / Group** (Syntactic unit typically functioning as clause element)
4. **Clause** (Unit organized around a predicator)
5. **Sentence** (Supreme orthographic and grammatical unit)

## Module 2: The Rules of Subject-Verb Concord
- **Rule 1: Number Concord**: Singular subjects take singular verbs; plural subjects take plural verbs.
- **Rule 2: Proximity Principle**: With correlatives (*either... or*, *neither... nor*), the verb agrees with the closer subject noun phrase.
- **Rule 3: Notional Concord**: Collective nouns (*faculty, police, jury*) select verb forms based on whether the entity acts as a single body or individuals.`
  },
  {
    id: 'pq-101-2022-first-sem',
    title: 'ENG 101 Past Examination Paper (2022/2023 First Semester)',
    courseCode: 'ENG 101',
    courseTitle: 'Practical English Grammar',
    level: '100',
    semester: '1st',
    category: 'past_question',
    track: 'Language & Linguistics',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2022/2023 Session',
    description: 'Degree examination paper focusing on phrasal verb collocations, active-to-passive voice transformations, adverbial clauses, and direct/indirect speech reporting.',
    fileFormat: 'PDF',
    fileSize: '390 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 101',
      level: '100',
      category: 'past_question',
      academicYear: '2022/2023 Session',
      track: 'Language & Linguistics',
      customTopics: ['Active Voice', 'Passive Voice', 'Reported Speech', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Archive',
    downloadCount: 1980,
    dateAdded: '2023-04-12',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
FIRST SEMESTER EXAMINATION 2022/2023 SESSION
COURSE CODE: ENG 101 - Practical English Grammar
1. Explain the syntactic constraints on passivization in English.
2. Discuss the difference between finite and non-finite subordinate clauses with illustrative sentences.`
  },

  // ==========================================
  // 100 LEVEL: ENG 102 - Spoken English & Oral Communication
  // ==========================================
  {
    id: 'notes-102-spoken-english-phonetics',
    title: 'ENG 102 Lecture Manual: English Phonetics, Phonology & Oral Communication',
    courseCode: 'ENG 102',
    courseTitle: 'Spoken English & Oral Communication',
    level: '100',
    semester: '2nd',
    category: 'notes',
    track: 'Language & Linguistics',
    author: 'Dr. (Mrs) F. I. Eze & Departmental Phonetics Laboratory',
    academicYear: '2023/2024 Session',
    description: 'Complete phonetics manual detailing the 44 phonemes of RP English, vowel trapezium, consonantal place/manner of articulation, stress rules, and intonational tunes.',
    fileFormat: 'PDF',
    fileSize: '3.1 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 102',
      level: '100',
      category: 'notes',
      academicYear: '2023/2024 Session',
      track: 'Language & Linguistics',
      customTopics: ['Phonetics', 'Phonology', 'Stress', 'Intonation', 'IPA']
    }),
    verifiedBy: 'NASELS Academic Committee',
    downloadCount: 2450,
    dateAdded: '2024-02-14',
    summaryOrContent: `## 1. The English Sound System (RP Standard)
The English sound inventory consists of **44 distinct phonemes**:
- **20 Vowel Sounds**: 12 Pure Vowels (Monophthongs) + 8 Diphthongs
- **24 Consonant Sounds**: Classified by Place of Articulation, Manner of Articulation, and Voicing.

## 2. Cardinal Vowels & The IPA Trapezium
- Front Vowels: /i:/, /ɪ/, /e/, /æ/
- Central Vowels: /ɜ:/, /ə/, /ʌ/
- Back Vowels: /u:/, /ʊ/, /ɔ:/, /ɒ/, /ɑ:/

## 3. Syllable Structure & Primary Stress Rules
- Two-syllable nouns/adjectives typically take stress on the first syllable (PRE-sent, EX-port).
- Two-syllable verbs typically take stress on the second syllable (pre-SENT, ex-PORT).`
  },
  {
    id: 'pq-102-2023-second-sem',
    title: 'ENG 102 Past Question Paper (2023/2024 Second Semester)',
    courseCode: 'ENG 102',
    courseTitle: 'Spoken English & Oral Communication',
    level: '100',
    semester: '2nd',
    category: 'past_question',
    track: 'Language & Linguistics',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'UNIZIK examination on phonetic transcription, weak forms in connected speech, consonant clusters, and contrastive tonic stress placement.',
    fileFormat: 'PDF',
    fileSize: '410 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 102',
      level: '100',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Language & Linguistics',
      customTopics: ['Phonetics', 'Transcription', 'Oral English', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 1890,
    dateAdded: '2024-08-10',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
SECOND SEMESTER EXAMINATION 2023/2024 SESSION
ENG 102: Spoken English & Oral Communication
1. Transcribe the following sentence into broad IPA: "The university students gathered for the English conference."
2. Explain the functions of the Falling Tone vs Rising Tone in British RP and Nigerian English speech.`
  },
  {
    id: 'notes-102-2022-intonation',
    title: 'ENG 102 Oral Intonation & Vowel Cardinal Chart Handout',
    courseCode: 'ENG 102',
    courseTitle: 'Spoken English & Oral Communication',
    level: '100',
    semester: '2nd',
    category: 'notes',
    track: 'Language & Linguistics',
    author: 'NASELS Academic Committee',
    academicYear: '2022/2023 Session',
    description: 'Illustrated guide to connected speech phenomena: assimilation, elision, linking /r/, and nuclear tone movement in declarative and interrogative sentences.',
    fileFormat: 'PDF',
    fileSize: '1.8 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 102',
      level: '100',
      category: 'notes',
      academicYear: '2022/2023 Session',
      track: 'Language & Linguistics',
      customTopics: ['Intonation', 'Assimilation', 'Connected Speech']
    }),
    verifiedBy: 'NASELS Academic Committee',
    downloadCount: 1620,
    dateAdded: '2023-07-15',
    summaryOrContent: `Guide to Nuclear Tones:
- Fall: Statements, wh-questions, commands, exclamations.
- Rise: Polar (Yes/No) questions, listings, dependent clauses.
- Fall-Rise: Doubt, reservation, politeness, non-finality.`
  },

  // ==========================================
  // 100 LEVEL: ENG 111 - Introduction to Literature: Prose Fiction
  // ==========================================
  {
    id: 'text-101-things-fall-apart',
    title: 'Things Fall Apart',
    courseCode: 'ENG 111',
    courseTitle: 'Introduction to Literature: Prose Fiction',
    level: '100',
    semester: '1st',
    category: 'text',
    track: 'Literature',
    author: 'Chinua Achebe',
    academicYear: 'Core Recommended Text',
    description: 'The foundational masterwork of modern African literature in English. Explores the tragic unraveling of Okonkwo and the Igbo clan of Umuofia at the dawn of British colonial penetration.',
    fileFormat: 'PDF',
    fileSize: '3.8 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 111',
      level: '100',
      category: 'text',
      academicYear: 'Core Prescribed Edition',
      track: 'Literature',
      customTopics: ['African Prose', 'Colonialism', 'Umuofia', 'Tragedy', 'Achebe']
    }),
    verifiedBy: 'NASELS Academic Board / UNIZIK',
    downloadCount: 4200,
    dateAdded: '2024-01-15',
    summaryOrContent: `### Academic Study Companion: Things Fall Apart (Chinua Achebe)

#### 1. Historical & Cultural Context
Published in 1958 by William Heinemann, *Things Fall Apart* was Achebe's revolutionary rebuttal to European caricatures of Africa. Set in pre-colonial Igbo village network of Umuofia, the novel restores complex social, legal, judicial, and philosophical dignity to African civilisation before colonial penetration.

#### 2. Plot Architecture & Tragic Arc
The narrative follows Okonkwo, whose obsessive dread of resembling his unaccomplished father Unoka drives him to hyper-masculinity, rigid inflexibility, and fatal defiance of cosmic and communal laws.

#### 3. Core Thematic Axes
- The Collision of Epistemologies (Indigenous Igbo vs Christian Imperialism)
- The Flawed Hero & Aristotle's Hamartia
- Gender Dialectics (Male aggression vs Female cosmic balance)`
  },
  {
    id: 'pq-111-2023-first-sem',
    title: 'ENG 111 Past Question Paper (2023/2024 First Semester)',
    courseCode: 'ENG 111',
    courseTitle: 'Introduction to Literature: Prose Fiction',
    level: '100',
    semester: '1st',
    category: 'past_question',
    track: 'Literature',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'Degree examination assessing novelistic form, narrative points of view (omniscient vs first-person), characterization techniques, and Achebe’s Things Fall Apart.',
    fileFormat: 'PDF',
    fileSize: '380 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 111',
      level: '100',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Literature',
      customTopics: ['African Prose', 'Narrative Technique', 'Achebe', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 2110,
    dateAdded: '2024-03-22',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
FIRST SEMESTER EXAMINATION 2023/2024 SESSION
ENG 111: Introduction to Literature: Prose Fiction
1. "Okonkwo is not merely a victim of British imperial forces; he is the architect of his own destruction." Discuss with textual evidence from Things Fall Apart.
2. Differentiate between Flat and Round characters as theorized by E. M. Forster in Aspects of the Novel.`
  },
  {
    id: 'notes-111-2022-narratology',
    title: 'ENG 111 Lecture Compendium: Elements of Prose Fiction & Narrative Modes',
    courseCode: 'ENG 111',
    courseTitle: 'Introduction to Literature: Prose Fiction',
    level: '100',
    semester: '1st',
    category: 'notes',
    track: 'Literature',
    author: 'Prof. I. U. Akabogu',
    academicYear: '2022/2023 Session',
    description: 'Structural breakdown of plot development, dramatic irony, temporal order (analepsis and prolepsis), focalization, and thematic cohesion in the African novel.',
    fileFormat: 'PDF',
    fileSize: '2.1 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 111',
      level: '100',
      category: 'notes',
      academicYear: '2022/2023 Session',
      track: 'Literature',
      customTopics: ['Narratology', 'Prose Fiction', 'Plot', 'Focalization']
    }),
    verifiedBy: 'NASELS Academic Committee',
    downloadCount: 1740,
    dateAdded: '2023-03-18',
    summaryOrContent: `Elements of Prose Fiction:
1. Plot: Chronological vs Episodic vs In Medias Res
2. Narrative Voice: First-person homodiegetic, Third-person heterodiegetic omniscient, Free Indirect Discourse.
3. Setting: Spatial, Temporal, Socio-cultural atmosphere.`
  },

  // ==========================================
  // 100 LEVEL: ENG 112 - Introduction to Drama & Theatre
  // ==========================================
  {
    id: 'text-102-the-lion-and-the-jewel',
    title: 'The Lion and the Jewel',
    courseCode: 'ENG 112',
    courseTitle: 'Introduction to Drama & Theatre',
    level: '100',
    semester: '2nd',
    category: 'text',
    track: 'Literature',
    author: 'Wole Soyinka',
    academicYear: 'Core Recommended Text',
    description: 'Soyinka’s celebrated comedic play pitting the shrewd traditionalist Bale Baroka against the arrogant, Westernized schoolteacher Lakunle for the hand of village belle Sidi.',
    fileFormat: 'PDF',
    fileSize: '2.9 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 112',
      level: '100',
      category: 'text',
      academicYear: 'Core Prescribed Edition',
      track: 'Literature',
      customTopics: ['African Drama', 'Satire', 'Soyinka', 'Baroka', 'Sidi', 'Lakunle']
    }),
    verifiedBy: 'NASELS Academic Board / UNIZIK',
    downloadCount: 3870,
    dateAdded: '2024-01-20',
    summaryOrContent: `### Academic Study Companion: The Lion and the Jewel (Wole Soyinka)
#### 1. Synopsis & Dramatic Clash
Set in the Yoruba village of Ilujinle, the play depicts a three-sided comic contest between:
- **Baroka**: The 62-year-old Bale of Ilujinle, shrewd custodian of tradition.
- **Lakunle**: The village schoolteacher, infatuated with superficial European modernity.
- **Sidi**: The beautiful village maiden whose photo in a glossy Lagos magazine sparks pride and vanity.`
  },
  {
    id: 'pq-112-2023-second-sem',
    title: 'ENG 112 Past Question Paper (2023/2024 Second Semester)',
    courseCode: 'ENG 112',
    courseTitle: 'Introduction to Drama & Theatre',
    level: '100',
    semester: '2nd',
    category: 'past_question',
    track: 'Literature',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'UNIZIK examination on dramatic structure, Aristotle’s Poetics, ritual origin of drama in Africa, and Soyinka’s dramaturgical satire in The Lion and the Jewel.',
    fileFormat: 'PDF',
    fileSize: '370 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 112',
      level: '100',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Literature',
      customTopics: ['Drama', 'Aristotle', 'Soyinka', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 1950,
    dateAdded: '2024-08-15',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
SECOND SEMESTER EXAMINATION 2023/2024 SESSION
ENG 112: Introduction to Drama & Theatre
1. "Soyinka uses Lakunle to satirize uncritical mimicry of Western habits, while Baroka embodies traditional resilience." Discuss with direct dramatic illustrations.
2. Define: (a) Hamartia, (b) Anagnorisis, (c) Catharsis, (d) Peripeteia.`
  },

  // ==========================================
  // 100 LEVEL: ENG 113 - Introduction to Poetry
  // ==========================================
  {
    id: 'text-113-west-african-verse',
    title: 'West African Verse: An Anthology of Classic & Pioneer Poets',
    courseCode: 'ENG 113',
    courseTitle: 'Introduction to Poetry',
    level: '100',
    semester: '1st',
    category: 'text',
    track: 'Literature',
    author: 'Compiled by D. I. Nwoga (Prescribed for UNIZIK)',
    academicYear: 'Core Recommended Text',
    description: 'The standard anthology of West African poetry featuring Gabriel Okara, Christopher Okigbo, J. P. Clark, Wole Soyinka, Léopold Sédar Senghor, and Lenrie Peters.',
    fileFormat: 'PDF',
    fileSize: '3.4 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 113',
      level: '100',
      category: 'text',
      academicYear: 'Core Prescribed Edition',
      track: 'Literature',
      customTopics: ['African Verse', 'Poetry', 'Okigbo', 'Okara', 'Senghor']
    }),
    verifiedBy: 'NASELS Academic Board / UNIZIK',
    downloadCount: 2900,
    dateAdded: '2024-01-18',
    summaryOrContent: `### West African Verse Study Companion
Detailed critical readings of:
- Gabriel Okara: "Piano and Drums" (The cultural dilemma of the educated African torn between rustic rhythms and complex European technologies)
- Christopher Okigbo: "Idoto" (The spiritual pilgrimage and ritual cleansing before indigenous deities)
- J. P. Clark: "Night Rain", "Abiku", "Streamside Exchange"`
  },
  {
    id: 'pq-113-2023-first-sem',
    title: 'ENG 113 Past Question Paper (2023/2024 First Semester)',
    courseCode: 'ENG 113',
    courseTitle: 'Introduction to Poetry',
    level: '100',
    semester: '1st',
    category: 'past_question',
    track: 'Literature',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'Degree examination testing metrical scansion (iambic, trochaic, anapestic), figurative devices, tone, mood, and close textual parsing of unseen African poetry.',
    fileFormat: 'PDF',
    fileSize: '410 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 113',
      level: '100',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Literature',
      customTopics: ['Poetry', 'Scansion', 'Metre', 'Imagery', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 1820,
    dateAdded: '2024-03-24',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
FIRST SEMESTER EXAMINATION 2023/2024 SESSION
ENG 113: Introduction to Poetry
1. Scan the following four stanzas, identifying the metrical foot, rhyme scheme, and caesura.
2. Explore the dichotomy of indigenous innocence versus colonial artifice in Gabriel Okara’s "Piano and Drums".`
  },
  {
    id: 'notes-113-2022-poetics',
    title: 'ENG 113 Lecture Compendium: Poetic Forms, Devices & Practical Scansion',
    courseCode: 'ENG 113',
    courseTitle: 'Introduction to Poetry',
    level: '100',
    semester: '1st',
    category: 'notes',
    track: 'Literature',
    author: 'Dr. (Mrs) N. A. Nwabueze',
    academicYear: '2022/2023 Session',
    description: 'Guide to sonnet structures (Petrarchan vs Shakespearean), villanelles, free verse, synecdoche, metonymy, oxymoron, and poetic musicality.',
    fileFormat: 'PDF',
    fileSize: '2.0 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 113',
      level: '100',
      category: 'notes',
      academicYear: '2022/2023 Session',
      track: 'Literature',
      customTopics: ['Poetic Forms', 'Sonnets', 'Figures of Speech']
    }),
    verifiedBy: 'NASELS Academic Committee',
    downloadCount: 1610,
    dateAdded: '2023-04-10',
    summaryOrContent: `Poetic Devices Manual:
- Metre: Foot (Iamb, Trochee, Anapest, Dactyl, Spondee)
- Line Lengths: Monometer through Octameter
- Sonnet Forms: 14 lines in iambic pentameter (Octave + Sestet vs 3 Quatrains + Couplet).`
  },

  // ==========================================
  // 200 LEVEL: ENG 201 - English Morphology
  // ==========================================
  {
    id: 'notes-201-morphology',
    title: 'ENG 201 Lecture Compendium: Morphology & Word Formation in English',
    courseCode: 'ENG 201',
    courseTitle: 'English Morphology',
    level: '200',
    semester: '1st',
    category: 'notes',
    track: 'Language & Linguistics',
    author: 'Dr. E. O. Okafor',
    academicYear: '2023/2024 Session',
    description: 'Definitive guide on free/bound morphemes, roots vs stems, derivational vs inflectional morphemes, allomorphic conditioning, and morphological trees.',
    fileFormat: 'PDF',
    fileSize: '2.1 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 201',
      level: '200',
      category: 'notes',
      academicYear: '2023/2024 Session',
      track: 'Language & Linguistics',
      customTopics: ['Morphology', 'Allomorphs', 'Word Formation', 'Affixes']
    }),
    verifiedBy: 'NASELS Academic Committee',
    downloadCount: 2190,
    dateAdded: '2023-11-28',
    summaryOrContent: `## 1. Fundamentals of English Morphology
- **Morpheme**: Minimal unit of grammatical analysis.
- **Allomorphs**: Phonologically or morphologically conditioned variants of a single morpheme (e.g., the English plural morpheme /-s/ has allomorphs [s], [z], and [ɪz]).
- **Derivational vs Inflectional**: Derivational affixes change word class or lexical meaning; inflectional affixes mark grammatical relations without changing class.`
  },
  {
    id: 'pq-201-2023-first-sem',
    title: 'ENG 201 Past Question Paper (2023/2024 First Semester)',
    courseCode: 'ENG 201',
    courseTitle: 'English Morphology',
    level: '200',
    semester: '1st',
    category: 'past_question',
    track: 'Language & Linguistics',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'Degree examination testing morphological parsing, zero-morpheme analysis, allomorphic alternation rules, and tree diagrams of complex derivations.',
    fileFormat: 'PDF',
    fileSize: '430 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 201',
      level: '200',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Language & Linguistics',
      customTopics: ['Morphology', 'Allomorphs', 'Tree Diagrams', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 1940,
    dateAdded: '2024-03-25',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
FIRST SEMESTER EXAMINATION 2023/2024 SESSION
ENG 201: English Morphology
1. Draw morphological trees showing the hierarchical derivation of: (a) ungentlemanliness, (b) institutionalization, (c) decentralization.
2. Account for the phonological conditioning of the English past tense morpheme {-ed}.`
  },
  {
    id: 'notes-201-2022-processes',
    title: 'ENG 201 Morphological Processes & Lexical Productivity Handout',
    courseCode: 'ENG 201',
    courseTitle: 'English Morphology',
    level: '200',
    semester: '1st',
    category: 'notes',
    track: 'Language & Linguistics',
    author: 'NASELS Academic Committee',
    academicYear: '2022/2023 Session',
    description: 'Covers blending, clipping, back-formation, compounding, acronymy, reduplication, and nonce formations with UNIZIK exam drill questions.',
    fileFormat: 'PDF',
    fileSize: '1.9 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 201',
      level: '200',
      category: 'notes',
      academicYear: '2022/2023 Session',
      track: 'Language & Linguistics',
      customTopics: ['Compounding', 'Clipping', 'Back-formation']
    }),
    verifiedBy: 'NASELS Academic Committee',
    downloadCount: 1530,
    dateAdded: '2023-03-12',
    summaryOrContent: `Word Formation Processes:
- Back-Formation: Creation of a new simpler word by removing an apparent affix (e.g. burglar -> burgle, editor -> edit).
- Blending: Combining parts of two words (smog = smoke + fog, brunch = breakfast + lunch).
- Compounding: Endocentric vs Exocentric compounds.`
  },

  // ==========================================
  // 200 LEVEL: ENG 202 - Introduction to Syntax
  // ==========================================
  {
    id: 'notes-202-syntax-ic-analysis',
    title: 'ENG 202 Syntax Handbook: Immediate Constituent (IC) Analysis & Phrase Structure',
    courseCode: 'ENG 202',
    courseTitle: 'Introduction to Syntax',
    level: '200',
    semester: '2nd',
    category: 'notes',
    track: 'Language & Linguistics',
    author: 'Dr. F. I. Eze',
    academicYear: '2023/2024 Session',
    description: 'Essential syntax tutorial on IC analysis, phrase structure rules (NP, VP, PP, AP), syntactic ambiguity resolution, and tree diagrams.',
    fileFormat: 'PDF',
    fileSize: '2.5 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 202',
      level: '200',
      category: 'notes',
      academicYear: '2023/2024 Session',
      track: 'Language & Linguistics',
      customTopics: ['Syntax', 'IC Analysis', 'Tree Diagrams', 'Phrase Structure']
    }),
    verifiedBy: 'NASELS Academic Board',
    downloadCount: 2310,
    dateAdded: '2024-02-20',
    summaryOrContent: `## 1. Principles of Immediate Constituent (IC) Analysis
- Developed by Leonard Bloomfield, IC analysis parses sentences by binary cuts until reaching ultimate constituents.
- Syntactic Ambiguity: Sentences with two distinct deep structures (e.g. "Flying planes can be dangerous" or "The boy saw the man with the telescope").`
  },
  {
    id: 'pq-202-2023-second-sem',
    title: 'ENG 202 Past Question Paper (2023/2024 Second Semester)',
    courseCode: 'ENG 202',
    courseTitle: 'Introduction to Syntax',
    level: '200',
    semester: '2nd',
    category: 'past_question',
    track: 'Language & Linguistics',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'Degree examination testing phrase structure rule formulations, syntactic constituency tests, and disambiguation using tree diagrams.',
    fileFormat: 'PDF',
    fileSize: '400 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 202',
      level: '200',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Language & Linguistics',
      customTopics: ['Syntax', 'Ambiguity', 'Constituency', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 1880,
    dateAdded: '2024-08-18',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
SECOND SEMESTER EXAMINATION 2023/2024 SESSION
ENG 202: Introduction to Syntax
1. Use Phrase Structure Trees to disambiguate: "More beautiful girls attended the matriculation ceremony."
2. Explain the three primary tests for syntactic constituency: Substitution, Movement, and Coordination.`
  },

  // ==========================================
  // 200 LEVEL: ENG 211 - African Prose Fiction
  // ==========================================
  {
    id: 'text-211-purple-hibiscus',
    title: 'Purple Hibiscus',
    courseCode: 'ENG 211',
    courseTitle: 'African Prose Fiction',
    level: '200',
    semester: '1st',
    category: 'text',
    track: 'Literature',
    author: 'Chimamanda Ngozi Adichie',
    academicYear: 'Core Recommended Text',
    description: 'Adichie’s debut novel set in post-colonial Enugu and Nsukka. Explores religious fanaticism, domestic tyranny, political corruption, and coming of age.',
    fileFormat: 'PDF',
    fileSize: '3.5 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 211',
      level: '200',
      category: 'text',
      academicYear: 'Core Prescribed Edition',
      track: 'Literature',
      customTopics: ['African Prose', 'Adichie', 'Nsukka', 'Kambili', 'Religious Fanaticism']
    }),
    verifiedBy: 'NASELS Academic Board / UNIZIK',
    downloadCount: 3950,
    dateAdded: '2024-01-12',
    summaryOrContent: `### Academic Study Companion: Purple Hibiscus (Chimamanda Ngozi Adichie)
#### 1. Narrative Architecture
Narrated by fifteen-year-old Kambili Achike, tracing her journey from terrorized silence in Enugu to intellectual and emotional liberation in Nsukka under Aunty Ifeoma.`
  },
  {
    id: 'pq-211-2023-second-sem',
    title: 'ENG 211 Past Question Paper (2023/2024 Second Semester)',
    courseCode: 'ENG 211',
    courseTitle: 'African Prose Fiction',
    level: '200',
    semester: '1st',
    category: 'past_question',
    track: 'Literature',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'Official UNIZIK degree examination on African Prose Fiction, covering socio-political disillusionment, feminist agency, and narrative technique.',
    fileFormat: 'PDF',
    fileSize: '410 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 211',
      level: '200',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Literature',
      customTopics: ['African Prose', 'Feminism', 'Adichie', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 2280,
    dateAdded: '2024-04-18',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
FIRST SEMESTER EXAMINATION 2023/2024 SESSION
ENG 211: African Prose Fiction
1. "Aunty Ifeoma’s home in Nsukka serves as a laboratory of intellectual freedom and democratic parenting." Discuss in relation to Kambili and Jaja's psychological metamorphosis in Purple Hibiscus.`
  },
  {
    id: 'pq-211-2022-first-sem',
    title: 'ENG 211 Past Question Paper (2022/2023 First Semester)',
    courseCode: 'ENG 211',
    courseTitle: 'African Prose Fiction',
    level: '200',
    semester: '1st',
    category: 'past_question',
    track: 'Literature',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2022/2023 Session',
    description: 'Examination covering pioneer anti-colonial narratives, Armah’s The Beautyful Ones Are Not Yet Born, and Ngugi’s A Grain of Wheat.',
    fileFormat: 'PDF',
    fileSize: '390 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 211',
      level: '200',
      category: 'past_question',
      academicYear: '2022/2023 Session',
      track: 'Literature',
      customTopics: ['African Prose', 'Disillusionment', 'Armah', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 1840,
    dateAdded: '2023-04-20',
    summaryOrContent: `1. Discuss the aesthetics of excrement and decay in Ayi Kwei Armah’s The Beautyful Ones Are Not Yet Born.
2. Examine the theme of betrayal and anti-colonial resistance in Ngugi wa Thiong’o’s A Grain of Wheat.`
  },

  // ==========================================
  // 200 LEVEL: ENG 212 - African Drama
  // ==========================================
  {
    id: 'text-212-death-kings-horseman',
    title: 'Death and the King’s Horseman',
    courseCode: 'ENG 212',
    courseTitle: 'African Drama',
    level: '200',
    semester: '2nd',
    category: 'text',
    track: 'Literature',
    author: 'Wole Soyinka',
    academicYear: 'Core Recommended Text',
    description: 'Soyinka’s tragic masterpiece rooted in the 1946 Oyo historical incident. Explores metaphysical transition, Yoruba cosmogony, and cosmic cataclysm.',
    fileFormat: 'PDF',
    fileSize: '3.2 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 212',
      level: '200',
      category: 'text',
      academicYear: 'Core Prescribed Edition',
      track: 'Literature',
      customTopics: ['African Drama', 'Elesin Oba', 'Soyinka', 'Tragedy', 'Total Theatre']
    }),
    verifiedBy: 'NASELS Academic Board / UNIZIK',
    downloadCount: 3650,
    dateAdded: '2024-01-25',
    summaryOrContent: `### Academic Study Companion: Death and the King’s Horseman (Wole Soyinka)
#### 1. Metaphysical Architecture
Soyinka famously warns in his Author's Note against viewing the play simply as a "clash of cultures." Instead, the tragic crux is Elesin Oba's internal hesitation.`
  },
  {
    id: 'pq-212-2023-second-sem',
    title: 'ENG 212 Past Question Paper (2023/2024 Second Semester)',
    courseCode: 'ENG 212',
    courseTitle: 'African Drama',
    level: '200',
    semester: '2nd',
    category: 'past_question',
    track: 'Literature',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'Degree examination on Total Theatre aesthetics, Olunde’s sacrificial suicide, and revolutionary dramaturgies in Osofisan’s Once Upon Four Robbers.',
    fileFormat: 'PDF',
    fileSize: '400 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 212',
      level: '200',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Literature',
      customTopics: ['African Drama', 'Soyinka', 'Osofisan', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 1910,
    dateAdded: '2024-08-20',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
SECOND SEMESTER EXAMINATION 2023/2024 SESSION
ENG 212: African Drama
1. Contrast Elesin Oba’s moral hesitation with Olunde’s resolute sacrificial intervention in Death and the King’s Horseman.
2. How does Femi Osofisan engage Bertolt Brecht’s epic theatre in Once Upon Four Robbers?`
  },

  // ==========================================
  // 300 LEVEL: ENG 301 - Advanced English Syntax
  // ==========================================
  {
    id: 'pq-301-2023-first-sem',
    title: 'ENG 301 Past Question Paper (2023/2024 First Semester)',
    courseCode: 'ENG 301',
    courseTitle: 'Advanced English Syntax',
    level: '300',
    semester: '1st',
    category: 'past_question',
    track: 'Language & Linguistics',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'Penultimate degree examination testing X-bar schema derivations, Specifier-Head-Complement relations, Government and Binding theory, and Theta criteria.',
    fileFormat: 'PDF',
    fileSize: '450 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 301',
      level: '300',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Language & Linguistics',
      customTopics: ['Advanced Syntax', 'X-Bar Theory', 'GB Theory', 'Chomsky', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 2150,
    dateAdded: '2024-04-10',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
FIRST SEMESTER EXAMINATION 2023/2024 SESSION
ENG 301: Advanced English Syntax
1. (a) State the universal X-Bar Schema and demonstrate how it accounts for Specifier, Head, Complement, and Adjunct relations.
2. Explain the Theta (θ) Criterion in Government and Binding Theory.`
  },
  {
    id: 'notes-301-transformational-syntax',
    title: 'ENG 301 Lecture Compendium: Generative Syntax, X-Bar Schema & GB Theory',
    courseCode: 'ENG 301',
    courseTitle: 'Advanced English Syntax',
    level: '300',
    semester: '1st',
    category: 'notes',
    track: 'Language & Linguistics',
    author: 'Prof. C. N. Okeke',
    academicYear: '2023/2024 Session',
    description: 'Exhaustive 300-level syntax text explaining Chomskyan generative grammar, Move-Alpha, C-command relations, and Binding Principles A, B, and C.',
    fileFormat: 'PDF',
    fileSize: '2.8 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 301',
      level: '300',
      category: 'notes',
      academicYear: '2023/2024 Session',
      track: 'Language & Linguistics',
      customTopics: ['Generative Syntax', 'X-Bar Schema', 'Binding Theory', 'C-command']
    }),
    verifiedBy: 'NASELS Academic Committee',
    downloadCount: 2420,
    dateAdded: '2023-12-01',
    summaryOrContent: `## X-Bar Syntax Framework
Universal schema:
XP -> (Specifier) X'
X' -> X' (Adjunct)
X' -> X (Head) (Complement)`
  },
  {
    id: 'pq-301-2022-first-sem',
    title: 'ENG 301 Past Question Paper (2022/2023 First Semester)',
    courseCode: 'ENG 301',
    courseTitle: 'Advanced English Syntax',
    level: '300',
    semester: '1st',
    category: 'past_question',
    track: 'Language & Linguistics',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2022/2023 Session',
    description: 'Examination covering Wh-movement, NP-movement in passive and raising constructions, and Case filter violations in generative grammar.',
    fileFormat: 'PDF',
    fileSize: '410 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 301',
      level: '300',
      category: 'past_question',
      academicYear: '2022/2023 Session',
      track: 'Language & Linguistics',
      customTopics: ['Wh-movement', 'Case Theory', 'Syntax', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Archive',
    downloadCount: 1730,
    dateAdded: '2023-04-14',
    summaryOrContent: `1. Explain Move-Alpha. Demonstrate Wh-movement using tree structures.
2. State Binding Principles A, B, and C with illustrative sentences.`
  },

  // ==========================================
  // 300 LEVEL: ENG 303 - Semantics and Pragmatics
  // ==========================================
  {
    id: 'notes-303-semantics-pragmatics',
    title: 'ENG 303 Lecture Compendium: Semantics, Pragmatics & Speech Act Theory',
    courseCode: 'ENG 303',
    courseTitle: 'Semantics and Pragmatics',
    level: '300',
    semester: '2nd',
    category: 'notes',
    track: 'Language & Linguistics',
    author: 'Dr. O. J. Anyaegbu',
    academicYear: '2023/2024 Session',
    description: 'Comprehensive manual on sense relations, truth-conditional semantics, Austin & Searle’s speech acts, Gricean conversational maxims, and politeness theory.',
    fileFormat: 'PDF',
    fileSize: '2.6 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 303',
      level: '300',
      category: 'notes',
      academicYear: '2023/2024 Session',
      track: 'Language & Linguistics',
      customTopics: ['Semantics', 'Pragmatics', 'Speech Acts', 'Implicature', 'Grice']
    }),
    verifiedBy: 'NASELS Academic Committee',
    downloadCount: 2180,
    dateAdded: '2024-02-18',
    summaryOrContent: `## 1. Sense Relations
- Synonymy, Antonymy (Gradable, Complementary, Relational/Converses), Hyponymy, Polysemy, Homonymy.
## 2. Austin and Searle’s Speech Act Theory
- Locutionary act (Literal utterance)
- Illocutionary act (Communicative force / intention)
- Perlocutionary act (Effect on the hearer)`
  },
  {
    id: 'pq-303-2023-second-sem',
    title: 'ENG 303 Past Question Paper (2023/2024 Second Semester)',
    courseCode: 'ENG 303',
    courseTitle: 'Semantics and Pragmatics',
    level: '300',
    semester: '2nd',
    category: 'past_question',
    track: 'Language & Linguistics',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'Degree examination testing presupposition vs entailment, flouting Gricean maxims for conversational implicature, and deictic reference.',
    fileFormat: 'PDF',
    fileSize: '420 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 303',
      level: '300',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Language & Linguistics',
      customTopics: ['Pragmatics', 'Entailment', 'Implicature', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 1870,
    dateAdded: '2024-08-22',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
SECOND SEMESTER EXAMINATION 2023/2024 SESSION
ENG 303: Semantics and Pragmatics
1. Differentiate between Entailment and Presupposition with clear diagnostic tests.
2. Explain the Cooperative Principle and show how flouting Grice's maxims generates conversational implicature.`
  },

  // ==========================================
  // 300 LEVEL: ENG 313 - Literary Theory and Criticism
  // ==========================================
  {
    id: 'text-313-literary-theory-eagleton',
    title: 'Literary Theory: An Introduction',
    courseCode: 'ENG 313',
    courseTitle: 'Literary Theory and Criticism',
    level: '300',
    semester: '1st',
    category: 'text',
    track: 'Literature',
    author: 'Terry Eagleton (Prescribed for UNIZIK)',
    academicYear: 'Core Recommended Text',
    description: 'The standard critical text analyzing 20th-century theoretical paradigms: Russian Formalism, Structuralism, Psychoanalysis, Marxism, and Post-structuralism.',
    fileFormat: 'PDF',
    fileSize: '4.1 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 313',
      level: '300',
      category: 'text',
      academicYear: 'Core Prescribed Edition',
      track: 'Literature',
      customTopics: ['Literary Theory', 'Marxism', 'Eagleton', 'Structuralism', 'Criticism']
    }),
    verifiedBy: 'NASELS Academic Board / UNIZIK',
    downloadCount: 3410,
    dateAdded: '2024-01-10',
    summaryOrContent: `### Academic Critical Companion: Literary Theory (Terry Eagleton)
#### 1. The Ideology of Literature
Eagleton deconstructs the assumption that "literature" exists as an objective ontological category. Literature is not an immutable essence, but a historically contingent social construct.`
  },
  {
    id: 'pq-313-2023-first-sem',
    title: 'ENG 313 Past Question Paper (2023/2024 First Semester)',
    courseCode: 'ENG 313',
    courseTitle: 'Literary Theory and Criticism',
    level: '300',
    semester: '1st',
    category: 'past_question',
    track: 'Literature',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'Degree examination testing Postcolonial theories (Fanon, Said, Bhabha), Marxist base-superstructure dynamics, and African feminist paradigms (Womanism, Motherism).',
    fileFormat: 'PDF',
    fileSize: '440 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 313',
      level: '300',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Literature',
      customTopics: ['Literary Theory', 'Postcolonialism', 'Marxism', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 2050,
    dateAdded: '2024-04-14',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
FIRST SEMESTER EXAMINATION 2023/2024 SESSION
ENG 313: Literary Theory and Criticism
1. Critically evaluate Edward Said’s Orientalism (1978) as an epistemological instrument of imperial hegemony.
2. Distinguish Western radical feminism from Chikwenye Ogunyemi’s African Womanism.`
  },

  // ==========================================
  // 300 LEVEL: ENG 322 - Nigerian Literature
  // ==========================================
  {
    id: 'pq-322-2023-second-sem',
    title: 'ENG 322 Past Question Paper (2023/2024 Second Semester)',
    courseCode: 'ENG 322',
    courseTitle: 'Nigerian Literature',
    level: '300',
    semester: '2nd',
    category: 'past_question',
    track: 'Literature',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'Examination on the trajectory of Nigerian creative writing: Onitsha Market Pamphlet literature, Ibadan-Nsukka poetry renaissance, and Biafran war memoirs.',
    fileFormat: 'PDF',
    fileSize: '400 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 322',
      level: '300',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Literature',
      customTopics: ['Nigerian Literature', 'Onitsha Market', 'Civil War', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 1970,
    dateAdded: '2024-08-25',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
SECOND SEMESTER EXAMINATION 2023/2024 SESSION
ENG 322: Nigerian Literature
1. Examine the populist aesthetic and didactic themes of Onitsha Market Pamphlet literature.
2. "Biafran war literature is a literature of trauma, memory, and bearing witness." Discuss with reference to Elechi Amadi's Sunset in Biafra.`
  },
  {
    id: 'notes-322-2022-civil-war',
    title: 'ENG 322 Lecture Guide: Civil War Fiction, Poetry & Post-War Trauma',
    courseCode: 'ENG 322',
    courseTitle: 'Nigerian Literature',
    level: '300',
    semester: '2nd',
    category: 'notes',
    track: 'Literature',
    author: 'Dr. (Mrs) N. A. Nwabueze',
    academicYear: '2022/2023 Session',
    description: 'Critical dissection of Biafran war testimonies, Achebe’s Beware Soul Brother, Christopher Okigbo’s Path of Thunder, and contemporary re-imaginings.',
    fileFormat: 'PDF',
    fileSize: '2.3 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 322',
      level: '300',
      category: 'notes',
      academicYear: '2022/2023 Session',
      track: 'Literature',
      customTopics: ['Civil War', 'Biafra', 'Nigerian Poetry', 'Okigbo']
    }),
    verifiedBy: 'NASELS Academic Committee',
    downloadCount: 1690,
    dateAdded: '2023-08-10',
    summaryOrContent: `Study of Post-War Nigerian Literary Consciousness:
- Okigbo's Prophetic Vision in "Path of Thunder"
- Achebe's "Girls at War" and "Vultures"
- The feminine perspective on wartime survival in Buchi Emecheta's Destination Biafra.`
  },

  // ==========================================
  // 400 LEVEL: ENG 402 - Discourse Analysis and Stylistics
  // ==========================================
  {
    id: 'pq-402-2023-first-sem',
    title: 'ENG 402 Past Question Paper (2023/2024 First Semester)',
    courseCode: 'ENG 402',
    courseTitle: 'Discourse Analysis and Stylistics',
    level: '400',
    semester: '1st',
    category: 'past_question',
    track: 'Language & Linguistics',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'Official 400L degree examination paper featuring unseen literary excerpts for stylistic dissection, Halliday’s cohesion analysis, and Fairclough’s CDA.',
    fileFormat: 'PDF',
    fileSize: '450 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 402',
      level: '400',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Language & Linguistics',
      customTopics: ['Stylistics', 'Discourse Analysis', 'CDA', 'Cohesion', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 2680,
    dateAdded: '2024-04-25',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
FIRST SEMESTER EXAMINATION 2023/2024 SESSION
ENG 402: Discourse Analysis and Stylistics
1. Conduct an exhaustive stylistic analysis of an unseen passage from a contemporary Nigerian political manifesto. Tabulate cohesive ties across lexical repetition and anaphora.
2. "Foregrounding is the engine of aesthetic communication." Discuss with illustrations from modern African poetry.`
  },
  {
    id: 'notes-402-stylistics-discourse',
    title: 'ENG 402 Compendium: Stylistic Analysis, Foregrounding & Critical Discourse Analysis',
    courseCode: 'ENG 402',
    courseTitle: 'Discourse Analysis and Stylistics',
    level: '400',
    semester: '1st',
    category: 'notes',
    track: 'Language & Linguistics',
    author: 'Prof. C. N. Okeke & Dr. O. J. Anyaegbu',
    academicYear: '2023/2024 Session',
    description: 'Advanced stylistics manual providing concrete frameworks for parsing prose and poetry: Halliday’s cohesive devices, Leech & Short checklists, and Fairclough’s CDA.',
    fileFormat: 'PDF',
    fileSize: '2.7 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 402',
      level: '400',
      category: 'notes',
      academicYear: '2023/2024 Session',
      track: 'Language & Linguistics',
      customTopics: ['Stylistics', 'Cohesion', 'CDA', 'Foregrounding']
    }),
    verifiedBy: 'NASELS Academic Committee',
    downloadCount: 2780,
    dateAdded: '2023-12-05',
    summaryOrContent: `## 1. Foregrounding Theory
Coined by the Prague School (Jan Mukařovský), foregrounding is psychological salience achieved through linguistic design via Deviation and Parallelism.
## 2. Halliday & Hasan’s Taxonomy of Cohesive Devices (1976)
- Reference, Substitution, Ellipsis, Conjunction, Lexical Cohesion.`
  },
  {
    id: 'pq-402-2022-first-sem',
    title: 'ENG 402 Past Question Paper (2022/2023 First Semester)',
    courseCode: 'ENG 402',
    courseTitle: 'Discourse Analysis and Stylistics',
    level: '400',
    semester: '1st',
    category: 'past_question',
    track: 'Language & Linguistics',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2022/2023 Session',
    description: 'Final-year examination on transitivity systems in Systemic Functional Linguistics (SFL) and pragmatic presuppositions in media discourse.',
    fileFormat: 'PDF',
    fileSize: '410 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 402',
      level: '400',
      category: 'past_question',
      academicYear: '2022/2023 Session',
      track: 'Language & Linguistics',
      customTopics: ['SFL', 'Transitivity', 'Stylistics', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 1890,
    dateAdded: '2023-04-28',
    summaryOrContent: `1. Apply Halliday's Transitivity model (Material, Mental, Relational processes) to an editorial from a Nigerian daily newspaper.
2. Discuss ideological legitimation strategies in political discourse.`
  },

  // ==========================================
  // 400 LEVEL: ENG 411 - Modern and Postmodern Literature
  // ==========================================
  {
    id: 'text-411-half-of-a-yellow-sun',
    title: 'Half of a Yellow Sun',
    courseCode: 'ENG 411',
    courseTitle: 'Modern and Postmodern Literature',
    level: '400',
    semester: '1st',
    category: 'text',
    track: 'Literature',
    author: 'Chimamanda Ngozi Adichie',
    academicYear: 'Core Recommended Text',
    description: 'Adichie’s sweeping historical epic of the Nigeria-Biafra Civil War (1967–1970). Explores love, academic idealism, historiographic metafiction, and wartime trauma.',
    fileFormat: 'PDF',
    fileSize: '4.6 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 411',
      level: '400',
      category: 'text',
      academicYear: 'Core Prescribed Edition',
      track: 'Literature',
      customTopics: ['Civil War', 'Biafra', 'Metafiction', 'Adichie', 'Historical Fiction']
    }),
    verifiedBy: 'NASELS Academic Board / UNIZIK',
    downloadCount: 3200,
    dateAdded: '2024-01-10',
    summaryOrContent: `### Academic Critical Companion: Half of a Yellow Sun (Chimamanda Ngozi Adichie)
#### 1. Narrative Polyphony & Perspectives
Adichie structures the novel around three intersecting focal characters: Ugwu, Olanna, and Richard Churchill.
#### 2. Historiographic Metafiction
Ugwu’s composition of "The World Was Silent When We Died" asserts indigenous ownership over historical memory.`
  },
  {
    id: 'pq-411-2023-first-sem',
    title: 'ENG 411 Past Question Paper (2023/2024 First Semester)',
    courseCode: 'ENG 411',
    courseTitle: 'Modern and Postmodern Literature',
    level: '400',
    semester: '1st',
    category: 'past_question',
    track: 'Literature',
    author: 'Department of English Language & Literature, UNIZIK',
    academicYear: '2023/2024 Session',
    description: 'Degree examination assessing high modernism (T.S. Eliot, Virginia Woolf) and postmodernist techniques (fragmentation, intertextuality, pastiche).',
    fileFormat: 'PDF',
    fileSize: '420 KB',
    tags: generateStandardTags({
      courseCode: 'ENG 411',
      level: '400',
      category: 'past_question',
      academicYear: '2023/2024 Session',
      track: 'Literature',
      customTopics: ['Modernism', 'Postmodernism', 'Woolf', 'Metafiction', 'Exam Paper']
    }),
    verifiedBy: 'NASELS Exam Records Archive',
    downloadCount: 1980,
    dateAdded: '2024-04-26',
    summaryOrContent: `NNAMDI AZIKIWE UNIVERSITY, AWKA
FIRST SEMESTER EXAMINATION 2023/2024 SESSION
ENG 411: Modern and Postmodern Literature
1. "The Waste Land is the definitive monument to post-World War I spiritual disillusionment." Discuss Eliot's mythical method and fragmented montage.
2. Differentiate between Modernist epistemological doubt and Postmodern ontological uncertainty (Brian McHale).`
  },

  // ==========================================
  // 400 LEVEL: ENG 490 - B.A. Long Essay / Research Project
  // ==========================================
  {
    id: 'guide-long-essay-mla9',
    title: 'NASELS UNIZIK B.A. Long Essay & Project Manual (MLA 9th Edition Standard)',
    courseCode: 'ENG 490',
    courseTitle: 'B.A. Long Essay / Research Project',
    level: '400',
    semester: '2nd',
    category: 'outline',
    track: 'General/Combined',
    author: 'NASELS UNIZIK Academic Board & Editorial Committee',
    academicYear: 'Official 2024/2025 Edition',
    description: 'The definitive handbook for final-year students of English Language and Literature. Covers project topic approval, five-chapter structure, in-text citations, Works Cited list, and defense etiquette.',
    fileFormat: 'PDF',
    fileSize: '3.2 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 490',
      level: '400',
      category: 'outline',
      academicYear: '2024/2025 Session',
      track: 'General/Combined',
      customTopics: ['MLA 9th Edition', 'Project Writing', 'Long Essay', 'Research Guide']
    }),
    verifiedBy: 'Departmental Research Committee',
    downloadCount: 3890,
    dateAdded: '2024-01-05',
    summaryOrContent: `## NASELS UNIZIK B.A. Long Essay Standard Guide (MLA 9th Edition)
### 1. Traditional Five-Chapter Structure
- Chapter 1: Introduction (Background, Problem, Objectives, Significance, Scope, Definition)
- Chapter 2: Literature Review & Theoretical Framework
- Chapter 3: Research Methodology
- Chapter 4: Data Presentation & Analysis
- Chapter 5: Summary, Conclusion & Recommendations`
  },
  {
    id: 'guide-490-2023-topics',
    title: 'ENG 490 Archive of Approved Departmental Research Topics & Methodological Abstracts',
    courseCode: 'ENG 490',
    courseTitle: 'B.A. Long Essay / Research Project',
    level: '400',
    semester: '2nd',
    category: 'outline',
    track: 'General/Combined',
    author: 'NASELS Research & Editorial Directorate',
    academicYear: '2023/2024 Session',
    description: 'Curated repository of approved research topics across Linguistics (phonetics, syntax, sociolinguistics, CDA) and Literature (ecocriticism, postcolonialism, gender studies) with sample abstracts.',
    fileFormat: 'PDF',
    fileSize: '2.5 MB',
    tags: generateStandardTags({
      courseCode: 'ENG 490',
      level: '400',
      category: 'outline',
      academicYear: '2023/2024 Session',
      track: 'General/Combined',
      customTopics: ['Research Topics', 'Abstracts', 'Long Essay', 'Methodology']
    }),
    verifiedBy: 'Departmental Research Committee',
    downloadCount: 2740,
    dateAdded: '2023-11-20',
    summaryOrContent: `Approved Research Paradigms:
1. Ecocriticism in Contemporary Niger Delta Poetry
2. Systemic Functional Analysis of Deontic Modality in Nigerian Presidential Broadcasts
3. A Syntactic Analysis of Code-Switching among UNIZIK Bilingual Undergraduates
4. Historiographic Metafiction in 21st-Century Nigerian Diaspora Novels.`
  }
];
