import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/FakeAuth";
import LoginForm from "./pages/LoginForm";
import ProtectedRouter from "./pages/ProtectedRouter";
import Dashboard from "./pages/Dashboard";
import CoursesPage from "./pages/CoursesPage";
import CommunityPage from "./pages/CommunityPage";
import { useEffect } from "react";
import ProctoringApp from "./pages/ProctoringApp";
import SignupForm from "./pages/SignupForm";
export const APP_NAME = "Vision-Code";
function App() {
  useEffect(() => {
    async function name() {
      const res = await fetch(" http://127.0.0.1:8000/api/users/");
      const data = await res.json();
      console.log(data);
    }
    name();
  }, []);
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="courses" element={<CoursesPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route
              path="app"
              element={
                <ProtectedRouter>
                  <Dashboard />
                </ProtectedRouter>
              }
            />
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
