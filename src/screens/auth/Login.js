import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {checkEmailValidation} from "./validation";
import {get_localStorage_data} from "../../common/common";
import {
  ACTION_TYPE,
  ASYNC_STORAGE_USERS,
  COLORS,
} from "../../constants/constants";

const Login = ({navigation}) => {
  const [loginData, setLoginData] = useState({email: "", password: ""});
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const {email, password} = loginData;
    try {
      if (!email || !password) {
        Alert.alert("Warning", "Please enter all the fields");
      } else if (email && checkEmailValidation(email) == false) {
        Alert.alert("Warning", "Please enter valid email");
      } else {
        const userData = await get_localStorage_data(ASYNC_STORAGE_USERS);

        if (userData !== null) {
          const user = userData.find(usr => usr.email === email);

          if (
            user !== undefined &&
            user.email === email &&
            user.password === password
          ) {
            dispatch({type: ACTION_TYPE.SET_USER, payload: loginData.email});
            setLoginData({email: "", password: ""});
            navigation.navigate("quiz");
          } else if (user !== undefined) {
            Alert.alert("Warning", "Email or password is incorrect");
          } else {
            Alert.alert("Warning", "User not registered with this email");
          }
        } else {
          Alert.alert("Warning", "User not found, Please register");
          navigation.navigate("register");
        }
      }
    } catch (error) {
      console.error("Error while logging in:", error);
    }
  };
  return (
    <>
      <View style={styles.main}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Please enter your email address"
            placeholderTextColor={COLORS.GREY}
            onChangeText={text => setLoginData({...loginData, email: text})}
            value={loginData.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            placeholderTextColor={COLORS.GREY}
            onChangeText={text => setLoginData({...loginData, password: text})}
            value={loginData.password}
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.btnContainer} onPress={handleLogin}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  text: {
    color: COLORS.BLACK,
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
    color: "#000",
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
