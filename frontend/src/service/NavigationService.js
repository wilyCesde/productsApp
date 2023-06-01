import AsyncStorage from "@react-native-async-storage/async-storage";

// localstorage
const USERS_INFO = "@userInfo";
const AUTH_INFO = "@authInfo";

export class NavigationService {
  navigateMenu = ({ navigation }) => {
    navigation.navigate("Menu");
  };
  navigateProductsForm = ({ navigation }) => {
    navigation.navigate("ProductsForm");
  };
  navigateProductsList = ({ navigation }) => {
    navigation.navigate("ProductsList");
  };
  navigateSaleForm = ({ navigation }) => {
    navigation.navigate("SaleForm");
  };
  navigateSaleList = ({ navigation }) => {
    navigation.navigate("SaleList");
  };
  navigateSignin = ({ navigation }) => {
    navigation.navigate("Signin");
  };
  navigateSignup = ({ navigation }) => {
    navigation.navigate("Signup");
  };
  navigateUsersList = ({ navigation }) => {
    navigation.navigate("UsersList");
  };
  logout = async ({ navigation }) => {
    await AsyncStorage.removeItem(USERS_INFO);
    await AsyncStorage.removeItem(AUTH_INFO);
    navigation.navigate("Signin");
  };
}
