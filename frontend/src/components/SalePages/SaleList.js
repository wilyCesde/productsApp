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
import { Sale } from "../../models/sale";
import { SaleService } from "../../service/SaleService";

export default function ProductsList({ navigation }) {
  //#region atributos
  const saleService = new SaleService();
  const navigationService = new NavigationService();

  let sale = new Sale();

  const [sales, setSales] = useState([]);
  const [errorMess, setErrorMess] = useState("");
  //#endregion

  //#region functions

  //#region storage

  //#endregion

  //#region services

  const getSales = async () => {
    await saleService
      .getAllSale()
      .then((response) => {
        if (response.data) {
          setSales(response.data);
        }
      })
      .catch((e) => console.log(e));
  };

  async function deleteSale(sale) {
    await saleService
      .deleteSale(sale._id)
      .then((response) => {
        if (response) {
          setErrorMess("Venta eliminada...");
          setTimeout(() => {
            navigationService.navigateSaleList({ navigation });
            setErrorMess("");
          }, 2000);
        } else {
          setErrorMess("No se pudo eliminar...");
          setTimeout(() => {
            navigationService.navigateSaleList({ navigation });
            setErrorMess("");
          }, 2000);
        }
      })
      .catch((e) => console.log(e));
  }
  //#endregion

  //#region events

  //#endregion

  //#endregion
  //#region front ("HTML")
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sale List</Text>
      <TouchableOpacity onPress={getSales}>
        <Text style={styles.subtitle}>Gestiona las ventas - Click aquí</Text>
      </TouchableOpacity>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={sales}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                deleteSale(item);
              }}
            >
              <Text style={styles.item}>
                {item.username} - {item.product} - {item.price} | Click to
                Delete
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
