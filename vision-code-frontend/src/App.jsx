import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import { AuthProvider } from "./context/FakeAuth";
import LoginForm from "./pages/LoginForm";
import ProtectedRouter from "./pages/ProtectedRouter";
import Dashboard from "./pages/Dashboard";
import CoursesPage from "./pages/CoursesPage";
import CommunityPage from "./pages/CommunityPage";
export const APP_NAME = "Vision-Code";
function App() {
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
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
