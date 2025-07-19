const grammar = {
    errors: [
        {
            title: "Subject-Verb Agreement",
            description: "The subject and verb must agree in number (singular/plural).",
            incorrect: "She *go* to school.",
            correct: "She *goes* to school.",
            examples: [
                "Incorrect: They *is* happy. Correct: They *are* happy.",
                "Incorrect: The dog *run* fast. Correct: The dog *runs* fast.",
                "Incorrect: We *goes* to the park. Correct: We *go* to the park."
            ],
            tests: ["IELTS", "TOEFL", "KET", "PET"]
        },
        {
            title: "Article Usage (a/an/the)",
            description: "Use 'a' or 'an' for singular countable nouns; 'the' for specific nouns.",
            incorrect: "I saw *elephant* in zoo.",
            correct: "I saw *an elephant* in *the zoo*.",
            examples: [
                "Incorrect: She is *teacher*. Correct: She is *a teacher*.",
                "Incorrect: I want *apple*. Correct: I want *an apple*.",
                "Incorrect: Book on table is mine. Correct: *The book* on *the table* is mine."
            ],
            tests: ["IELTS", "TOEFL", "KET", "PET"]
        },
        {
            title: "Preposition Errors",
            description: "Common mistakes include using wrong prepositions (e.g., in/on/at).",
            incorrect: "I live *at* London.",
            correct: "I live *in* London.",
            examples: [
                "Incorrect: I go *in* school. Correct: I go *to* school.",
                "Incorrect: She arrives *on* Monday. Correct: She arrives *on* Monday.",
                "Incorrect: He is *on* the meeting. Correct: He is *at* the meeting."
            ],
            tests: ["IELTS", "TOEFL", "KET", "PET"]
        },
        {
            title: "Pronoun Reference",
            description: "Pronouns must clearly refer to a specific noun.",
            incorrect: "John and Mike went to the park, and *he* played football.",
            correct: "John played football.",
            examples: [
                "Incorrect: The book and the pen are on the table, and *it* is red. Correct: The book is red.",
                "Incorrect: Mary and I studied, and *she* passed. Correct: I passed.",
                "Incorrect: The team won, and *he* celebrated. Correct: They celebrated."
            ],
            tests: ["IELTS", "TOEFL", "PET"]
        },
        {
            title: "Word Order in Questions",
            description: "Use correct word order in questions (auxiliary + subject + verb).",
            incorrect: "*What you are doing?*",
            correct: "*What are you doing?*",
            examples: [
                "Incorrect: *Where you live?* Correct: *Where do you live?*",
                "Incorrect: *Why she is late?* Correct: *Why is she late?*",
                "Incorrect: *When they arrive?* Correct: *When do they arrive?*"
            ],
            tests: ["KET", "PET"]
        }
    ],
    exercises: [
        {
            type: "fill-in-the-blank",
            question: "She ___ (go) to the park every Sunday.",
            answer: "goes",
            hint: "Use Present Simple for routines.",
            tests: ["IELTS", "TOEFL", "KET", "PET"]
        },
        {
            type: "fill-in-the-blank",
            question: "I ___ (visit) my grandparents last weekend.",
            answer: "visited",
            hint: "Use Past Simple for completed actions.",
            tests: ["IELTS", "TOEFL", "KET", "PET"]
        },
        {
            type: "fill-in-the-blank",
            question: "They ___ (just/finish) their homework.",
            answer: "have just finished",
            hint: "Use Present Perfect for recent actions.",
            tests: ["IELTS", "TOEFL", "PET"]
        },
        {
            type: "sentence-correction",
            question: "Incorrect: He go to school. Correct it.",
            answer: "He goes to school.",
            hint: "Check subject-verb agreement.",
            tests: ["IELTS", "TOEFL", "KET", "PET"]
        },
        {
            type: "sentence-correction",
            question: "Incorrect: I live at New York. Correct it.",
            answer: "I live in New York.",
            hint: "Check the preposition.",
            tests: ["IELTS", "TOEFL", "KET", "PET"]
        },
        {
            type: "fill-in-the-blank",
            question: "We ___ (travel) to Spain next summer.",
            answer: "will travel",
            hint: "Use Future Simple for plans.",
            tests: ["IELTS", "TOEFL", "PET"]
        },
        {
            type: "fill-in-the-blank",
            question: "She ___ (study) English right now.",
            answer: "is studying",
            hint: "Use Present Continuous for actions happening now.",
            tests: ["KET", "PET"]
        },
        {
            type: "sentence-correction",
            question: "Incorrect: What you are doing? Correct it.",
            answer: "What are you doing?",
            hint: "Check word order in questions.",
            tests: ["KET", "PET"]
        },
        {
            type: "fill-in-the-blank",
            question: "I ___ (see) that movie three times.",
            answer: "have seen",
            hint: "Use Present Perfect for experiences.",
            tests: ["IELTS", "TOEFL", "PET"]
        },
        {
            type: "sentence-correction",
            question: "Incorrect: I saw elephant in zoo. Correct it.",
            answer: "I saw an elephant in the zoo.",
            hint: "Check article usage.",
            tests: ["IELTS", "TOEFL", "KET", "PET"]
        }
    ]
};