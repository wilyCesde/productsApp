import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageData {
  getDataStorage = async (key) => {
    return await AsyncStorage.getItem(key);
  };

  postDataStorage = async (key, model) => {
    await this.deleteDataStorage(key)
      .then(async () => {
        return await AsyncStorage.setItem(key, JSON.stringify([model]));
      })
      .catch((e) => console.log(e));
  };

  deleteDataStorage = async (key) => {
    await AsyncStorage.removeItem(key);
  };
}
