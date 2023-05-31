import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { styles } from "../style/style";

export default function Products({ navigation }) {
  // if (auth && user) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products by</Text>
      <Text style={styles.subtitle}>Auth</Text>
    </View>
  );
  // } else {
  //   navigation.navigate("Signin");
  // }
}
