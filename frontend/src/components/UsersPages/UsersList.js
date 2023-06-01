import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../style/style";
import { Users } from "../../models/users";
import { useState } from "react";
import React from "react";
import { UsersService } from "../../service/UsersService";
import { NavigationService } from "../../service/NavigationService";
import { StorageData } from "../../service/StorageDataService";
import { Auth } from "../../models/auth";

// localstorage
const USERS_INFO = "@userInfo";
const AUTH_INFO = "@authInfo";

export default function UsersList({ navigation }) {
  //#region atributos
  const userService = new UsersService();
  const navigationService = new NavigationService();
  const storageData = new StorageData();

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(new Users());
  const [auth, setAuth] = useState([]);
  const [authValidate, setAuthValidate] = useState(new Auth());

  const [errorMess, setErrorMess] = useState("");

  //#endregion

  //#region functions

  const getUser = async () => {
    const dataUser = await storageData.getDataStorage(USERS_INFO, users);
    const authUser = await storageData.getDataStorage(AUTH_INFO, auth);
    if (dataUser && authUser) {
      setUser(dataUser);
      setAuthValidate(authUser);
    }
  };

  //#region services

  const getUsers = async () => {
    await userService
      .getAllUsers()
      .then((response) => {
        if (response.data) {
          setUsers(response.data);
        }
      })
      .catch((e) => console.log(e));
  };

  async function editUser(item) {
    const findUser = users.find((x) => x._id === item._id);
    if (users && findUser) {
      const dataStorage = storageData.postDataStorage(USERS_INFO, findUser);
      if (dataStorage) {
        setTimeout(() => {
          navigationService.navigateSignup({ navigation });
        }, 1500);
      }
    }
  }
  //#endregion

  //#region events
  //#endregion

  //#endregion

  getUser();

  //#region front ("HTML")
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users List</Text>
      <TouchableOpacity onPress={getUsers}>
        <Text style={styles.subtitle}>Gestiona los usuarios - Click aquí</Text>
      </TouchableOpacity>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                editUser(item);
              }}
            >
              <Text style={styles.item}>
                {item.name} - {item.email} | Click to Edit
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
        />
      </SafeAreaView>
      <Text style={{ fontWeight: "bold", marginTop: 10, color: "black" }}>
        {errorMess}
      </Text>
    </View>
  );
}
//#endregion
