import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { URL } from "../../environments/env";
import { styles } from "../../style/style";
import { Users } from "../../models/users";
import { useState } from "react";
import React from "react";
import axios from "axios";

export default function SignIn({ navigation, route }) {
  //#region atributos
  let users = [];
  let user = new Users();
  // let auth = false;

  const [formData, setFormData] = useState(new Users());
  const [errorMess, setErrorMess] = useState("");

  const { handleSubmit, reset } = useForm({
    defaultValues: new Users(),
  });

  //#endregion

  //#region functions

  //#region services
  //get one by email for login
  const getByEmail = async () => {
    await axios
      .get(`${URL}/users/getByEmail/${formData.email}`)
      .then((response) => {
        if (response.data) {
          user = response.data;
          if (user.password === formData.password) {
            setErrorMess("Iniciando sesion...");
            setTimeout(() => {
              navigation.navigate("Products", {
                user: user,
              });
              setErrorMess("");
            }, 1500);
          } else {
            setErrorMess("El usuario no esta registrado");
            setTimeout(() => {
              navigation.navigate("Signup");
              setErrorMess("");
            }, 1500);
          }
        } else {
          setErrorMess("No hay datos para mostrar");
          setTimeout(() => {
            setErrorMess("");
          }, 1500);
        }
      })
      .catch((e) => {
        setErrorMess(e);
        console.log(e);
        setTimeout(() => {
          setErrorMess("");
        }, 1500);
      });
    reset();
  };
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
        onPress={handleSubmit(getByEmail)}
      >
        <Text>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signup", { user: user });
        }}
      >
        <Text style={styles.text}>Don't have an account?</Text>
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold", marginTop: 10, color: "black" }}>
        {errorMess}
      </Text>
    </View>
  );
}
