import { useState } from "react";
import CourseCard from "./CourseCard";
import Button from "./Button";

const coursesData = [
  {
    id: 1,
    title: "Modern JavaScript Bootcamp",
    description:
      "Master ES6+ features, DOM manipulation, and asynchronous programming from scratch.",
    level: "Beginner",
    modules: 12,
    duration: "8. 5 hours",
    students: "3,245",
    rating: 4.8,
    reviews: "1. 2k",
    badge: "BESTSELLER",
    badgeColor: "text-orange-600",
    gradient: "from-yellow-400 to-orange-500",
    icon: "JS",
  },
  {
    id: 2,
    title: "React 18 Mastery",
    description:
      "Build scalable web apps with Hooks, Redux Toolkit, and Next.js integration.",
    level: "Intermediate",
    modules: 20,
    duration: "15 hours",
    students: "2,850",
    rating: 4.9,
    reviews: "850",
    badge: "TRENDING",
    badgeColor: "text-purple-600",
    gradient: "from-cyan-500 to-blue-600",
    icon: "React",
  },
  {
    id: 3,
    title: "Python for Data Science",
    description:
      "Learn Pandas, NumPy, and Matplotlib to analyze and visualize complex data sets.",
    level: "All Levels",
    modules: 15,
    duration: "12 hours",
    students: "4,520",
    rating: 4.7,
    reviews: "2.5k",
    badge: "NEW",
    badgeColor: "text-indigo-600",
    gradient: "from-gray-700 to-gray-900",
    icon: "Py",
  },
  {
    id: 4,
    title: "Node.js Backend Mastery",
    description:
      "Build RESTful APIs, work with databases, and deploy production-ready servers.",
    level: "Intermediate",
    modules: 18,
    duration: "14 hours",
    students: "1,890",
    rating: 4.8,
    reviews: "1.5k",
    badge: null,
    gradient: "from-green-500 to-emerald-600",
    icon: "Node",
  },
  {
    id: 5,
    title: "TypeScript Fundamentals",
    description:
      "Learn type-safe JavaScript with TypeScript.  Perfect for React and Angular developers.",
    level: "Beginner",
    modules: 10,
    duration: "7 hours",
    students: "2,120",
    rating: 4.9,
    reviews: "980",
    badge: null,
    gradient: "from-blue-500 to-indigo-600",
    icon: "TS",
  },
  {
    id: 6,
    title: "Docker & Kubernetes",
    description:
      "Master containerization and orchestration for modern cloud-native applications.",
    level: "Advanced",
    modules: 14,
    duration: "11 hours",
    students: "1,450",
    rating: 4.6,
    reviews: "890",
    badge: null,
    gradient: "from-sky-500 to-blue-600",
    icon: "🐳",
  },
];

function CourseGrid() {
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      {/* Header with view toggle */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Available Courses{" "}
          <span className="text-blue-600">({coursesData.length})</span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${
              viewMode === "grid"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg ${
              viewMode === "list"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coursesData.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-12">
        <Button
          variant="outline"
          className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-gradient-to-r from-blue-600 to-purple-600  hover:text-white transition-all duration-300 hover:scale-105"
          style={{
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(147,51,234,0.5), 0 0 60px rgba(236,72,153,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          Load More Courses
        </Button>
      </div>
    </div>
  );
}

export default CourseGrid;
