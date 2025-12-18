import { useState } from "react";
import { useAuth } from "../context/FakeAuth";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Dashboard() {
  const { user, logout } = useAuth();
  console.log("Authenticated user:", user);
  const navigate = useNavigate();
  //const [selectedTab, setSelectedTab] = useState("overview");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <a href="/app" className="flex items-center space-x-2">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                  >
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {user?.name || "Student"}
                </span>
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v. 341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.[0] || "U"}
                </div>
                <div className="hidden md:block">
                  <div className="text-sm font-semibold text-gray-900">
                    {user?.name || "Developer"}
                  </div>
                  <div className="text-xs text-gray-500">
                    Level 5 • 1,250 XP
                  </div>
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <svg width="400" height="400" viewBox="0 0 200 200" fill="white">
              <path d="M40 40 L160 40 L160 160 L40 160 Z" />
              <path d="M60 60 L140 60 L140 140 L60 140 Z" />
            </svg>
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name || "Developer"}! 👋
            </h1>
            <p className="text-blue-100 mb-6">
              Continue your learning journey and level up your skills
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Resume Learning
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                View Achievements
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">
                Courses Enrolled
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">8</div>
            <div className="text-sm text-green-600 mt-1">+2 this month</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Completed</div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">5</div>
            <div className="text-sm text-gray-500 mt-1">62. 5% completion</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">
                Learning Streak
              </div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17. 657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">15</div>
            <div className="text-sm text-orange-600 mt-1">days in a row 🔥</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-gray-600">Total XP</div>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">1,250</div>
            <div className="text-sm text-purple-600 mt-1">+150 today</div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg: grid-cols-3 gap-8">
          {/* Left Column - Continue Learning */}
          <div className="lg:col-span-2 space-y-6">
            {/* Continue Learning Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Continue Learning
                </h2>
                <a
                  href="/courses"
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  View All →
                </a>
              </div>

              <div className="space-y-4">
                {/* Course Progress Card 1 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      JS
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            JavaScript Masterclass
                          </h3>
                          <p className="text-sm text-gray-500">
                            45 of 60 lessons completed
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                          In Progress
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>75% Complete</span>
                        <span>~2 hours left</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Progress Card 2 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      R
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            React 18 Complete Guide
                          </h3>
                          <p className="text-sm text-gray-500">
                            12 of 50 lessons completed
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                          In Progress
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                          style={{ width: "24%" }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>24% Complete</span>
                        <span>~8 hours left</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Progress Card 3 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      PY
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-900">
                            Python for Data Science
                          </h3>
                          <p className="text-sm text-gray-500">
                            8 of 40 lessons completed
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                          In Progress
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                          style={{ width: "20%" }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>20% Complete</span>
                        <span>~10 hours left</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Courses */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recommended For You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold mb-3">
                    TS
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    TypeScript Fundamentals
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Master TypeScript and type-safe coding
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>⭐ 4.9 (2. 5k)</span>
                    <span>35 lessons</span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold mb-3">
                    N
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">
                    Node.js Backend Dev
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    Build scalable server-side applications
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>⭐ 4.8 (1.8k)</span>
                    <span>42 lessons</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Daily Challenge */}
            <div className="bg-gradient-to-br from-orange-500 to-pink-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Daily Challenge</h3>
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  🎯
                </div>
              </div>
              <p className="text-sm text-orange-50 mb-4">
                Complete today's coding challenge and earn 50 XP bonus!
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
              >
                Start Challenge
              </Button>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">
                Recent Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center text-2xl">
                    🏆
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">
                      Fast Learner
                    </div>
                    <div className="text-xs text-gray-500">
                      Completed 5 lessons in one day
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    🎓
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">
                      Course Master
                    </div>
                    <div className="text-xs text-gray-500">
                      Completed JavaScript course
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-2xl">
                    ⚡
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">
                      Streak Master
                    </div>
                    <div className="text-xs text-gray-500">
                      15 day learning streak
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Stats */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">This Week</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Learning Time</span>
                    <span className="font-semibold text-gray-900">
                      8. 5 hrs
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Lessons Completed</span>
                    <span className="font-semibold text-gray-900">12/15</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-green-600 to-emerald-600 h-2 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Practice Problems</span>
                    <span className="font-semibold text-gray-900">25/30</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-orange-600 to-pink-600 h-2 rounded-full"
                      style={{ width: "83%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Community Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Community</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>1,234 members online</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>45 new discussions</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>12 live study groups</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-4">
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
