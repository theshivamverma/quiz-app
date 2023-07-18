import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question } from "../common/types";

type QuizState = {
  quizStarted: boolean;
  questions: Question[];
  finalScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  currentQuestionIndex: number;
  selectedOption: string;
  submittedAnswers: string[];
  totalScore: number;
};

const initialState: QuizState = {
  quizStarted: false,
  questions: [],
  finalScore: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  currentQuestionIndex: 0,
  selectedOption: "",
  submittedAnswers: [],
  totalScore: 50,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    updateQuizStartStatus: (state, action: PayloadAction<boolean>) => {
      state.quizStarted = action.payload;
      if(action.payload) {
        state.currentQuestionIndex = 0;
        state.correctAnswers = 0;
        state.incorrectAnswers = 0;
        state.selectedOption = "";
        state.finalScore = 0;
        state.submittedAnswers = []
      }
    },
    updateQuestions: (
      state,
      action: PayloadAction<{ questions: Question[] }>
    ) => {
      state.questions = [...action.payload.questions];
    },
    updateSelectedOption: (state, action: PayloadAction<string>) => {
      state.selectedOption = action.payload;
    },
    updateSubmittedAnswers: (
      state,
      action: PayloadAction<{ answer: string; isAnswerCorrect: boolean; correctPoint: number }>
    ) => {
      const {answer, isAnswerCorrect, correctPoint} = action.payload;
      state.submittedAnswers = [...state.submittedAnswers, answer];
      if(isAnswerCorrect){
        state.correctAnswers = state.correctAnswers + 1;
        state.finalScore = Number(state.finalScore) + Number(correctPoint);
      }else {
        state.incorrectAnswers = state.incorrectAnswers + 1;
      }
      state.currentQuestionIndex = state.currentQuestionIndex + 1;
      state.selectedOption = ""
    },
  },
});

export const { updateQuizStartStatus, updateQuestions, updateSelectedOption, updateSubmittedAnswers } = quizSlice.actions;

export default quizSlice.reducer;
