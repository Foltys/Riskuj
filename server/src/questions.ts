interface Question {
  id: number;
  text: string;
  answer: string;
  points: number;
}

interface Category {
  id: number;
  name: string;
  questions: Question[];
}

const categories: Category[] = [
  {
    id: 1,
    name: "History",
    questions: [
      {
        id: 1,
        text: "Who was the first president of the United States?",
        answer: "George Washington",
        points: 100,
      },
      {
        id: 2,
        text: "In which year did World War II end?",
        answer: "1945",
        points: 200,
      },
      {
        id: 3,
        text: "What was the name of the first human to walk on the moon?",
        answer: "Neil Armstrong",
        points: 300,
      },
      {
        id: 4,
        text: "Which ancient civilization built the pyramids?",
        answer: "Egyptians",
        points: 400,
      },
      {
        id: 5,
        text: "What was the capital of the Roman Empire?",
        answer: "Rome",
        points: 500,
      },
      {
        id: 6,
        text: "Who wrote the Declaration of Independence?",
        answer: "Thomas Jefferson",
        points: 600,
      },
    ],
  },
  {
    id: 2,
    name: "Science",
    questions: [
      {
        id: 1,
        text: "What is the chemical symbol for gold?",
        answer: "Au",
        points: 100,
      },
      {
        id: 2,
        text: "What planet is known as the Red Planet?",
        answer: "Mars",
        points: 200,
      },
      {
        id: 3,
        text: "What is the largest organ in the human body?",
        answer: "Skin",
        points: 300,
      },
      {
        id: 4,
        text: "What force keeps planets in orbit around the sun?",
        answer: "Gravity",
        points: 400,
      },
      {
        id: 5,
        text: "What is the process by which plants make their own food?",
        answer: "Photosynthesis",
        points: 500,
      },
      {
        id: 6,
        text: "What is the speed of light in a vacuum?",
        answer: "299,792,458 meters per second",
        points: 600,
      },
    ],
  },
  {
    id: 3,
    name: "Geography",
    questions: [
      {
        id: 1,
        text: "What is the largest ocean on Earth?",
        answer: "Pacific Ocean",
        points: 100,
      },
      {
        id: 2,
        text: "Which country has the most time zones?",
        answer: "France",
        points: 200,
      },
      {
        id: 3,
        text: "What is the capital of Australia?",
        answer: "Canberra",
        points: 300,
      },
      {
        id: 4,
        text: "Which river is the longest in the world?",
        answer: "Nile",
        points: 400,
      },
      {
        id: 5,
        text: "What is the largest desert in the world?",
        answer: "Sahara",
        points: 500,
      },
      {
        id: 6,
        text: "Which country is both an island and a continent?",
        answer: "Australia",
        points: 600,
      },
    ],
  },
  {
    id: 4,
    name: "Literature",
    questions: [
      {
        id: 1,
        text: "Who wrote 'Romeo and Juliet'?",
        answer: "William Shakespeare",
        points: 100,
      },
      {
        id: 2,
        text: "What is the name of the wizard in 'The Lord of the Rings'?",
        answer: "Gandalf",
        points: 200,
      },
      {
        id: 3,
        text: "Who wrote 'Pride and Prejudice'?",
        answer: "Jane Austen",
        points: 300,
      },
      {
        id: 4,
        text: "What is the name of Harry Potter's owl?",
        answer: "Hedwig",
        points: 400,
      },
      {
        id: 5,
        text: "Who wrote 'The Great Gatsby'?",
        answer: "F. Scott Fitzgerald",
        points: 500,
      },
      {
        id: 6,
        text: "What is the name of the main character in 'Moby Dick'?",
        answer: "Ishmael",
        points: 600,
      },
    ],
  },
  {
    id: 5,
    name: "Movies",
    questions: [
      {
        id: 1,
        text: "Who played Jack in 'Titanic'?",
        answer: "Leonardo DiCaprio",
        points: 100,
      },
      {
        id: 2,
        text: "What is the name of the main character in 'The Matrix'?",
        answer: "Neo",
        points: 200,
      },
      {
        id: 3,
        text: "Who directed 'The Godfather'?",
        answer: "Francis Ford Coppola",
        points: 300,
      },
      {
        id: 4,
        text: "What is the name of the main character in 'Forrest Gump'?",
        answer: "Forrest Gump",
        points: 400,
      },
      {
        id: 5,
        text: "Who played the Joker in 'The Dark Knight'?",
        answer: "Heath Ledger",
        points: 500,
      },
      {
        id: 6,
        text: "What is the name of the main character in 'The Shawshank Redemption'?",
        answer: "Andy Dufresne",
        points: 600,
      },
    ],
  },
  {
    id: 6,
    name: "Music",
    questions: [
      {
        id: 1,
        text: "Who is known as the 'King of Pop'?",
        answer: "Michael Jackson",
        points: 100,
      },
      {
        id: 2,
        text: "What is the name of the Beatles' drummer?",
        answer: "Ringo Starr",
        points: 200,
      },
      {
        id: 3,
        text: "Who wrote 'Bohemian Rhapsody'?",
        answer: "Queen",
        points: 300,
      },
      {
        id: 4,
        text: "What is the name of the main character in 'The Phantom of the Opera'?",
        answer: "Erik",
        points: 400,
      },
      {
        id: 5,
        text: "Who is known as the 'Queen of Soul'?",
        answer: "Aretha Franklin",
        points: 500,
      },
      {
        id: 6,
        text: "What is the name of the main character in 'The Phantom of the Opera'?",
        answer: "Erik",
        points: 600,
      },
    ],
  },
  {
    id: 7,
    name: "Sports",
    questions: [
      {
        id: 1,
        text: "What is the most popular sport in the world?",
        answer: "Soccer",
        points: 100,
      },
      {
        id: 2,
        text: "How many players are on a basketball team?",
        answer: "5",
        points: 200,
      },
      {
        id: 3,
        text: "What is the name of the most famous tennis tournament?",
        answer: "Wimbledon",
        points: 300,
      },
      {
        id: 4,
        text: "What is the name of the most famous golf tournament?",
        answer: "The Masters",
        points: 400,
      },
      {
        id: 5,
        text: "What is the name of the most famous baseball tournament?",
        answer: "World Series",
        points: 500,
      },
      {
        id: 6,
        text: "What is the name of the most famous football tournament?",
        answer: "Super Bowl",
        points: 600,
      },
    ],
  },
  {
    id: 8,
    name: "Technology",
    questions: [
      {
        id: 1,
        text: "What is the name of the first computer?",
        answer: "ENIAC",
        points: 100,
      },
      {
        id: 2,
        text: "What is the name of the first programming language?",
        answer: "FORTRAN",
        points: 200,
      },
      {
        id: 3,
        text: "What is the name of the first web browser?",
        answer: "WorldWideWeb",
        points: 300,
      },
      {
        id: 4,
        text: "What is the name of the first search engine?",
        answer: "Archie",
        points: 400,
      },
      {
        id: 5,
        text: "What is the name of the first social media platform?",
        answer: "Six Degrees",
        points: 500,
      },
      {
        id: 6,
        text: "What is the name of the first video game?",
        answer: "Pong",
        points: 600,
      },
    ],
  },
  {
    id: 9,
    name: "Food",
    questions: [
      {
        id: 1,
        text: "What is the most popular food in the world?",
        answer: "Rice",
        points: 100,
      },
      {
        id: 2,
        text: "What is the most popular drink in the world?",
        answer: "Water",
        points: 200,
      },
      {
        id: 3,
        text: "What is the most popular fruit in the world?",
        answer: "Tomato",
        points: 300,
      },
      {
        id: 4,
        text: "What is the most popular vegetable in the world?",
        answer: "Potato",
        points: 400,
      },
      {
        id: 5,
        text: "What is the most popular meat in the world?",
        answer: "Chicken",
        points: 500,
      },
      {
        id: 6,
        text: "What is the most popular dessert in the world?",
        answer: "Ice Cream",
        points: 600,
      },
    ],
  },
  {
    id: 10,
    name: "Animals",
    questions: [
      {
        id: 1,
        text: "What is the largest animal in the world?",
        answer: "Blue Whale",
        points: 100,
      },
      {
        id: 2,
        text: "What is the fastest animal in the world?",
        answer: "Cheetah",
        points: 200,
      },
      {
        id: 3,
        text: "What is the tallest animal in the world?",
        answer: "Giraffe",
        points: 300,
      },
      {
        id: 4,
        text: "What is the smallest animal in the world?",
        answer: "Bumblebee Bat",
        points: 400,
      },
      {
        id: 5,
        text: "What is the most dangerous animal in the world?",
        answer: "Mosquito",
        points: 500,
      },
      {
        id: 6,
        text: "What is the most intelligent animal in the world?",
        answer: "Dolphin",
        points: 600,
      },
    ],
  },
  {
    id: 11,
    name: "Art",
    questions: [
      {
        id: 1,
        text: "Who painted the Mona Lisa?",
        answer: "Leonardo da Vinci",
        points: 100,
      },
      {
        id: 2,
        text: "Who painted the Starry Night?",
        answer: "Vincent van Gogh",
        points: 200,
      },
      {
        id: 3,
        text: "Who painted the Last Supper?",
        answer: "Leonardo da Vinci",
        points: 300,
      },
      {
        id: 4,
        text: "Who painted the Sistine Chapel?",
        answer: "Michelangelo",
        points: 400,
      },
      {
        id: 5,
        text: "Who painted the Girl with a Pearl Earring?",
        answer: "Johannes Vermeer",
        points: 500,
      },
      {
        id: 6,
        text: "Who painted the Scream?",
        answer: "Edvard Munch",
        points: 600,
      },
    ],
  },
  {
    id: 12,
    name: "Politics",
    questions: [
      {
        id: 1,
        text: "Who is the current president of the United States?",
        answer: "Joe Biden",
        points: 100,
      },
      {
        id: 2,
        text: "Who is the current prime minister of the United Kingdom?",
        answer: "Rishi Sunak",
        points: 200,
      },
      {
        id: 3,
        text: "Who is the current president of France?",
        answer: "Emmanuel Macron",
        points: 300,
      },
      {
        id: 4,
        text: "Who is the current chancellor of Germany?",
        answer: "Olaf Scholz",
        points: 400,
      },
      {
        id: 5,
        text: "Who is the current prime minister of Canada?",
        answer: "Justin Trudeau",
        points: 500,
      },
      {
        id: 6,
        text: "Who is the current president of Russia?",
        answer: "Vladimir Putin",
        points: 600,
      },
    ],
  },
];

export { categories, type Category, type Question };
