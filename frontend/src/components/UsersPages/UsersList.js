import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../style/style";
import { Users } from "../../models/users";
import { useEffect, useState } from "react";
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

  let userStorage = new Users();
  let usersStorage = [];

  let user = new Users();
  // let users = [];

  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useState([]);
  const [authValidate, setAuthValidate] = useState(new Auth());

  const [errorMess, setErrorMess] = useState("");

  //#endregion

  //#region functions

  //#region storage

  const getUsersStorage = async () => {
    await storageData
      .getDataStorage(USERS_INFO)
      .then((response) => {
        if (response) {
          usersStorage = JSON.parse(response);
          if (users) {
            userStorage = usersStorage[0];
          }
        } else {
          navigationService.logout({ navigation });
        }
      })
      .catch((e) => console.log(e));
  };

  //#endregion

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
      user = findUser;
      if (user) {
        setErrorMess("Usuario seleccionado...");
        setTimeout(() => {
          navigationService.navigateSignup({ navigation }, user);
          setErrorMess("");
        }, 1500);
      }
    } else {
      setErrorMess("Intenta nuevamente.");
    }
  }
  //#endregion

  //#region events
  useEffect(() => {
    getUsersStorage();
  }, []);
  //#endregion

  //#endregion
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
      <Text style={{ fontWeight: "bold", color: "black" }}>{errorMess}</Text>
    </View>
  );
}
//#endregion
