import AsyncStorage from "@react-native-async-storage/async-storage";

//function to get the data from the local storage
const get_localStorage_data = async key => {
  let data = await AsyncStorage.getItem(key);
  if (data !== null) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

//function to set the user data to local strorage
const set_localStorage_data = async (key, data) => {
  let stringify_data = JSON.stringify(data);
  await AsyncStorage.setItem(key, stringify_data);
};

export {get_localStorage_data, set_localStorage_data};
