import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageData {
  getDataStorage = async (key, array) => {
    return (array = await AsyncStorage.getItem(key));
  };

  postDataStorage = async (key, model) => {
    const deleted = this.deleteDataStorage(key);
    if (deleted) {
      return await AsyncStorage.setItem(key, JSON.stringify([model]));
    }
  };

  deleteDataStorage = async (key) => {
    await AsyncStorage.removeItem(key);
    return true;
  };
}
