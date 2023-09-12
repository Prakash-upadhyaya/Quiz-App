import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import quizReducer from "../reducer/quizReducer";
import userReducer from "../reducer/userReducer";

const rootReducer = combineReducers({
  quizReducer: quizReducer,
  userReducer: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
