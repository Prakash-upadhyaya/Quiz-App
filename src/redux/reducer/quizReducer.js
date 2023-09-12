import {ACTION_TYPE} from "../../constants/constants";

const initialState = {
  score: 0,
  finalResult: [],
  questions: [],
  errors: null,
};

const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      };

    case ACTION_TYPE.ERROR_QUESTIONS:
      return {
        ...state,
        errors: action.payload,
      };

    case ACTION_TYPE.INCREMENT_SCORE:
      return {
        ...state,
        score: state.score + 1,
      };

    case ACTION_TYPE.FINAL_RESULT:
      return {
        ...state,
        finalResult: action.payload,
      };

    default:
      return state;
  }
};

export default quizReducer;
