function Features() {
  return (
    <div class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16 scroll-fade-up">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Vision-Code?
          </h2>
          <p class="text-xl text-gray-600">
            Everything you need to become a successful developer
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow scroll-fade-up delay-100">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                class="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              Structured Learning Path
            </h3>
            <p class="text-gray-600">
              Follow our carefully designed curriculum from beginner to
              advanced, with clear milestones and achievements.
            </p>
          </div>

          <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow scroll-fade-up delay-200">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                class="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              Hands-On Practice
            </h3>
            <p class="text-gray-600">
              Write real code in our interactive editor. Learn by doing with
              instant feedback and guided exercises.
            </p>
          </div>

          <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow scroll-fade-up delay-300">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg
                class="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">
              Active Community
            </h3>
            <p class="text-gray-600">
              Connect with fellow learners, share projects, get help, and
              participate in coding challenges together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
