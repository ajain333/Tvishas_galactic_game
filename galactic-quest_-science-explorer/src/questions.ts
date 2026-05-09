/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type QuestionType = 'YES_NO' | 'MULTIPLE_CHOICE';

export interface Question {
  id: string;
  type: QuestionType;
  category: 'What' | 'Where' | 'Why' | 'How' | 'Which' | 'Yes/No';
  question: string;
  options: string[];
  correctAnswer: string;
  image: string;
  animationType: string;
  explanation: string;
}

export const questions: Question[] = [
  {
    id: '1',
    type: 'YES_NO',
    category: 'Yes/No',
    animationType: 'gas-planet',
    question: "Are all planets made from rocks?",
    options: ["Yes", "No"],
    correctAnswer: "No",
    image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?q=80&w=600",
    explanation: "No. The 4 outer planets in our solar system are made of gas."
  },
  {
    id: '2',
    type: 'MULTIPLE_CHOICE',
    category: 'Which',
    animationType: 'orbit-venus',
    question: "Which planet is nearest to Earth?",
    options: ["Pluto", "Mercury", "Sun", "Venus"],
    correctAnswer: "Venus",
    image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bac4?q=80&w=600",
    explanation: "Venus is to hot to live on so astronauts are planning to visit Mars, the second closet planet."
  },
  {
    id: '3',
    type: 'MULTIPLE_CHOICE',
    category: 'How',
    animationType: 'capsule-descent',
    question: "How do astronauts get back to Earth?",
    options: ["Space Capsule", "Rocket", "Falling", "Teleporting"],
    correctAnswer: "Space Capsule",
    image: "https://images.unsplash.com/photo-1446776858070-70c3d5ed68a8?q=80&w=600",
    explanation: "In a small capsule parachutes open to ensure a safe landing."
  },
  {
    id: '4',
    type: 'MULTIPLE_CHOICE',
    category: 'What',
    animationType: 'star-fire',
    question: "What are stars made of?",
    options: ["Fire", "Wishes", "Bits of the Sun", "Hot Gas"],
    correctAnswer: "Hot Gas",
    image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?q=80&w=600",
    explanation: "Incredibly hot, exploding gases that shine as the burn."
  },
  {
    id: '5',
    type: 'MULTIPLE_CHOICE',
    category: 'What',
    animationType: 'galaxy-swirl',
    question: "What is a galaxy made out of?",
    options: ["Clouds", "Black Holes", "Dark Matter", "Milk"],
    correctAnswer: "Dark Matter",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=600",
    explanation: "Galaxies come in different shapes spiral, irregular, elliptical, lenticular."
  },
  {
    id: '6',
    type: 'MULTIPLE_CHOICE',
    category: 'Which',
    animationType: 'bird-stars',
    question: "Which animals use the moon and the stars to navigate?",
    options: ["Cats", "Pigs", "Songbirds", "Bears"],
    correctAnswer: "Songbirds",
    image: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600",
    explanation: "Some songbirds use the starry night sky as a map."
  },
  {
    id: '7',
    type: 'MULTIPLE_CHOICE',
    category: 'How',
    animationType: 'moon-footprint',
    question: "How many people have been to the moon?",
    options: ["12", "3", "10", "80"],
    correctAnswer: "12",
    image: "https://images.unsplash.com/photo-1522030239044-1293380c102c?q=80&w=600",
    explanation: "Nobody has been to the moon since 1972 - that's over 40 years ago!"
  },
  {
    id: '8',
    type: 'MULTIPLE_CHOICE',
    category: 'Which',
    animationType: 'hot-blue-star',
    question: "Which stars are the hottest?",
    options: ["Yellow", "Blue", "Red", "Green"],
    correctAnswer: "Blue",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?q=80&w=600",
    explanation: "Yellow are the next hottest, then red and green doesn't exist."
  },
  {
    id: '9',
    type: 'MULTIPLE_CHOICE',
    category: 'How',
    animationType: 'rocket-launch',
    question: "How long does it take you to get into space?",
    options: ["5 seconds", "10 days", "3 hours", "Less than 10 mins"],
    correctAnswer: "Less than 10 mins",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=600",
    explanation: "Only a small spacecraft needs to go. The rest is called debris. It is space junk."
  },
  {
    id: '10',
    type: 'YES_NO',
    category: 'Yes/No',
    animationType: 'infinite-space',
    question: "Does space go on forever?",
    options: ["Yes", "Maybe"],
    correctAnswer: "Maybe",
    image: "https://images.unsplash.com/photo-1475275083424-b4ff81625b60?q=80&w=600",
    explanation: "Some scientists think it does. We might never know."
  },
  {
    id: '11',
    type: 'YES_NO',
    category: 'Yes/No',
    animationType: 'phone-signal',
    question: "Can an astronaut phone home from space?",
    options: ["Yes", "No"],
    correctAnswer: "Yes",
    image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=600",
    explanation: "They can speak to anyone through a phone hooked up to a computer."
  },
  {
    id: '12',
    type: 'MULTIPLE_CHOICE',
    category: 'What',
    animationType: 'cosmonaut',
    question: "What is a cosmonaut?",
    options: ["A dead astronaut", "An ex-astronaut", "A Russian astronaut", "A training astronaut"],
    correctAnswer: "A Russian astronaut",
    image: "https://images.unsplash.com/photo-1551187470-dc89304e76a6?q=80&w=600",
    explanation: "'Astronaut' means sailor of the stars and 'Cosmonaut' means sailor of the universe."
  },
  {
    id: '13',
    type: 'MULTIPLE_CHOICE',
    category: 'Why',
    animationType: 'sun-gravity',
    question: "Why does Earth move around the sun?",
    options: ["Mercury", "The Sun's gravity", "The Sun's Light", "Earth's movement"],
    correctAnswer: "The Sun's gravity",
    image: "https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=600",
    explanation: "The sun is the heaviest object in our solar system. It pulls on planets and makes them move around, or orbit the sun."
  },
  {
    id: '14',
    type: 'MULTIPLE_CHOICE',
    category: 'Where',
    animationType: 'school-degree',
    question: "Where do astronauts go to school?",
    options: ["They don't go", "Normal school", "Special school", "Home taught"],
    correctAnswer: "Normal school",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600",
    explanation: "They go to normal schools, get a degree for Mathematics, Science or engineering at uni. Then they do Special training."
  },
  {
    id: '15',
    type: 'MULTIPLE_CHOICE',
    category: 'Why',
    animationType: 'sun-light',
    question: "Why can't you see stars in the daytime?",
    options: ["Sun's light blocks them", "They go to other side", "They disappear", "They go above Earth"],
    correctAnswer: "Sun's light blocks them",
    image: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?q=80&w=600",
    explanation: "In the daytime, Sunlight scatters in the Earth's atmosphere. It makes the sky look blue and blocks out the stars."
  },
  {
    id: '16',
    type: 'MULTIPLE_CHOICE',
    category: 'Where',
    animationType: 'space-station',
    question: "Where is the furthest astronauts have been to?",
    options: ["The Sun", "Mars", "Venus", "The Moon"],
    correctAnswer: "The Moon",
    image: "https://images.unsplash.com/photo-1446944618400-342da93685f4?q=80&w=600",
    explanation: "Astronauts live in a floating home called 'a space station'."
  },
  {
    id: '17',
    type: 'MULTIPLE_CHOICE',
    category: 'Why',
    animationType: 'moon-phase-shift',
    question: "Why does the moon change shape?",
    options: ["It's far away", "Weather", "Earth's gravity", "It doesn't actually change"],
    correctAnswer: "It doesn't actually change",
    image: "https://images.unsplash.com/photo-1528193850893-976ccce2261b?q=80&w=600",
    explanation: "Each month, the part we see changes shape because of the way it's lit up by the sun."
  },
  {
    id: '18',
    type: 'MULTIPLE_CHOICE',
    category: 'Where',
    animationType: 'rocket-base',
    question: "Where do rockets take off from?",
    options: ["Spaceport", "Astronauts backyard", "Cities", "Space Agency"],
    correctAnswer: "Spaceport",
    image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=600",
    explanation: "They take off from far, far away from cities and towns."
  }
];
