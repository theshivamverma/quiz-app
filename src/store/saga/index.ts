import { call, takeEvery, put } from "redux-saga/effects";
import { sagaActions } from "./sagaActions";
import { Question } from "../../common/types";
import { updateQuestions } from "../quizSlice";

let makeApiCallAndReturnData = async () => {
  try {
    const response = await fetch("/data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("api call failed");
  }
};

export function* setQuizQuestions() {
  try {
    const data: Question[] = yield call(async () => {
      const result = await makeApiCallAndReturnData();
      return result.questions;
    });
    yield put(updateQuestions({questions: data}))
  } catch (error) {}
}

export default function* rootSaga() {
  yield takeEvery(sagaActions.SET_QUIZ_DATA, setQuizQuestions);
}
