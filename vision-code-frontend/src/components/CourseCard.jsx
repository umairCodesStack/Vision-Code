function CourseCard({ course }) {
  const {
    title,
    description,
    level,
    modules,
    duration,
    students,
    rating,
    reviews,
    badge,
    badgeColor,
    gradient,
    icon,
  } = course;

  const levelColors = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-purple-100 text-purple-700",
    Advanced: "bg-orange-100 text-orange-700",
    "All Levels": "bg-blue-100 text-blue-700",
  };

  return (
    <div className="group relative">
      {/* Hover glow effect */}
      <div
        className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-xl opacity-0 group-hover:opacity-100 blur transition duration-500`}
      ></div>

      <div className="relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
        {/* Course Header with Icon */}
        <div
          className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <span
            className={`${
              icon.length > 2 ? "text-5xl" : "text-6xl"
            } font-bold text-white relative z-10`}
          >
            {icon}
          </span>
          {badge && (
            <div
              className={`absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold ${badgeColor}`}
            >
              {badge}
            </div>
          )}
        </div>

        {/* Course Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${levelColors[level]}`}
            >
              {level}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              {modules} Modules
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 flex-1">{description}</p>

          {/* Course Stats */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg
                className="w-4 h-4 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{duration} total</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <svg
                className="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4. 354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span>{students} students enrolled</span>
            </div>
          </div>

          {/* Footer with Rating and CTA */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              </div>
              <span className="font-bold text-gray-900">{rating}</span>
              <span className="text-gray-400 text-sm">({reviews})</span>
            </div>
            <a
              href="#"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-semibold text-sm transform hover:scale-105"
            >
              Enroll Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
