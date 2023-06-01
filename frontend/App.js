import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import SignIn from "./src/components/UsersPages/Singin";
import SignUp from "./src/components/UsersPages/Signup";
import UsersList from "./src/components/UsersPages/UsersList";
import ProductsForm from "./src/components/ProductsPages/ProductsForm";
import ProductsList from "./src/components/ProductsPages/ProductsList";
import SaleForm from "./src/components/SalePages/SaleForm";
import SaleList from "./src/components/SalePages/SaleList";
import Menu from "./src/components/MenuPage/Menu";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Menu"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Signin" component={SignIn} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="UsersList" component={UsersList} />
        <Stack.Screen name="ProductsForm" component={ProductsForm} />
        <Stack.Screen name="ProductsList" component={ProductsList} />
        <Stack.Screen name="SaleForm" component={SaleForm} />
        <Stack.Screen name="SaleList" component={SaleList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
