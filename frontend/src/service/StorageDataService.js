import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageData {
  getDataStorage = async (key) => {
    return await AsyncStorage.getItem(key);
  };

  postDataStorage = async (key, model) => {
    if (key && model) this.deleteDataStorage();
    return await AsyncStorage.setItem(key, JSON.stringify([model]))
      .then((response) => console.log(`Se agregaron los datos`))
      .catch((e) => console.log(e));
  };

  deleteDataStorage = async (key) => {
    await AsyncStorage.removeItem(key)
      .then((response) => console.log(`Se limpio el storage`))
      .catch((e) => console.log(e));
  };
}
