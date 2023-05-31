import React from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { styles } from "../style/style";
import axios from "axios";
import { URL } from "../environments/env";
import { Users } from "../models/users";

export default function SignIn({ navigation }) {
  //#region atributos
  let users = [];
  let user = new Users();
  let auth = false;

  const [formData, setFormData] = useState(new Users());
  const [errorMess, setErrorMess] = useState("");

  //#endregion

  //#region functions

  //#region services
  //get all users in the collection
  async function getUsers() {
    await axios
      .get(`${URL}/users/getAll`)
      .then((response) => {
        if (response.data) {
          users = response.data;
        }
        console.log(users);
      })
      .catch((e) => {
        // Podemos mostrar los errores en la consola
        console.log(e);
      });
  }
  //get one user in the collection
  async function getById(id) {
    await axios
      .get(`${URL}/users/getById/${id}`)
      .then((response) => {
        if (response.data) {
          user = response.data;
          if (user) {
            console.log(user);
            return user;
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  //get one by email for login
  async function getByEmail(email) {
    await axios
      .get(`${URL}/users/getByEmail/${email}`)
      .then((response) => {
        if (response.data) {
          user = response.data;
          return user;
        } else {
          console.log("No hay datos.");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  //#endregion

  //#region events
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e });
  };
  //#endregion

  //#endregion

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Text style={styles.subtitle}>Login to the application</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={(e) => onChange(e, "email")}
        defaultValue={formData.email}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        onChangeText={(e) => onChange(e, "password")}
        defaultValue={formData.password}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (formData.email !== "" && formData.password !== "") {
            let userFind = getByEmail(formData.email);
            if (userFind) {
              setErrorMess("Iniciando sesion...");
              auth = true;
              setTimeout(() => {
                navigation.navigate("Products", {
                  auth: auth,
                  user: user,
                });
              }, 1500);
            }
          } else {
            setErrorMess("Todos los campos son obligatorios.");
            setTimeout(() => {
              setErrorMess("");
            }, 1500);
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
      <Text style={{ fontWeight: "bold", marginTop: 10, color: "red" }}>
        {errorMess}
      </Text>
    </View>
  );
}
