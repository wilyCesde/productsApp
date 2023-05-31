import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { URL } from "../../environments/env";
import { styles } from "../../style/style";
import { Users } from "../../models/users";
import React from "react";
import axios from "axios";

export default function UsersList({ navigation, route }) {
  //#region atributos
  let users = [];
  let user = new Users();
  //#endregion

  //#region functions

  //#region services
  const getUsers = async () => {
    await axios
      .get(`${URL}/users/getAll`)
      .then((response) => {
        if (response.data) {
          users = response.data;
          console.log(users);
        } else {
          console.log("No hay datos para mostrar");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //#endregion

  //#region events
  //#endregion

  //#endregion

  //#region front ("HTML")
  if (users) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Users List</Text>

        <SafeAreaView style={styles.container}>
          <FlatList
            data={users}
            renderItem={({ item }) => (
              <Text style={styles.subtitle}>{item.name}</Text>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={getUsers}>
          <Text style={styles.title}>Gestiona los usuarios</Text>
        </TouchableOpacity>
      </View>
    );
  }
  //#endregion
}
