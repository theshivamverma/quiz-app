import React from "react";
import {Routes, Route} from "react-router-dom";
import { Box, Alert } from "@mui/material";

import "./App.css";
import { Home, QuizHome, QuizResult } from "./pages";
import { useAppSelector } from "./common/hooks";

const App: React.FC = () => {

  const {error: {errorMessage}} = useAppSelector(({error}) => ({error}))

  return (
    <Box width="100%" height="100vh" bgcolor="#DBD8F0" overflow="hidden">
      {errorMessage && (
        <Alert sx={{position: "absolute", bottom: "1rem", left: "1rem"}} severity="error">{errorMessage}</Alert>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<QuizHome />} />
        <Route path="/quiz-result" element={<QuizResult />} />
      </Routes>
    </Box>
  );
};

export default App;
