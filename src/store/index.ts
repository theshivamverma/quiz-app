import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import quizReducer from "./quizSlice";
import errorReducer from "./errorSlice";
import saga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    error: errorReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware)
})

sagaMiddleware.run(saga)

export default store;