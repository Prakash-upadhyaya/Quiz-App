// storage constants
export const ASYNC_STORAGE_USERS = "@USERS";
export const ASYNC_STORAGE_RESULTS = "@RESULTS";
export const ASYNC_STORAGE_SCORES = "@SCORES";

// base URL
export const BASE_URL =
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple";

// color codes
export const COLORS = {
  INDIGO: "#32127A",
  WHITE: "#FFF",
  BLACK: "#000",
  INDIGO_OPACITY: "#32127A70",
  GREY: "#00000050",
  LIGHT: "#FFFFFF10",
  PERIWINKLE: "#CCCCFF",
};

// action types
export const ACTION_TYPE = {
  GET_QUESTIONS: "GET_QUESTIONS",
  ERROR_QUESTIONS: "ERROR_QUESTIONS",
  INCREMENT_SCORE: "INCREMENT_SCORE",
  FINAL_RESULT: "FINAL_RESULT",
  SET_USER: "SET_USER",
};
