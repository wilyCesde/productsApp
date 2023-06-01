import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { styles } from "../../style/style";
import { useState } from "react";
import React from "react";

//models
import { Products } from "../../models/products";
import { Users } from "../../models/users";

// localstorage
const USER_INFO = "@userInfo";
const AUTH_INFO = "@authInfo";
const PRODUCT_INFO = "@productInfo";
const SALE_INFO = "@saleInfo";

export default function ProductsForm({ navigation }) {
  //#region atributos
  let products = [];
  let product = new Products();
  let user = new Users();

  const [formData, setFormData] = useState(new Products());
  const [errorMess, setErrorMess] = useState("");

  const { handleSubmit, reset } = useForm({
    defaultValues: new Products(),
  });
  //#endregion

  //#region functions

  //#region services

  //#endregion

  //#region events
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e });
  };
  //#endregion

  //#endregion
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <Text style={styles.subtitle}>Create a product</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        onChangeText={(e) => onChange(e, "name")}
        defaultValue={product.name ? product.name : formData.name}
      />
      <TextInput
        style={styles.textInput}
        placeholder="DateOfPreparation"
        onChangeText={(e) => onChange(e, "dateOfPreparation")}
        editable={false}
        defaultValue={
          product.dateOfPreparation
            ? product.dateOfPreparation
            : formData.dateOfPreparation
        }
      />
      <TextInput
        style={styles.textInput}
        placeholder="Price"
        // keyboardType="numeric"
        onChangeText={(e) => onChange(e, "price")}
        defaultValue={product.price ? product.price : formData.price}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(createProduct)}
      >
        <Text>Create</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProductsList");
        }}
      >
        <Text style={styles.text}>Ver productos</Text>
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold", marginTop: 10, color: "black" }}>
        {errorMess}
      </Text>
    </View>
  );
}
