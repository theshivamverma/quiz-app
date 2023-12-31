import React, { useState } from "react";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
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

  // navigate to result page when last question submitted
  if (questions.length > 0 && currentQuestionIndex === questions.length) {
    navigate("/quiz-result");
  }

  // get current question based on index
  const currentQuestion = questions[currentQuestionIndex];

  const { question, options, correctOption, correctPoint } =
    currentQuestion ?? {};

  const dispatch = useAppDispatch();

  // to store time taken to answer question
  const [secondsToAnswer, setSecondsToAnswer] = useState<number>(0);

  // logic to count seconds from when question is loaded until answered
  let interval: number;

  React.useEffect(() => {
    interval = setInterval(() => {
      setSecondsToAnswer((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      setSecondsToAnswer(0);
    };
  }, []);

  // fetch quiz questions
  React.useEffect(() => {
    dispatch(updateQuizStartStatus(true));
    if (questions.length === 0) {
      dispatch({ type: sagaActions.SET_QUIZ_DATA });
    }
  }, []);

  const handleOptionClick = (e: any) => {
    dispatch(updateSelectedOption(e.target.value));
  };

  const handleSubmitClick = () => {
    // update state to submit response
    dispatch(
      updateSubmittedAnswers({
        answer: selectedOption,
        isAnswerCorrect: selectedOption === correctOption,
        correctPoint,
      })
    );
    // makes api request to submit response
    dispatch({
      type: sagaActions.SUBMIT_ANSWER,
      payload: {
        questionDetails: {
          questionId: 1,
          quizId: 2,
          selectedAnswer: selectedOption,
          timeTaken: secondsToAnswer,
          correctStatus: selectedOption === correctOption,
        },
      },
    });
    // clear interval once submit clicked
    clearInterval(interval);
  };

  return (
    <Box width="47%" margin="0 auto" bgcolor="#AF9CF3" height="100%">
      <QuizHeader />
      {Object.keys(questions).length > 0 ? (
        <Box
          borderRadius="3.75rem"
          bgcolor="white"
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
              <span className="extrabold-large">
                {currentQuestionIndex + 1}
              </span>
              /{questions && questions.length}
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
              className={`primaryBtn fullWidthBtn ${
                selectedOption === "" && "disabled"
              }`}
              disabled={selectedOption == ""}
            >
              <span>Next</span>
              <ArrowForwardIcon />
            </button>
          </Box>
        </Box>
      ) : (
        <Box padding={3} bgcolor="white">
          <Typography>Questions loading...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default QuizHome;
