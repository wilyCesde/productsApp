import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../../style/style";
import React, { useEffect, useState } from "react";
// service
import { NavigationService } from "../../service/NavigationService";
import { Users } from "../../models/users";
import { StorageData } from "../../service/StorageDataService";
import { Auth } from "../../models/auth";
// models

// localstorage
const USERS_INFO = "@userInfo";

export default function Menu({ navigation, route }) {
  const navigationService = new NavigationService();
  const storageData = new StorageData();

  let userStorage = new Users();
  let usersStorage = [];

  const getUsersStorage = async () => {
    await storageData
      .getDataStorage(USERS_INFO)
      .then((response) => {
        if (response) {
          usersStorage = JSON.parse(response);
          if (usersStorage) {
            userStorage = usersStorage[0];
          }
        } else {
          navigationService.logout({ navigation });
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getUsersStorage();
  }, []);

  console.log(userStorage);

  if (userStorage._id !== "" || userStorage.name !== "") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.text}>Selecciona una opción</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigationService.navigateProductsForm({ navigation });
          }}
        >
          <Text>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigationService.navigateSaleForm({ navigation }, { info: "" });
          }}
        >
          <Text>Sale</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigationService.navigateUsersList({ navigation });
          }}
        >
          <Text>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.subtitle}
          onPress={() => {
            navigationService.logout({ navigation });
          }}
        >
          <Text>Cerrar Sesion</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    navigationService.logout({ navigation });
  }
}
