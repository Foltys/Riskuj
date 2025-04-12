import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useGameStore } from "./store/gameStore";
import Home from "./pages/Home";
import WaitingRoom from "./pages/WaitingRoom";
import Game from "./pages/Game";
import Results from "./pages/Results";

function App() {
  const { isDarkMode, setDarkMode } = useGameStore();

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      // Check system preference
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
    }
  }, [setDarkMode]);

  const toggleTheme = () => {
    setDarkMode(!isDarkMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
  };

  return (
    <Router>
      <div className="min-h-screen bg-background-light dark:bg-background-dark">
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 p-2 rounded-full bg-primary-light dark:bg-primary-dark text-white"
        >
          {isDarkMode ? "🌞" : "🌙"}
        </button>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/waiting" element={<WaitingRoom />} />
          <Route path="/game" element={<Game />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
