import {View, Text, StyleSheet, FlatList} from "react-native";
import React from "react";
import {useSelector} from "react-redux";
import {COLORS} from "../../constants/constants";

const Result = () => {
  const {finalResult} = useSelector(state => state.quizReducer);

  finalResult.sort((a, b) => a.score - b.score).reverse();
  return (
    <View style={styles.main}>
      <View style={styles.center}>
        <View style={[{...styles.commonStyles, ...styles.cardHeader}]}>
          <Text style={styles.headerText}>Email</Text>
          <Text style={styles.headerText}>Score</Text>
        </View>
      </View>
      <FlatList
        data={finalResult}
        renderItem={({item}) => (
          <View style={styles.center}>
            <View style={[{...styles.card, ...styles.commonStyles}]}>
              <Text style={styles.bodyText}>{item.email}</Text>
              <Text style={styles.bodyText}>{item.score}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.LIGHT,
    paddingTop: 70,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },

  commonStyles: {
    width: "90%",
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
  },
  cardHeader: {
    backgroundColor: COLORS.INDIGO,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.WHITE,
  },
  card: {
    width: "100%",
    backgroundColor: COLORS.PERIWINKLE,
  },
  bodyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.BLACK,
  },
});
export default Result;
