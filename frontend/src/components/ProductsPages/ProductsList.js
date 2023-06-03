import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../style/style";
import { useEffect, useState } from "react";
import React from "react";
import { NavigationService } from "../../service/NavigationService";
import { StorageData } from "../../service/StorageDataService";
import { Products } from "../../models/products";
import { ProductsService } from "../../service/ProductsService";

// localstorage
const PRODUCT_INFO = "@productInfo";

export default function ProductsList({ navigation }) {
  //#region atributos
  const productsService = new ProductsService();
  const navigationService = new NavigationService();
  const storageData = new StorageData();

  let productStorage = new Products();
  let productsStorage = [];

  let product = new Products();
  // let products = []

  const [products, setProducts] = useState([]);
  const [errorMess, setErrorMess] = useState("");
  //#endregion

  //#region functions

  //#region storage

  const getProductsStorage = async () => {
    await storageData
      .getDataStorage(PRODUCT_INFO)
      .then((response) => {
        if (response) {
          productsStorage = JSON.parse(response);
          if (productsStorage) {
            productStorage = productsStorage[0];
          }
        } else {
          navigationService.navigateProductsList({ navigation });
        }
      })
      .catch((e) => console.log(e));
  };

  const postProductStorage = async (product) => {
    if (product) {
      await storageData
        .postDataStorage(PRODUCT_INFO, product)
        .then((response) => {
          console.log(response);
          setErrorMess("Producto seleccionado...");
          setTimeout(() => {
            navigationService.navigateProductsForm({ navigation });
            setErrorMess("");
          }, 2000);
        })
        .catch((e) => console.log(e));
    }
  };

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

  async function updateProduct(item) {
    const findProduct = products.find((x) => x._id === item._id);
    if (products && findProduct) {
      product = findProduct;
      if (product) {
        postProductStorage(product);
      }
    } else {
      setErrorMess("Intenta nuevamente.");
    }
  }
  //#endregion

  //#region events

  useEffect(() => {
    getProductsStorage();
    console.log(product);
  }, []);
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
                updateProduct(item);
              }}
            >
              <Text style={styles.item}>
                {item.name} - {item.price} | Click to Edit
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id}
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
