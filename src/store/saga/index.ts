import { call, takeEvery, put } from "redux-saga/effects";
import { sagaActions } from "./sagaActions";
import { Question } from "../../common/types";
import { updateQuestions } from "../quizSlice";
import axios from "axios";
import { updateErrorMsg } from "../errorSlice";

const BACKEND_BASE_URL = "https://quiz-backend.shivamverma9.repl.co";

type ApICallProps = {
  path: string;
  postData?: Record<string, string | number>;
};

// api helper to make get requests
const apiGetRequest = async ({ path }: ApICallProps) => {
  try {
    const response = await axios(`${BACKEND_BASE_URL}/${path}`);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// api helper to make post requests
const apiPostRequest = async ({ path, postData }: ApICallProps) => {
  try {
    const response = await axios.post(`${BACKEND_BASE_URL}/${path}`, {
      ...postData,
    });
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// fetches questions for quiz
export function* setQuizQuestions() {
  try {
    const data: Question[] = yield call(async () => {
      const { data: result, status } = await apiGetRequest({
        path: "questions",
      });
      if (status === 200) {
        return result.questions;
      }else {
        throw new Error("Something went wrong")
      }
    });
    yield put(updateQuestions({ questions: data }));
  } catch (error: any) {
    yield put(updateErrorMsg(error.message))
  }
}

// submit question response after button click
export function* submitAnswer(action: any) {
  try {
    // @ts-ignore
    // static data returned as of now, once API returns actual data, this can be used to set states accordingly
    const data: Record<string, string | number> = yield call(async () => {
      const { data: result, status } = await apiPostRequest({
        path: "submit-answer",
        postData: {
          ...action.payload.questionDetails,
        },
      });
      if (status === 200) {
        return result;
      }else {
        throw new Error("Something went wrong")
      }
    });
    // set state logic based on API data goes here, setting state from reducers for now
  } catch (error: any) {
    yield put(updateErrorMsg(error.message));
  }
}

// runs after quiz is finished
export function* finishQuiz(action: any) {
  try {
    // @ts-ignore
    // static data returned as of now, once API returns actual data, this can be used to set states accordingly
    const data: Record<string, string | number> = yield call(async () => {
      const { data: result, status } = await apiPostRequest({
        path: "finish-quiz",
        postData: {
          ...action.payload.quizDetails,
        },
      });
      if (status === 200) {
        return result;
      } else {
        throw new Error("Something went wrong");
      }
    });
    // set state logic based on API data goes here, setting state from reducers for now
  } catch (error: any) {
    yield put(updateErrorMsg(error.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.SET_QUIZ_DATA, setQuizQuestions);
  yield takeEvery(sagaActions.SUBMIT_ANSWER, submitAnswer);
  yield takeEvery(sagaActions.FINISH_QUIZ, finishQuiz);
}
