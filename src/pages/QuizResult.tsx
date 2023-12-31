import { Box, Typography } from "@mui/material";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import React from "react";
import { QuizHeader, ScoreMeter } from "../components";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { updateQuizStartStatus } from "../store/quizSlice";
import { useNavigate } from "react-router";
import { sagaActions } from "../store/saga/sagaActions";
import { calculatePercentage } from "../common/utils";

const QuizResult: React.FC = () => {
  const {
    quiz: { correctAnswers, incorrectAnswers, finalScore, totalScore },
  } = useAppSelector(({ quiz }) => ({ quiz }));

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const handleStartAgainClick = () => {
    dispatch(updateQuizStartStatus(true));
    navigate("/quiz");
  }

  React.useEffect(() => {
    dispatch({
      type: sagaActions.FINISH_QUIZ,
      payload: {
        quizDetails: {
          quizId: 2,
          correctAnswers,
          incorrectAnswers,
          finalScore
        }
      }
    })
  }, [])

  const percent = calculatePercentage(finalScore, totalScore)

  return (
    <Box width="47%" margin="0 auto" bgcolor="#AF9CF3" height="inherit">
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
        <Box width="35%" height={200} margin="0 auto">
          <ScoreMeter percent={percent} />
        </Box>
        <Box mt={4}>
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
            <Typography width={70} margin="1rem" fontWeight={500}>
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
            <Typography width={70} margin="1rem" fontWeight={500}>
              {incorrectAnswers}
            </Typography>
            <Typography fontWeight={500} sx={{ opacity: "0.5" }}>
              Incorrect
            </Typography>
          </Box>
          <Box mt={4}>
            <button
              onClick={handleStartAgainClick}
              className="primaryBtn fullWidthBtn"
            >
              <span>Start Again</span>
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QuizResult;
