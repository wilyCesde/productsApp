import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { URL } from "../../environments/env";
import { styles } from "../../style/style";
import { Users } from "../../models/users";
import { useState } from "react";
import React from "react";
import axios from "axios";

export default function SignUp({ navigation, route }) {
  //#region atributos
  let users = [];
  let user = new Users();
  let { _id, name, username, email, password } = route.params.user;

  const [formData, setFormData] = useState(new Users());
  const [errorMess, setErrorMess] = useState("");

  const { handleSubmit, reset } = useForm({
    defaultValues: new Users(),
  });

  //#endregion

  //#region functions

  //#region services
  //create user
  const createUser = async () => {
    if (
      formData.name !== "" &&
      formData.username !== "" &&
      formData.email !== "" &&
      formData.password !== ""
    ) {
      await axios
        .post(`${URL}/users/create`, formData)
        .then((response) => {
          if (response) {
            setErrorMess("Usuario ingresado con exito.");
            setTimeout(() => {
              navigation.navigate("Signin");
              setErrorMess("");
            }, 2000);
          }
        })
        .catch((e) => {
          console.log(e);
          setErrorMess(e);
          setTimeout(() => {
            setErrorMess("");
          }, 2000);
        });
    } else {
      setErrorMess("Todos los campos son obligatorios.");
      setTimeout(() => {
        setErrorMess("");
      }, 2000);
    }
    reset();
  };

  const editUser = async () => {
    if (
      formData.name !== "" &&
      formData.username !== "" &&
      formData.email !== "" &&
      formData.password !== ""
    ) {
      await axios
        .put(`${URL}/users/update`, formData)
        .then((response) => {
          if (response) {
            setErrorMess("Usuario ingresado con exito.");
            setTimeout(() => {
              navigation.navigate("Signin");
              setErrorMess("");
            }, 2000);
          }
        })
        .catch((e) => {
          console.log(e);
          setErrorMess(e);
          setTimeout(() => {
            setErrorMess("");
          }, 2000);
        });
    } else {
      setErrorMess("Todos los campos son obligatorios.");
      setTimeout(() => {
        setErrorMess("");
      }, 2000);
    }
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
      <Text style={styles.title}>
        {_id ? `Edit User ${username}` : "Sign Up"}
      </Text>
      <Text style={styles.subtitle}>
        {_id ? `` : "Login to the application"}
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        onChangeText={(e) => onChange(e, "name")}
        defaultValue={name ? name : formData.name}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        onChangeText={(e) => onChange(e, "username")}
        defaultValue={username ? username : formData.username}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={(e) => onChange(e, "email")}
        defaultValue={email ? email : formData.email}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(e) => onChange(e, "password")}
        defaultValue={password ? password : formData.password}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={_id ? handleSubmit(editUser) : handleSubmit(createUser)}
      >
        <Text>{_id ? "Edit User" : "Sign Up"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signin");
        }}
      >
        <Text style={styles.text}>¿Ya tienes una cuenta?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("UsersList");
        }}
      >
        <Text style={styles.text}>Lista de usuarios</Text>
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold", marginTop: 10, color: "black" }}>
        {errorMess}
      </Text>
    </View>
  );
}
