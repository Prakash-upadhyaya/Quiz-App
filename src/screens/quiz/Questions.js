import {View, Text, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {RadioButton} from "react-native-paper";
import {COLORS} from "../../constants/constants";

const Questions = ({
  question,
  handleCheckAnswer,
  handleNextQuestion,
  setDisable,
  disable,
  showAnswer,
  setShowAnswer,
  total_questions,
  nextQuestion,
  currentScore,
}) => {
  const [checked, setChecked] = useState("");

  const handleRadioPress = value => {
    setChecked(value);
  };
  let options = [...question.incorrect_answers, question.correct_answer].sort();

  const handleShowAnswers = () => {
    handleCheckAnswer(checked);
    setDisable(true);
    setShowAnswer(true);
  };
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        {/* Question view */}
        <Text style={styles.question}>
          Q.{nextQuestion} {question.question}
        </Text>

        {/* Options View */}
        <View style={styles.optionsView}>
          <RadioButton.Group
            onValueChange={value => handleRadioPress(value)}
            value={checked}>
            <FlatList
              data={options}
              renderItem={({item}) => {
                return (
                  <View style={styles.optionsText}>
                    <RadioButton value={item} disabled={disable} />
                    <Text style={styles.text}>{item}</Text>
                  </View>
                );
              }}
            />
          </RadioButton.Group>
        </View>
      </View>

      {/* Answer and Score View */}
      <View style={styles.review}>
        {showAnswer ? (
          <Text style={{color: "#00f", fontWeight: "bold", fontSize: 16}}>
            Answer: {question.correct_answer}
          </Text>
        ) : (
          <Text></Text>
        )}

        <Text
          style={{
            color: "#00f",
            fontWeight: "bold",
            fontSize: 18,
            textAlign: "right",
          }}>
          Score: {currentScore} / {total_questions}
        </Text>
      </View>

      {/* Button view */}
      <View style={styles.btnView}>
        <View style={styles.btnDirection}>
          <TouchableOpacity
            style={{
              ...styles.btn,
              backgroundColor: showAnswer ? COLORS.WHITE : COLORS.INDIGO,
            }}
            disabled={showAnswer}
            onPress={handleShowAnswers}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={handleNextQuestion}
              style={{
                backgroundColor: showAnswer ? COLORS.INDIGO : COLORS.WHITE,
                ...styles.btn,
              }}
              disabled={!showAnswer}>
              <Text style={styles.btnText}>
                {nextQuestion === total_questions ? "Finish" : "Next"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Questions;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  container: {
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  question: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: COLORS.BLACK,
    fontSize: 16,
    fontWeight: "600",
  },
  optionsView: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  optionsText: {
    flexDirection: "row",
    alignItems: "center",
  },
  review: {
    marginHorizontal: 20,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnView: {
    position: "absolute",
    bottom: 10,
  },
  btnDirection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  btn: {
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 150,
    paddingVertical: 7,
  },
  btnText: {color: COLORS.WHITE, fontSize: 20, alignSelf: "center"},
});
