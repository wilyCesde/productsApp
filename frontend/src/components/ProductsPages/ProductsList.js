import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { URL } from "../../environments/env";
import { styles } from "../../style/style";
import { useState } from "react";
import React from "react";
import axios from "axios";
import { Products } from "../../models/products";
import { Users } from "../../models/users";

export default function ProductsList({ navigation }) {
  //#region atributos
  let products = [];
  let product = new Products();
  let user = new Users();

  const [data, setData] = useState([]);
  //#endregion

  //#region functions

  //#region services

  const getProducts = async () => {
    await axios
      .get(`${URL}/products/getAll`)
      .then((response) => {
        if (response.data) {
          setData(response.data);
        } else {
          console.log("No hay datos para mostrar");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  function editProduct(item) {
    const findProduct = data.find((x) => x._id === item._id);
    if (data && findProduct) {
      navigation.navigate("Products", { product: findProduct, user: user });
    }
  }
  //#endregion

  //#region events
  //#endregion

  //#endregion

  //#region front ("HTML")
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products List</Text>
      <TouchableOpacity onPress={getProducts}>
        <Text style={styles.subtitle}>Vender los productos - Click aquí</Text>
      </TouchableOpacity>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                editProduct(item);
              }}
            >
              <Text style={styles.item}>
                {item.name} - {item.price} | Click to Sale
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
        />
      </SafeAreaView>
    </View>
  );
}
//#endregion
