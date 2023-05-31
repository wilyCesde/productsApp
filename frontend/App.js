import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import SignIn from "./src/components/Singin";
import SignUp from "./src/components/signup";
import Products from "./src/components/products";
import Sale from "./src/components/sale";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Signin" component={SignIn} />
        {/* <Stack.Screen name="Signup" component={SignUp} /> */}
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="Sale" component={Sale} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
