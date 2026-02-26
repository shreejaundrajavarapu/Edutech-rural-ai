export const SUBJECTS_DATA = [
    {
        id: 'math',
        name: 'Mathematics',
        icon: 'Calculator',
        color: 'blue',
        description: 'Explore numbers, geometry, and logic.',
        realContent: true,
        chapters: [
            { id: 'm1', title: 'Integers', completed: false, xp: 50 },
            { id: 'm2', title: 'Fractions and Decimals', completed: false, xp: 60 },
            { id: 'm3', title: 'Simple Equations', completed: false, xp: 70 },
            { id: 'm4', title: 'Lines and Angles', completed: false, xp: 80 },
        ],
        quiz: [
            { question: 'What is 15 + 27?', options: ['32', '42', '52', '44'], correct: 1 },
            { question: 'What is the square root of 64?', options: ['6', '7', '8', '9'], correct: 2 }
        ]
    },
    {
        id: 'english',
        name: 'English',
        icon: 'BookOpen',
        color: 'green',
        description: 'Master grammar, literature, and communication.',
        realContent: false,
        chapters: [
            { id: 'e1', title: 'Nouns and Pronouns', completed: false, xp: 40 },
            { id: 'e2', title: 'Verbs and Tenses', completed: false, xp: 50 },
            { id: 'e3', title: 'Adjectives and Adverbs', completed: false, xp: 50 },
        ],
        quiz: [
            { question: 'Which is a noun?', options: ['Run', 'Happy', 'Apple', 'Quickly'], correct: 2 },
            { question: 'Past tense of "go" is?', options: ['Gone', 'Went', 'Goes', 'Going'], correct: 1 }
        ]
    },
    {
        id: 'science',
        name: 'Science',
        icon: 'Beaker',
        color: 'purple',
        description: 'Understand the world through biology, physics, and chemistry.',
        realContent: false,
        chapters: [
            { id: 's1', title: 'Nutrition in Plants', completed: false, xp: 55 },
            { id: 's2', title: 'Heat and Temperature', completed: false, xp: 65 },
            { id: 's3', title: 'Acids, Bases and Salts', completed: false, xp: 75 },
        ],
        quiz: [
            { question: 'Water boils at what temperature?', options: ['90°C', '100°C', '110°C', '0°C'], correct: 1 },
            { question: 'Which gas do plants absorb?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correct: 2 }
        ]
    }
];

export const DOUBTS_QA = [
    { q: 'How to use this app?', a: 'You can select a subject, read notes, watch videos, and take quizzes to earn XP!' },
    { q: 'Can I study offline?', a: 'Yes! The app is designed to work offline. Download notes and videos to access them anytime.' },
    { q: 'What are XP points?', a: 'XP points are Experience Points you earn by completing chapters and scoring well in quizzes.' },
    { q: 'How to see my progress?', a: 'Go to your Dashboard or Profile to view your overall and subject-wise progress.' }
];
