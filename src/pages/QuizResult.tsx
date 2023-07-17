import { Box, Typography } from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import React from "react";
import { QuizHeader } from "../components";
import { useAppSelector } from "../common/hooks";

const QuizResult: React.FC = () => {
  const {
    quiz: { correctAnswers, incorrectAnswers },
  } = useAppSelector(({ quiz }) => ({ quiz }));
  return (
    <Box width="47%" margin="0 auto" bgcolor="#AF9CF3" height="100%">
      <QuizHeader />
      <Box
        borderRadius="3.75rem"
        bgcolor="white"
        height="100%"
        position="relative"
        padding={3}
      >
        <Typography fontSize={25} fontWeight={700} textAlign="center">
          Your result
        </Typography>
        <Box>
          <Box
            height="80px"
            display="flex"
            alignItems="center"
            sx={{ background: "rgba(68, 183, 123, 0.2)" }}
            padding={3}
            borderRadius={3}
            mt={2}
          >
            <Brightness1Icon sx={{ color: "#44B77B" }} />
            <Typography margin="1rem" fontWeight={500}>
              {correctAnswers}
            </Typography>
            <Typography fontWeight={500} sx={{ opacity: "0.5" }}>
              Correct
            </Typography>
          </Box>
          <Box
            height="80px"
            display="flex"
            alignItems="center"
            sx={{ background: "rgba(255, 59, 63, 0.2)" }}
            padding={3}
            borderRadius={3}
            mt={2}
          >
            <Brightness1Icon sx={{ color: "#FF3B3F" }} />
            <Typography margin="1rem" fontWeight={500}>
              {incorrectAnswers}
            </Typography>
            <Typography fontWeight={500} sx={{ opacity: "0.5" }}>
              Incorrect
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuizResult;
