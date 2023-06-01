import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { Products } from "../../models/products";
import { styles } from "../../style/style";
import { Users } from "../../models/users";
import { useState } from "react";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Sale } from "../../models/sale";
import { UsersService } from "../../service/UsersService";
import { NavigationService } from "../../service/NavigationService";
import { StorageData } from "../../service/StorageDataService";
import { Auth } from "../../models/auth";

// localstorage
const USERS_INFO = "@userInfo";
const AUTH_INFO = "@authInfo";
const PRODUCT_INFO = "@productInfo";
const SALE_INFO = "@saleInfo";

export default function SignIn({ navigation }) {
  //#region atributos
  let users = [];
  let user = new Users();
  let auth = new Auth();

  const userService = new UsersService();
  const navigationService = new NavigationService();
  const storageData = new StorageData();

  const [formData, setFormData] = useState(new Users());
  const [errorMess, setErrorMess] = useState("");

  const { handleSubmit, reset } = useForm({
    defaultValues: new Users(),
  });

  //#endregion

  //#region functions
  const getUser = async () => {
    const dataUser = await storageData.getDataStorage(USERS_INFO, users);
    const authUser = await storageData.getDataStorage(USERS_INFO, auth);
    console.log(authUser);
    console.log(dataUser);
  };

  //#region services
  const getUserByEmail = async () => {
    await userService
      .getUserByEmail(formData.email)
      .then((response) => {
        if (response.data && formData.password === response.data.password) {
          user = response.data;
          auth.auth = true;
          const dataStorage = storageData.postDataStorage(USERS_INFO, user);
          const authValidate = storageData.postDataStorage(AUTH_INFO, auth);

          if (dataStorage && authValidate) {
            setErrorMess("Iniciando sesión...");
            setTimeout(() => {
              navigationService.navigateMenu({ navigation });
              setErrorMess("");
            }, 1500);
          } else {
            setErrorMess("No se pudo ingresar los datos");
          }
        } else {
          user = new Users();
        }
      })
      .catch((e) => console.log(e));
  };
  //#endregion

  //#region events
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e });
  };
  //#endregion

  //#endregion
  getUser();

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
        secureTextEntry={true}
        onChangeText={(e) => onChange(e, "password")}
        defaultValue={formData.password}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (formData.email !== "" && formData.password !== "") {
            getUserByEmail();
          } else {
            setErrorMess("Todos los campos son obligatorios");
            setTimeout(() => {
              reset();
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
      <Text style={{ fontWeight: "bold", marginTop: 10, color: "black" }}>
        {errorMess}
      </Text>
    </View>
  );
}
