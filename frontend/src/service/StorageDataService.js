import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageData {
  getDataStorage = async (key, array) => {
    try {
      array = await AsyncStorage.getItem(key);
      if (array !== null) {
        // console.log(JSON.parse(array));
        return JSON.parse(array);
      }
    } catch (e) {
      console.log(e);
    }
  };

  postDataStorage = async (key, model) => {
    try {
      await AsyncStorage.removeItem(key);
      await AsyncStorage.setItem(key, JSON.stringify([model]));
    } catch (e) {
      console.log(e);
    }
  };
}
