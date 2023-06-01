import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { Products } from "../../models/products";
import { url } from "../../environments/env";
import { styles } from "../../style/style";
import { useState } from "react";
import React from "react";
import axios from "axios";

export default function SaleForm({ navigation, route }) {
  //#region atributos
  let products = [];
  let product = route.params.product;
  let user = route.params.user;

  const [formData, setFormData] = useState(new Products());
  const [errorMess, setErrorMess] = useState("");

  const { handleSubmit, reset } = useForm({
    defaultValues: new Products(),
  });
  //#endregion

  //#region functions

  //#region services
  //get one by email for login
  async function getAllProducts() {
    await axios
      .get(`${url}/products/getAll`)
      .then((response) => {
        products = response.data;
      })
      .catch((e) => {
        setErrorMess(e);
        console.log(e);
        setTimeout(() => {
          setErrorMess("");
        }, 1500);
      });
  }

  const createProduct = async () => {
    getAllProducts();
    if (formData.name !== "" && formData.price !== "") {
      if (products) {
        const findProduct = products.find((x) => x.name === formData.name);
        if (findProduct) {
          setErrorMess("El producto ya esta registrado");
          setTimeout(() => {
            setErrorMess("");
          }, 2000);
        } else {
          await axios
            .post(`${url}/products/create`, formData)
            .then((response) => {
              if (response.data) {
                setErrorMess("Producto registrado con exito.");
                setTimeout(() => {
                  setErrorMess("");
                }, 2000);
                reset();
              }
            })
            .catch((e) => {
              console.log(e);
              setErrorMess(e);
              setTimeout(() => {
                setErrorMess("");
              }, 2000);
            });
        }
      }
    } else {
      setErrorMess("Todos los campos son obligatorios.");
      setTimeout(() => {
        setErrorMess("");
      }, 2000);
    }
    reset();
  };
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
