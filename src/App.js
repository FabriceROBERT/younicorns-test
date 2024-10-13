import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import logo from "./logo.svg";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Upper from "./assets/img/Upper.png";
import Footer from "./components/Footer";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function App() {
  const [showScroll, setShowScroll] = useState(false);

  // Verifier si le scroll est supérieur à 100px, dans ce cas, on affiche le bouton
  const checkScrollTop = () => {
    console.log("scrollY", window.scrollY);
    if (!showScroll && window.scrollY > 100) {
      setShowScroll(true);
    } else if (showScroll && window.scrollY <= 100) {
      setShowScroll(false);
    }
  };

  // Ajouter un écouteur d'événement pour le scroll,
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
      {/* J'ai' mis le footer et le bouton pour qu'ils soient utilisables sur chaque page  */}
      <Footer />
      {showScroll && (
        <img className="upper" src={Upper} onClick={scrollToTop} alt="Upper" />
      )}
      <Toaster />
    </div>
  );
}

export default App;
