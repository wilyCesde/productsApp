import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "../style/style";
import axios from "axios";

export default function SignIn({ navigation }) {
  async function getUsers() {
    const users = await axios.get(`${URL}/users/getAll`);
    if (users) {
      return users;
    } else {
      return `No hay usuarios: ${users}`;
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Login to the application</Text>
      {/* <TextInput style={styles.textInput} placeholder="Email" /> */}
      <TextInput style={styles.textInput} placeholder="Username" />
      <TextInput style={styles.textInput} placeholder="Password" />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          // navigation.navigate("Products");
          const usersLoaded = getUsers();
          if (usersLoaded) {
            console.log(usersLoaded);
          } else {
            console.log(usersLoaded);
          }
        }}
      >
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signup");
        }}
      >
        <Text style={styles.text}>Don't have an account?</Text>
      </TouchableOpacity>
    </View>
  );
}
