import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Conversation from "./Conversation";
import BioPage from "./BioPage";
import MatchPage from "./MatchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Conversation />} />
        <Route path="/bio" element={<BioPage />} />
        <Route path="/match" element={<MatchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
