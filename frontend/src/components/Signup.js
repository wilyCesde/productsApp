import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import { styles } from "../style/style";

export default function SignUp(navigation) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Create an account</Text>
      <TextInput style={styles.textInput} placeholder="Name" />
      <TextInput style={styles.textInput} placeholder="Username" />
      <TextInput style={styles.textInput} placeholder="Email" />
      <TextInput style={styles.textInput} placeholder="Password" />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Signin");
        }}
      >
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signin");
        }}
      >
        <Text style={styles.text}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
}
