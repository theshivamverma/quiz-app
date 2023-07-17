import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {useNavigate} from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import {
  updateQuizStartStatus,
  updateSelectedOption,
  updateSubmittedAnswers,
} from "../store/quizSlice";
import QuizHeader from "../components/QuizHeader";
import { Question } from "../common/types";
import { sagaActions } from "../store/saga/sagaActions";

const QuizHome: React.FC = () => {
  const {
    quiz: { currentQuestionIndex, questions, selectedOption },
  } = useAppSelector(({ quiz }) => ({ quiz }));

  const navigate = useNavigate();

  if(questions.length > 0 && currentQuestionIndex === questions.length){
    navigate("/quiz-result")
  }

  const currentQuestion = questions[currentQuestionIndex];

  const { question, options, correctOption, correctPoint } =
    currentQuestion ?? {};

  const dispatch = useAppDispatch();

  const [secondsToAnswer, setSecondsToAnswer] = useState<number>(0);

  React.useEffect(() => {
    dispatch(updateQuizStartStatus(true));
    if (questions.length === 0) {
      dispatch({ type: sagaActions.SET_QUIZ_DATA });
    }
  }, []);

  let timer: number;

  React.useEffect(() => {
    timer = setInterval(() => {
      setSecondsToAnswer((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      setSecondsToAnswer(0);
    };
  }, []);

  const handleOptionClick = (e: any) => {
    dispatch(updateSelectedOption(e.target.value));
  };

  const handleSubmitClick = () => {
    dispatch(
      updateSubmittedAnswers({
        answer: selectedOption,
        isAnswerCorrect: selectedOption === correctOption,
        correctPoint,
      })
    );
    clearInterval(timer);
  };

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
        <Box
          width="10rem"
          height="10rem"
          bgcolor="white"
          sx={{
            position: "absolute",
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          margin="0 auto"
          borderRadius="50%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <h2 className="quiz-question-index">
            <span className="extrabold-large">{currentQuestionIndex + 1}</span>/
            {questions && questions.length}
          </h2>
        </Box>
        <Box>
          {question && (
            <Typography fontWeight={500} mt={10}>
              {question}
            </Typography>
          )}
          {options && (
            <RadioGroup onChange={handleOptionClick} value={selectedOption}>
              {Object.keys(options).map((optionKey) => (
                <Box
                  key={optionKey}
                  padding={3}
                  bgcolor="#F3F4FA"
                  borderRadius="1.25rem"
                  mt={1}
                >
                  <FormControlLabel
                    value={optionKey}
                    control={<Radio />}
                    label={options[optionKey as keyof Question["options"]]}
                  />
                </Box>
              ))}
            </RadioGroup>
          )}
          <button
            onClick={handleSubmitClick}
            className="primaryBtn fullWidthBtn"
            disabled={selectedOption == ""}
          >
            <span>Next</span>
            <ArrowForwardIcon />
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default QuizHome;
