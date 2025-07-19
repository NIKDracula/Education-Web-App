const questions = {
    ielts: {
        beginner: [
            { text: "Tell me about your hometown.", category: "Personal" },
            { text: "What do you like to do in your free time?", category: "Daily Life" },
            { text: "Describe your favorite food or meal.", category: "Description" },
            { text: "What is your favorite place to visit?", category: "Description" },
            { text: "Talk about a hobby you enjoy.", category: "Personal" },
            { text: "What do you usually do on weekends?", category: "Daily Life" },
            { text: "Describe a park or garden you like.", category: "Description" },
            { text: "What kind of music do you listen to?", category: "Personal" },
            { text: "Tell me about your family.", category: "Personal" },
            { text: "What is your favorite season and why?", category: "Opinion" }
 ],
        intermediate: [
            { text: "Describe a memorable holiday you went on.", category: "Past Experience" },
            { text: "What is your opinion on using public transportation?", category: "Opinion" },
            { text: "Talk about a book or movie you recently enjoyed.", category: "Description" },
            { text: "Describe a person who has influenced you.", category: "Personal" },
            { text: "Do you think technology makes life better? Why?", category: "Opinion" },
            { text: "Talk about a tradition in your country.", category: "Culture" },
            { text: "Describe a place you would like to visit in the future.", category: "Description" },
            { text: "What do you think about studying abroad?", category: "Opinion" },
            { text: "Talk about a time you helped someone.", category: "Past Experience" },
            { text: "Describe your dream job.", category: "Personal" }
        ],
        advanced: [
            { text: "Should governments invest more in education or healthcare? Why?", category: "Opinion" },
            { text: "Describe a situation where you faced a challenge and how you overcame it.", category: "Problem-Solving" },
            { text: "What are the advantages and disadvantages of globalization?", category: "Opinion" },
            { text: "Talk about a cultural event you attended.", category: "Past Experience" },
            { text: "Should people be encouraged to live in cities or rural areas? Why?", category: "Opinion" },
            { text: "Describe a piece of art or music that inspires you.", category: "Description" },
            { text: "What role does social media play in modern society?", category: "Opinion" },
            { text: "Talk about a time when you learned something new.", category: "Past Experience" },
            { text: "How can governments encourage environmental protection?", category: "Problem-Solving" },
            { text: "Describe a leader you admire and why.", category: "Description" }
        ]
    },
    toefl: {
        beginner: [
            { text: "Talk about a hobby you enjoy and why you like it.", category: "Personal" },
            { text: "Describe your favorite place in your city.", category: "Description" },
            { text: "What do you usually do after school or work?", category: "Daily Life" },
            { text: "Tell me about a friend you have.", category: "Personal" },
            { text: "What is your favorite type of food?", category: "Description" },
            { text: "Do you like to travel? Why or why not?", category: "Opinion" },
            { text: "Describe a movie you watched recently.", category: "Description" },
            { text: "What do you do to relax?", category: "Daily Life" },
            { text: "Tell me about your favorite holiday.", category: "Personal" },
            { text: "What is your favorite subject to study?", category: "Personal" }
        ],
        intermediate: [
            { text: "Describe an important tradition in your culture.", category: "Culture" },
            { text: "Do you prefer living in a city or a small town? Why?", category: "Opinion" },
            { text: "Talk about a memorable trip you took.", category: "Past Experience" },
            { text: "What is your opinion on learning new languages?", category: "Opinion" },
            { text: "Describe a favorite book you have read.", category: "Description" },
            { text: "Talk about a time you worked with others.", category: "Past Experience" },
            { text: "Do you think sports are important for young people? Why?", category: "Opinion" },
            { text: "Describe a place you enjoy visiting.", category: "Description" },
            { text: "What do you think about online education?", category: "Opinion" },
            { text: "Talk about a family member you admire.", category: "Personal" }
        ],
        advanced: [
            { text: "Should students be required to learn a second language? Why or why not?", category: "Opinion" },
            { text: "Describe a time when you helped someone and how it felt.", category: "Past Experience" },
            { text: "What are the benefits and drawbacks of working from home?", category: "Opinion" },
            { text: "Talk about a current issue in your country.", category: "Culture" },
            { text: "Should governments prioritize economic growth or environmental protection? Why?", category: "Opinion" },
            { text: "Describe an invention that has changed the world.", category: "Description" },
            { text: "What is the role of art in education?", category: "Opinion" },
            { text: "Talk about a time you faced a difficult decision.", category: "Past Experience" },
            { text: "How can technology improve education?", category: "Problem-Solving" },
            { text: "Describe a historical event you find interesting.", category: "Description" }
        ]
    },
    ket: {
        beginner: [
            { text: "Tell me about your family.", category: "Personal" },
            { text: "What do you like to do after school?", category: "Daily Life" },
            { text: "Describe your favorite animal.", category: "Description" },
            { text: "What is your favorite food?", category: "Description" },
            { text: "Do you like to play sports? Why?", category: "Opinion" },
            { text: "Talk about your school.", category: "Personal" },
            { text: "What do you do on weekends?", category: "Daily Life" },
            { text: "Describe your house or apartment.", category: "Description" },
            { text: "What is your favorite color and why?", category: "Personal" },
            { text: "Tell me about your best friend.", category: "Personal" }
        ],
        intermediate: [
            { text: "Describe a place you like to visit.", category: "Description" },
            { text: "What is your favorite season? Why?", category: "Opinion" },
            { text: "Talk about a holiday you enjoyed.", category: "Past Experience" },
            { text: "Do you prefer watching TV or reading books? Why?", category: "Opinion" },
            { text: "Describe a shop in your town.", category: "Description" },
            { text: "What do you want to do in the future?", category: "Personal" },
            { text: "Talk about a time you went shopping.", category: "Past Experience" },
            { text: "Do you think pets are important? Why?", category: "Opinion" },
            { text: "Describe your favorite movie.", category: "Description" },
            { text: "What do you like to eat for breakfast?", category: "Daily Life" }
        ]
    },
    pet: {
        beginner: [
            { text: "Describe your best friend.", category: "Personal" },
            { text: "What do you do to stay healthy?", category: "Daily Life" },
            { text: "Tell me about your favorite hobby.", category: "Personal" },
            { text: "What is your favorite place in your town?", category: "Description" },
            { text: "Do you like to travel? Why?", category: "Opinion" },
            { text: "Describe your school or workplace.", category: "Description" },
            { text: "What do you do after school or work?", category: "Daily Life" },
            { text: "Tell me about a pet you have or want.", category: "Personal" },
            { text: "What is your favorite type of music?", category: "Personal" },
            { text: "Describe your favorite day of the week.", category: "Description" }
        ],
        intermediate: [
            { text: "Talk about a place you would like to visit.", category: "Description" },
            { text: "Do you think sports are important? Why?", category: "Opinion" },
            { text: "Describe a memorable day you had.", category: "Past Experience" },
            { text: "What is your opinion on using mobile phones a lot?", category: "Opinion" },
            { text: "Talk about a festival in your country.", category: "Culture" },
            { text: "Describe a book you have read.", category: "Description" },
            { text: "What do you think about learning English?", category: "Opinion" },
            { text: "Talk about a time you helped a friend.", category: "Past Experience" },
            { text: "Describe a park or garden you like.", category: "Description" },
            { text: "What job would you like to have in the future?", category: "Personal" }
        ]
    }
};