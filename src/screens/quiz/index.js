import {View, Text, Alert, StyleSheet} from "react-native";
import React, {useEffect, useState} from "react";
import Questions from "./Questions";
// import questions from "../../common/data";
import {useDispatch, useSelector} from "react-redux";
import {
  get_localStorage_data,
  set_localStorage_data,
} from "../../common/common";
import {
  ACTION_TYPE,
  ASYNC_STORAGE_SCORES,
  COLORS,
} from "../../constants/constants";
import {ActivityIndicator} from "react-native-paper";
import fetchQuestions from "../../redux/actions";

const Quiz = ({navigation}) => {
  const dispatch = useDispatch();
  const {score} = useSelector(state => state.quizReducer);
  const {current_user} = useSelector(state => state.userReducer);

  const {questions} = useSelector(state => state.quizReducer);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [disable, setDisable] = useState(false);
  const [remainingTime, setRemainingTime] = useState(30);
  const [showAnswer, setShowAnswer] = useState(false);
  const nextQuestion = currentQuestion + 1;
  const total_questions = questions.length;
  const [scoreUpdated, setScoreUpdated] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  const handleNextQuestion = async () => {
    if (nextQuestion < questions.length) {
      setRemainingTime(30);
      setCurrentQuestion(prev => prev + 1);
      setDisable(false);
      setShowAnswer(false);
    } else if (!scoreUpdated) {
      update_score_board();
      setScoreUpdated(true);
      navigation.replace("result");
    }
  };

  const update_score_board = async () => {
    try {
      let scores = await get_localStorage_data(ASYNC_STORAGE_SCORES);
      let new_score = {email: current_user, score};
      scores.push(new_score);
      dispatch({type: ACTION_TYPE.FINAL_RESULT, payload: scores});
      await set_localStorage_data(ASYNC_STORAGE_SCORES, scores);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleCheckAnswer = answer => {
    const correctAnswer = questions[currentQuestion].correct_answer;
    if (answer === correctAnswer) {
      setCurrentScore(prev => prev + 1);
      dispatch({type: ACTION_TYPE.INCREMENT_SCORE});
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (remainingTime > 0) {
        setRemainingTime(prev => prev - 1);
      } else {
        clearInterval();
        handleNextQuestion();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [currentQuestion, remainingTime]);

  return (
    <>
      {questions?.length === 0 ? (
        <ActivityIndicator
          size={40}
          color={COLORS.INDIGO}
          style={styles.loader}
        />
      ) : (
        <View style={styles.main}>
          <View style={styles.timer}>
            <Text
              style={{
                color: COLORS.BLACK,
                fontSize: 14,
                textAlign: "right",
              }}>
              Next Question in {remainingTime} seconds
            </Text>
          </View>
          <Questions
            question={questions[currentQuestion]}
            handleCheckAnswer={handleCheckAnswer}
            handleNextQuestion={handleNextQuestion}
            remainingTime={remainingTime}
            setDisable={setDisable}
            disable={disable}
            showAnswer={showAnswer}
            setShowAnswer={setShowAnswer}
            total_questions={total_questions}
            nextQuestion={nextQuestion}
            currentScore={currentScore}
          />
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  timer: {
    margin: 20,
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
export default Quiz;
