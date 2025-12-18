import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/FakeAuth";
import LoginForm from "./pages/LoginForm";
import ProtectedRouter from "./pages/ProtectedRouter";
import Dashboard from "./pages/Dashboard";
import CoursesPage from "./pages/CoursesPage";
import CommunityPage from "./pages/CommunityPage";
import ProctoringApp from "./pages/ProctoringApp";
import SignupForm from "./pages/SignupForm";
import CourseModulesPage from "./pages/CourseModulesPage";
import InstructorDashboard from "./pages/InstructorDashboard";
import Practice from "./pages/Practice";
import CodeEditor from "./pages/CodeEditor";
export const APP_NAME = "Vision-Code";
function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="modules/:courseId" element={<CourseModulesPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/editor" element={<CodeEditor />} />
            <Route
              path="app"
              element={
                <ProtectedRouter
                  studentDashboard={<Dashboard />}
                  InstructorDashboard={<InstructorDashboard />}
                ></ProtectedRouter>
              }
            />
            <Route path="instructor" element={<InstructorDashboard />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="attention" element={<ProctoringApp />} />
            <Route path="signup" element={<SignupForm />} />

            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
