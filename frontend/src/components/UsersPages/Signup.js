import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { styles } from "../../style/style";
import { Users } from "../../models/users";
import { useState } from "react";
import { UsersService } from "../../service/UsersService";
import { NavigationService } from "../../service/NavigationService";
import { StorageData } from "../../service/StorageDataService";
import { Auth } from "../../models/auth";

// localstorage
const USERS_INFO = "@userInfo";
const AUTH_INFO = "@authInfo";

export default function SignUp({ navigation }) {
  //#region atributos
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(new Users());
  const [auth, setAuth] = useState([]);
  const [authValidate, setAuthValidate] = useState(new Auth());

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
    const authUser = await storageData.getDataStorage(AUTH_INFO, auth);
    if (dataUser && authUser) {
      setUser(dataUser);
      authValidate(authUser);
    }
  };

  //#region services
  //create user
  const createUser = async () => {
    userService
      .createUser()
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
      .updateUser(formData)
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

  getUser();
  //#endregion
  if (
    user.name === null ||
    user.name === undefined ||
    user.password === null ||
    user.password === undefined
  ) {
    navigationService.logout({ navigation });
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {user._id ? `Edit User ${username}` : "Sign Up"}
        </Text>
        <Text style={styles.subtitle}>
          {user._id ? `` : "Login to the application"}
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          onChangeText={(e) => onChange(e, "name")}
          defaultValue={formData.name}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={(e) => onChange(e, "username")}
          defaultValue={formData.username}
        />
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
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigationService.navigateSignin({ navigation });
          }}
        >
          <Text style={styles.text}>¿Ya tienes una cuenta?</Text>
        </TouchableOpacity>

        <Text style={{ fontWeight: "bold", marginTop: 10, color: "black" }}>
          {errorMess}
        </Text>
      </View>
    );
  }
}
