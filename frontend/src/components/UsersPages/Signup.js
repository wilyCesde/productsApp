import { Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { styles } from "../../style/style";
import { Users } from "../../models/users";
import { UsersService } from "../../service/UsersService";
import { NavigationService } from "../../service/NavigationService";

export default function SignUp({ navigation, route }) {
  //#region atributos
  let user = new Users();
  if (route.params.user) user = route.params.user;

  const [users, setUsers] = useState([]);

  const userService = new UsersService();
  const navigationService = new NavigationService();

  const [formData, setFormData] = useState(user);
  const [errorMess, setErrorMess] = useState("");

  //#endregion

  //#region functions

  //#region services
  //create user
  const createUser = async () => {
    userService
      .createUser(formData)
      .then((response) => {
        if (response) {
          setErrorMess("Usuario ingresado con exito.");
          setTimeout(() => {
            setErrorMess("");
            navigationService.logout({ navigation });
          }, 2000);
        }
      })
      .catch((e) => console.log(e));
  };

  const editUser = async () => {
    userService
      .updateUser(user._id, formData)
      .then((response) => {
        if (response) {
          setErrorMess("Usuario actualizado con exito.");
          setTimeout(() => {
            setErrorMess("");
            navigationService.navigateUsersList({ navigation });
          }, 2000);
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {user._id ? `Edit User ${user.username}` : "Sign Up"}
      </Text>
      <Text style={styles.subtitle}>
        {user._id ? `` : "Login to the application"}
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        onChangeText={(e) => onChange(e, "name")}
        defaultValue={user.name ? user.name : formData.name}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Username"
        onChangeText={(e) => onChange(e, "username")}
        defaultValue={user.username ? user.username : formData.username}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        onChangeText={(e) => onChange(e, "email")}
        defaultValue={user.email ? user.email : formData.email}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(e) => onChange(e, "password")}
        defaultValue={user.password ? user.password : formData.password}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (
            formData.name !== "" &&
            formData.username !== "" &&
            formData.email !== "" &&
            formData.password !== ""
          ) {
            user._id ? editUser() : createUser();
          } else {
            setErrorMess("Todos los campos son obligatorios.");
            setTimeout(() => {
              setErrorMess("");
            }, 2000);
          }
        }}
      >
        <Text> {user._id ? `Update` : "Sign Up"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          user._id
            ? navigationService.navigateMenu({ navigation })
            : navigationService.navigateSignin({ navigation });
        }}
      >
        <Text style={styles.text}>
          {user._id ? `Volver al menú` : "¿Ya tienes cuenta?"}
        </Text>
      </TouchableOpacity>

      <Text style={{ fontWeight: "bold", marginTop: 10, color: "black" }}>
        {errorMess}
      </Text>
      <TouchableOpacity
        style={styles.subtitle}
        onPress={() => {
          navigationService.navigateMenu({ navigation });
        }}
      >
        <Text>{user._id ? "Volver al menú" : ""}</Text>
      </TouchableOpacity>
    </View>
  );
}
