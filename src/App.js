import { Toaster } from "react-hot-toast";
import logo from "./logo.svg";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";

// App.js est le fichier principal qui contient le composant HomePage.

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
