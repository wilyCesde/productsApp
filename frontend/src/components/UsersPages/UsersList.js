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
import AsyncStorage from "@react-native-async-storage/async-storage";

// localstorage
const USERS_INFO = "@userInfo";
const AUTH_INFO = "@authInfo";
const PRODUCT_INFO = "@productInfo";
const SALE_INFO = "@saleInfo";

export default function UsersList({ navigation }) {
  //#region atributos
  let user = new Users();

  const [users, setUsers] = useState([]);

  const userService = new UsersService();
  //#endregion

  //#region functions

  const usersData = async () => {
    try {
      await AsyncStorage.removeItem(USERS_INFO);
      await AsyncStorage.setItem(USERS_INFO, JSON.stringify([user]));
    } catch (e) {
      console.log(e);
    }
  };

  //#region services

  const getUsers = async () => {
    await userService
      .getAllUsers()
      .then((response) => {
        if (response.data) {
          setUsers(response.data);
          AsyncStorage.setItem(USERS_INFO, users);
        }
      })
      .catch((e) => console.log(e));
  };

  function editUser(item) {
    const findUser = data.find((x) => x._id === item._id);
    if (data && findUser) {
      navigation.navigate("Signup", { user: findUser });
    }
  }
  //#endregion

  //#region events
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
          data={data}
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
    </View>
  );
}
//#endregion
