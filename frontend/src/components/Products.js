import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "../style/style";

export default function Products({ navigation, route }) {
  let { user } = route.params;

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Products by {user.name}</Text>
        <Text style={styles.subtitle}>Registra un producto.</Text>
      </View>
    );
  } else {
    navigation.navigate("Signin");
  }
}
