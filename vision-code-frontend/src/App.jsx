import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
