import { CourseOutline } from '../types';

export const UNIZIK_COURSES: CourseOutline[] = [
  // 100 Level First Semester
  {
    code: 'ENG 101',
    title: 'Practical English Grammar',
    level: '100',
    semester: '1st',
    creditUnits: 3,
    track: 'Language & Linguistics',
    lecturerInCharge: 'Prof. C. N. Okeke & Dr. F. I. Eze',
    description: 'Detailed survey of the English sentence structure, parts of speech, structural functions, subject-verb agreement (concord), common syntactic errors and structural ambiguities.',
    coreTopics: [
      'Word Classes (Open & Closed categories)',
      'The English Phrase: NP, VP, AdjP, AdvP, PP',
      'The Clause Structure: SPCA configurations',
      'Rules of Concord and Agreement',
      'Punctuation, Mechanics and Common Syntactic Fallacies'
    ],
    recommendedTexts: [
      'A University Grammar of English - Randolph Quirk & Sidney Greenbaum',
      'Practical English Grammar - A. J. Thomson & A. V. Martinet',
      'Mastering English Grammar for Nigerian Undergraduates - E. O. Okonkwo'
    ]
  },
  {
    code: 'ENG 111',
    title: 'Introduction to Literature: Prose Fiction',
    level: '100',
    semester: '1st',
    creditUnits: 2,
    track: 'Literature',
    lecturerInCharge: 'Dr. (Mrs) N. A. Nwabueze',
    description: 'Introduction to the nature and elements of prose fiction, narrative techniques, characterization, point of view, plot architecture, and the historical development of the African novel.',
    coreTopics: [
      'Elements of Prose: Plot, Setting, Character, Narrative Perspective',
      'The Rise of the Modern Novel in Africa and the West',
      'Theme, Motif, Symbolism and Allegory in Fiction',
      'Critical Textual Analysis of Prescribed African & European Novels'
    ],
    recommendedTexts: [
      'Things Fall Apart - Chinua Achebe',
      'Great Expectations - Charles Dickens',
      'Aspects of the Novel - E. M. Forster',
      'Understanding Unseen Prose - C. T. Maduka'
    ]
  },
  {
    code: 'ENG 113',
    title: 'Introduction to Poetry',
    level: '100',
    semester: '1st',
    creditUnits: 2,
    track: 'Literature',
    lecturerInCharge: 'Dr. K. C. Ude',
    description: 'Exploration of poetic forms, meters, imagery, figurative language, rhyme schemes, and stylistic appreciation of African oral and written poetry.',
    coreTopics: [
      'Poetic Diction, Imagery, Sound Devices (Assonance, Alliteration, Onomatopoeia)',
      'Forms and Stanzaic Patterns (Sonnet, Ode, Elegy, Ballad, Free Verse)',
      'Traditional African Oral Poetry & Praise Songs',
      'Modern African Verse: Okigbo, Clark, Soyinka, Ojaide'
    ],
    recommendedTexts: [
      'A Selection of African Poetry - K. E. Senanu & T. Vincent',
      'The Norton Anthology of Modern and Contemporary Poetry',
      'Labyrinths - Christopher Okigbo'
    ]
  },

  // 100 Level Second Semester
  {
    code: 'ENG 102',
    title: 'Spoken English & Oral Communication',
    level: '100',
    semester: '2nd',
    creditUnits: 3,
    track: 'Language & Linguistics',
    lecturerInCharge: 'Dr. O. J. Anyaegbu',
    description: 'Systematic study of the segmental and suprasegmental features of Received Pronunciation (RP) contrasted with Educated Nigerian English (ENE).',
    coreTopics: [
      'The 44 Phonemes of English: Pure Vowels, Diphthongs, Consonants',
      'Vocal Tract Organs of Speech and Articulatory Mechanisms',
      'Stress Patterns: Word Stress, Compound Noun Stress, Shift Rules',
      'Intonation Tunes: Falling, Rising, Fall-Rise, Rise-Fall'
    ],
    recommendedTexts: [
      'English Phonetics and Phonology - Peter Roach',
      'An Introduction to the Pronunciation of English - A. C. Gimson',
      'Better Spoken English for Nigerian Students - David Jowitt'
    ]
  },
  {
    code: 'ENG 112',
    title: 'Introduction to Drama & Theatre',
    level: '100',
    semester: '2nd',
    creditUnits: 2,
    track: 'Literature',
    lecturerInCharge: 'Prof. A. C. Asagba',
    description: 'Study of dramatic conventions, staging, dialogue, conflict, tragic and comedic modes, ritual roots of African indigenous drama vs Western classical theatre.',
    coreTopics: [
      'Origins of Drama: Greek Tragedy to African Indigenous Performance',
      'Dramatic Structure: Exposition, Rising Action, Climax, Denouement',
      'Aristotle’s Poetics: Hamartia, Hubris, Catharsis, Anagnorisis',
      'Text into Performance: Staging, Dialogue, Spectacle'
    ],
    recommendedTexts: [
      'The Lion and the Jewel - Wole Soyinka',
      'Oedipus Rex - Sophocles',
      'The Gods Are Not to Blame - Ola Rotimi'
    ]
  },

  // 200 Level First Semester
  {
    code: 'ENG 201',
    title: 'English Morphology',
    level: '200',
    semester: '1st',
    creditUnits: 2,
    track: 'Language & Linguistics',
    lecturerInCharge: 'Dr. E. O. Okafor',
    description: 'Internal structure of English words, types of morphemes, morphological processes, productivity, and the interface between morphology and phonology/syntax.',
    coreTopics: [
      'Free vs Bound Morphemes, Roots, Stems, and Bases',
      'Inflectional vs Derivational Morphology',
      'Word-Formation Processes: Blending, Clipping, Compounding, Back-Formation',
      'Morphophonemic Alternation and Allomorphic Variation'
    ],
    recommendedTexts: [
      'Morphology - Francis Katamba',
      'An Introduction to English Morphology - Andrew Carstairs-McCarthy'
    ]
  },
  {
    code: 'ENG 211',
    title: 'African Prose Fiction',
    level: '200',
    semester: '1st',
    creditUnits: 3,
    track: 'Literature',
    lecturerInCharge: 'Prof. I. U. Akabogu',
    description: 'In-depth critical analysis of thematic developments, political disenchantment, gender interrogations, and stylistic innovations in the African novel from pioneer to contemporary eras.',
    coreTopics: [
      'First Generation African Writers: Anti-colonialism & Cultural Reassertion',
      'Second Generation: Disillusionment, Corruption, Military Dictatorship',
      'African Female Voice: Buchi Emecheta, Flora Nwapa, Mariama Bâ',
      'Third Generation: Migration, Diasporic Identity, Trauma, Global Africa'
    ],
    recommendedTexts: [
      'Arrow of God - Chinua Achebe',
      'The Joys of Motherhood - Buchi Emecheta',
      'A Grain of Wheat - Ngũgĩ wa Thiong’o',
      'Purple Hibiscus - Chimamanda Ngozi Adichie'
    ]
  },

  // 200 Level Second Semester
  {
    code: 'ENG 202',
    title: 'Introduction to Syntax',
    level: '200',
    semester: '2nd',
    creditUnits: 2,
    track: 'Language & Linguistics',
    lecturerInCharge: 'Dr. F. I. Eze',
    description: 'Principles of structural grammar, Immediate Constituent (IC) analysis, Phrase Structure Grammar, and basic transformational grammar notions.',
    coreTopics: [
      'Constituency Tests: Substitution, Movement, Coordination',
      'Phrase Structure Rules and Tree Diagrams',
      'Structural and Lexical Ambiguities',
      'Deep Structure vs Surface Structure Foundations'
    ],
    recommendedTexts: [
      'Syntactic Theory - Geoffrey Poole',
      'English Syntax: An Introduction - Andrew Radford'
    ]
  },
  {
    code: 'ENG 212',
    title: 'African Drama',
    level: '200',
    semester: '2nd',
    creditUnits: 3,
    track: 'Literature',
    lecturerInCharge: 'Dr. B. O. Chukwuma',
    description: 'Examination of major African playwrights, the idiom of total theatre (dance, masquerade, song, proverbs), political satire, and ideological commitment in post-independence Africa.',
    coreTopics: [
      'Total Theatre in African Drama: Rituals, Music, Chorus',
      'Political Satire and Power Parody in Nigerian Drama',
      'Revolutionary Aesthetics: Femi Osofisan & Ngũgĩ wa Thiong’o',
      'Myth, Metaphysics, and Tragedy in Soyinka’s Dramaturgy'
    ],
    recommendedTexts: [
      'Death and the King’s Horseman - Wole Soyinka',
      'Once Upon Four Robbers - Femi Osofisan',
      'Song of a Goat - J. P. Clark',
      'I Will Marry When I Want - Ngũgĩ wa Thiong’o & Ngũgĩ wa Mīriĩ'
    ]
  },

  // 300 Level First Semester
  {
    code: 'ENG 301',
    title: 'Advanced English Syntax',
    level: '300',
    semester: '1st',
    creditUnits: 3,
    track: 'Language & Linguistics',
    lecturerInCharge: 'Prof. C. N. Okeke',
    description: 'Transformational Generative Grammar (TGG), Government and Binding (GB) theory, X-bar schema, theta roles, case theory, and move-alpha operations.',
    coreTopics: [
      'Evolution of Generative Syntax: Standard Theory to Minimalist Program',
      'X-Bar Theory: Heads, Complements, Specifiers, Adjuncts',
      'Movement Operations: Wh-movement, NP-movement, Head movement',
      'Bounding Theory, Case Theory, and Binding Principles A, B, C'
    ],
    recommendedTexts: [
      'Transformational Grammar: A First Course - Andrew Radford',
      'Lectures on Government and Binding - Noam Chomsky',
      'Syntax: A Generative Introduction - Andrew Carnie'
    ]
  },
  {
    code: 'ENG 313',
    title: 'Literary Theory and Criticism',
    level: '300',
    semester: '1st',
    creditUnits: 3,
    track: 'Literature',
    lecturerInCharge: 'Prof. M. C. Ogwude',
    description: 'Comprehensive study of 20th and 21st-century critical frameworks: Russian Formalism, Structuralism, Marxism, Psychoanalytic theory, Feminism, Poststructuralism, and Postcolonial Theory.',
    coreTopics: [
      'From Classical Criticism to Modern Critical Theory',
      'Marxist Literary Criticism: Base, Superstructure, Ideology',
      'African Feminisms & Womanism (Alice Walker, Chikwenye Ogunyemi)',
      'Postcolonial Theory: Orientalism, Hybridity, Mimicry, Subaltern Studies',
      'Deconstruction and Reader-Response Hermeneutics'
    ],
    recommendedTexts: [
      'Literary Theory: An Introduction - Terry Eagleton',
      'Beginning Theory - Peter Barry',
      'The Empire Writes Back - Ashcroft, Griffiths & Tiffin',
      'Decolonising the Mind - Ngũgĩ wa Thiong’o'
    ]
  },

  // 300 Level Second Semester
  {
    code: 'ENG 303',
    title: 'Semantics and Pragmatics',
    level: '300',
    semester: '2nd',
    creditUnits: 3,
    track: 'Language & Linguistics',
    lecturerInCharge: 'Dr. O. J. Anyaegbu',
    description: 'Study of linguistic meaning, sense relations, propositional logic, speech acts, conversational implicature, presupposition, deixis, and politeness theory.',
    coreTopics: [
      'Sense and Reference, Synonymy, Antonymy, Hyponymy, Polysemy',
      'Truth Conditions and Semantic Componential Analysis',
      'Austin and Searle’s Speech Act Theory: Locution, Illocution, Perlocution',
      'Gricean Cooperative Principle and Conversational Maxims',
      'Deictic Systems and Brown & Levinson’s Politeness Theory'
    ],
    recommendedTexts: [
      'Semantics - John I. Saeed',
      'Pragmatics - Stephen C. Levinson',
      'Meaning in Language - Alan Cruse'
    ]
  },
  {
    code: 'ENG 322',
    title: 'Nigerian Literature',
    level: '300',
    semester: '2nd',
    creditUnits: 3,
    track: 'Literature',
    lecturerInCharge: 'Dr. (Mrs) N. A. Nwabueze',
    description: 'Critical investigation of the history, politics, linguistic experimentation, and socio-cultural contours of Nigerian literature across poetry, drama, and prose from pre-colonial oral epics to 21st-century writing.',
    coreTopics: [
      'Oral Traditions, Indigenous Epics and Early Market Literature (Onitsha Market Pamphlets)',
      'The Ibadan/Nsukka Renaissance (Achebe, Soyinka, Clark, Okigbo)',
      'Civil War (Biafran) Literature: Trauma, Memory, and Testimony',
      'Contemporary Nigerian Writers: Adichie, Habila, Sefi Atta, Chigozie Obioma'
    ],
    recommendedTexts: [
      'Half of a Yellow Sun - Chimamanda Ngozi Adichie',
      'Sunset in Biafra - Elechi Amadi',
      'Everything Good Will Come - Sefi Atta',
      'The Fishermen - Chigozie Obioma'
    ]
  },

  // 400 Level First Semester
  {
    code: 'ENG 402',
    title: 'Discourse Analysis and Stylistics',
    level: '400',
    semester: '1st',
    creditUnits: 3,
    track: 'Language & Linguistics',
    lecturerInCharge: 'Prof. C. N. Okeke',
    description: 'Linguistic approaches to literary and non-literary texts. Cohesion and coherence, systemic functional grammar (SFG), foregrounding, deviation, parallelism, and critical discourse analysis (CDA).',
    coreTopics: [
      'Linguistic vs Literary Stylistics: Definitions, Scope, Goals',
      'Halliday and Hasan’s Cohesive Devices (Reference, Substitution, Ellipsis, Conjunction, Lexical)',
      'Foregrounding Theory: Defamiliarization, Internal/External Deviation, Parallelism',
      'Critical Discourse Analysis (Fairclough, Van Dijk): Power, Ideology, Language',
      'Stylistic Analysis of Poetry, Prose Passages, and Political Oratory'
    ],
    recommendedTexts: [
      'Style in Fiction - Geoffrey Leech & Mick Short',
      'Cohesion in English - M. A. K. Halliday & Ruqaiya Hasan',
      'Stylistics: A Resource Book for Students - Paul Simpson'
    ]
  },
  {
    code: 'ENG 411',
    title: 'Modern and Postmodern Literature',
    level: '400',
    semester: '1st',
    creditUnits: 3,
    track: 'Literature',
    lecturerInCharge: 'Prof. M. C. Ogwude',
    description: 'Survey of 20th-century modernist crisis of faith, alienation, stream of consciousness, and postmodern fragmentation, metafiction, pastiche, and magic realism.',
    coreTopics: [
      'The Modernist Break: Symbolism, Stream of Consciousness, Epiphany',
      'Post-War Alienation and Existentialist Disillusionment',
      'Postmodern Aesthetics: Pastiche, Irony, Intertextuality, Historiographic Metafiction',
      'Comparative Reading: European Modernism and African Modernist Responses'
    ],
    recommendedTexts: [
      'The Waste Land - T. S. Eliot',
      'Mrs. Dalloway - Virginia Woolf',
      'Midnight’s Children - Salman Rushdie',
      'Season of Migration to the North - Tayeb Salih'
    ]
  },

  // 400 Level Second Semester
  {
    code: 'ENG 490',
    title: 'B.A. Long Essay / Research Project',
    level: '400',
    semester: '2nd',
    creditUnits: 6,
    track: 'General/Combined',
    lecturerInCharge: 'Departmental Research Committee',
    description: 'Independent supervised research project culminating in a bound dissertation of between 10,000 and 15,000 words on an approved topic in English Language/Linguistics or Literature.',
    coreTopics: [
      'Formulating Research Problems, Hypotheses, and Research Questions',
      'Theoretical Framework and Literature Review Synthesis',
      'Data Collection & Analytical Methodologies (Textual/Corpus/Fieldwork)',
      'MLA Handbook 9th Edition Documentation & Referencing Style',
      'Academic Writing Ethics, Avoiding Plagiarism, and Oral Defense Preparation'
    ],
    recommendedTexts: [
      'MLA Handbook (9th Edition) - Modern Language Association',
      'Research Methods in English Studies - Gabriele Griffin',
      'Writing the Research Paper in English Studies - NASELS UNIZIK Editorial Board'
    ]
  }
];
