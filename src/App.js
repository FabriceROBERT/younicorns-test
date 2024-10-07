import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import logo from "./logo.svg";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Upper from "./assets/img/Upper.png";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function App() {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    console.log("scrollY", window.scrollY);
    if (!showScroll && window.scrollY > 100) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= 100) {
      setShowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return () => {
      window.removeEventListener("scroll", checkScrollTop);
    };
  }, [showScroll]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
      <Toaster />
      {/* Je l'ai mis ici pour que le bouton soit utilisable sur chaque page  */}
      {showScroll && (
        <img className="upper" src={Upper} onClick={scrollToTop} alt="Upper" />
      )}
    </div>
  );
}

export default App;
