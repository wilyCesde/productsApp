import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../../style/style";
import React from "react";
// service
import { NavigationService } from "../../service/NavigationService";
import { Users } from "../../models/users";
import { StorageData } from "../../service/StorageDataService";
import { Auth } from "../../models/auth";
// models

// localstorage
const USERS_INFO = "@userInfo";
const AUTH_INFO = "@authInfo";

export default function Menu({ navigation }) {
  let user = new Users();
  let users = [];
  let auth = new Auth();
  const navigationService = new NavigationService();
  const storageData = new StorageData();

  const getUser = async () => {
    users = await storageData.getDataStorage(USERS_INFO, users);
    if (users) {
      user = users[0];
      console.log(user);
    }
  };

  const getAuth = async () => {
    auth = await storageData.getDataStorage(AUTH_INFO, auth);
    if (auth) {
      console.log(auth);
    }
  };

  getUser();
  getAuth();

  if (
    users === undefined ||
    auth === undefined ||
    users === null ||
    auth === null
  ) {
    navigationService.logout({ navigation });
  } else {
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
            navigationService.navigateSaleForm({ navigation });
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
  }
}
