import React from "react";
import {Routes, Route} from "react-router-dom";
import { Box } from "@mui/material";

import "./App.css";
import { Home, QuizHome, QuizResult } from "./pages";

const App: React.FC = () => {
  return (
    <Box width="100%" height="100vh">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizHome />} />
        <Route path="/quiz-result" element={<QuizResult />} />
      </Routes>
    </Box>
  );
};

export default App;
