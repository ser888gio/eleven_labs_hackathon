import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Conversation from "./Conversation";
import BioPage from "./BioPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Conversation />} />
        <Route path="/bio" element={<BioPage />} />
      </Routes>
    </Router>
  );
}

export default App;
