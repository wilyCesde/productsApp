import AsyncStorage from "@react-native-async-storage/async-storage";

// localstorage
const USERS_INFO = "@userInfo";
const PRODUCTS_INFO = "@productInfo";
const SALES_INFO = "@saleInfo";

export class NavigationService {
  navigateMenu = ({ navigation }) => {
    navigation.navigate("Menu");
  };
  navigateProductsForm = ({ navigation }, params) => {
    navigation.navigate("ProductsForm", { product: params });
  };
  navigateProductsList = ({ navigation }) => {
    navigation.navigate("ProductsList");
  };
  navigateSaleForm = ({ navigation }, params) => {
    navigation.navigate("SaleForm", { info: params });
  };
  navigateSaleList = ({ navigation }) => {
    navigation.navigate("SaleList");
  };
  navigateSignin = ({ navigation }) => {
    navigation.navigate("Signin");
  };
  navigateSignup = ({ navigation }, params) => {
    navigation.navigate("Signup", { user: params });
  };
  navigateUsersList = ({ navigation }) => {
    navigation.navigate("UsersList");
  };
  logout = async ({ navigation }) => {
    await AsyncStorage.removeItem(USERS_INFO);
    await AsyncStorage.removeItem(PRODUCTS_INFO);
    await AsyncStorage.removeItem(SALES_INFO);
    navigation.navigate("Signin");
  };
}
