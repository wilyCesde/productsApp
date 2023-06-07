import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../style/style";
import React, { useState } from "react";
import { NavigationService } from "../../service/NavigationService";
import { Products } from "../../models/products";
import { ProductsService } from "../../service/ProductsService";

export default function ProductsList({ navigation }) {
  //#region atributos
  const productsService = new ProductsService();
  const navigationService = new NavigationService();

  let product = new Products();
  // let products = []

  const [products, setProducts] = useState([]);
  const [errorMess, setErrorMess] = useState("");
  //#endregion

  //#region functions

  //#region storage

  //#endregion

  //#region services

  const getProducts = async () => {
    await productsService
      .getAllProducts()
      .then((response) => {
        if (response.data) {
          setProducts(response.data);
        }
      })
      .catch((e) => console.log(e));
  };

  async function updateProduct(id) {
    const findProduct = products.find((x) => x._id === id);
    if (products && findProduct) {
      setErrorMess("Producto seleccionado...");
      setTimeout(() => {
        navigationService.navigateProductsForm({ navigation }, findProduct);
        setErrorMess("");
      }, 2000);
    } else {
      setErrorMess("Intenta nuevamente...");
      setTimeout(() => {
        setErrorMess("");
      }, 1000);
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
        <Text style={styles.subtitle}>Gestiona los productos - Click aquí</Text>
      </TouchableOpacity>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                updateProduct(item._id);
              }}
            >
              <Text style={styles.item}>
                {item.name} - {item.price} | Click to Edit
              </Text>
            </TouchableOpacity>
          )}
          // keyExtractor={(item) => item._id}
        />
      </SafeAreaView>
      <TouchableOpacity
        style={styles.subtitle}
        onPress={() => {
          navigationService.navigateMenu({ navigation });
        }}
      >
        <Text>Volver al menú</Text>
      </TouchableOpacity>
      <Text style={{ fontWeight: "bold", color: "black" }}>{errorMess}</Text>
    </View>
  );
}
//#endregion
