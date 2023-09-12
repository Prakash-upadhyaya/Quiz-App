import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, {useState} from "react";
import {checkEmailValidation} from "./validation";
import {
  get_localStorage_data,
  set_localStorage_data,
} from "../../common/common";
import {ASYNC_STORAGE_USERS, COLORS} from "../../constants/constants";

export default function Register({navigation}) {
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignUp = async () => {
    const {name, email, password, confirmPassword} = signUpData;
    try {
      let existing_user = await get_localStorage_data(ASYNC_STORAGE_USERS);

      if (!name || !email || !password || !confirmPassword) {
        Alert.alert("Info", "Please fill all the required fields");
      } else if (password !== confirmPassword) {
        Alert.alert("Info", "Passwords do not match");
      } else if (password?.length < 8) {
        Alert.alert("Info", "Password should be at least 8 characters");
      } else if (email && checkEmailValidation(email) === false) {
        Alert.alert("Info", "Please enter a valid email");
      } else {
        const isUserExists = existing_user.some(user => user.email === email);
        if (isUserExists) {
          Alert.alert("User already registered, please login");
          navigation.navigate("login");
        } else {
          existing_user.push(signUpData);
          set_localStorage_data(ASYNC_STORAGE_USERS, existing_user);
          setSignUpData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          navigation.navigate("login");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <View style={styles.main}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Please enter your name"
            onChangeText={text => setSignUpData({...signUpData, name: text})}
            placeholderTextColor={COLORS.GREY}
            value={signUpData.name}
          />
          <TextInput
            style={styles.input}
            placeholder="Please enter your email address"
            placeholderTextColor={COLORS.GREY}
            onChangeText={text => setSignUpData({...signUpData, email: text})}
            value={signUpData.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor={COLORS.GREY}
            onChangeText={text =>
              setSignUpData({...signUpData, password: text})
            }
            value={signUpData.password}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={COLORS.GREY}
            onChangeText={text =>
              setSignUpData({...signUpData, confirmPassword: text})
            }
            secureTextEntry={true}
            value={signUpData.confirmPassword}
          />

          <TouchableOpacity style={styles.btnContainer} onPress={handleSignUp}>
            <Text style={styles.btnText}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  text: {
    color: global.BLACK,
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    borderBottomColor: COLORS.INDIGO_OPACITY,
    borderBottomWidth: 1,
    padding: 10,
    color: COLORS.BLACK,
    fontSize: 16,
    marginTop: 20,
  },
  btnContainer: {
    backgroundColor: COLORS.INDIGO,
    width: "50%",
    alignItems: "center",
    marginTop: 100,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: "bold",
  },
});
