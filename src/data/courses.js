export const courses = [
  {
    id: 1,
    title: "Web Development",
    instructorId: 101,

    videos: [
      {
        id: 1,
        title: "HTML Basics",
        url: "https://www.youtube.com/embed/qz0aGYrrlhU",
        assignment: "Create a basic HTML page using headings, lists and images",
        miniProject: "Build a simple personal profile page"
      },
      {
        id: 2,
        title: "CSS Fundamentals",
        url: "https://www.youtube.com/embed/yfoY53QXEnI",
        assignment: "Design a Flexbox layout",
        miniProject: "Create a responsive landing section"
      },
      {
        id: 3,
        title: "JavaScript Introduction",
        url: "https://www.youtube.com/embed/W6NZfCO5SIk",
        assignment: "Write a JS calculator",
        miniProject: "Build a todo list using JS"
      },
    ],

    finalProject: {
      title: "Full Responsive Website",
      description:
        "Build a complete responsive website using HTML, CSS and JavaScript"
    },
  },

  {
    id: 2,
    title: "React Fundamentals",
    instructorId: 106,

    videos: [
      {
        id: 1,
        title: "React Introduction",
        url: "https://www.youtube.com/embed/bMknfKXIFA8",
        assignment: "Setup React project using Vite",
        miniProject: "Create Hello World component"
      },
      {
        id: 2,
        title: "Props & State",
        url: "https://www.youtube.com/embed/35lXWvCuM8o",
        assignment: "Pass props between components",
        miniProject: "Counter app using useState"
      },
    ],

    finalProject: {
      title: "React Dashboard App",
      description:
        "Build a small dashboard using React hooks and components"
    },
  },
];
