import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Quiz from "../screens/quiz";
import Result from "../screens/result";
import AuthPage from "./TabNavigation";

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignUp"
            component={AuthPage}
            options={{
              title: "Trivia Quiz",
              headerTransparent: true,
              headerTitleAlign: "center",
            }}
          />
          <Stack.Screen
            name="quiz"
            component={Quiz}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="result"
            component={Result}
            options={{
              title: "Leader Board",
              headerBackVisible: false,
              headerTitleAlign: "center",
              headerTransparent: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default HomeNavigation;
