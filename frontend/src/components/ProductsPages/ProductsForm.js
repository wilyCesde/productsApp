import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { styles } from "../../style/style";
import { Users } from "../../models/users";
import { useEffect, useState } from "react";
import { NavigationService } from "../../service/NavigationService";
import { StorageData } from "../../service/StorageDataService";
import { Products } from "../../models/products";
import { ProductsService } from "../../service/ProductsService";

// localstorage
const PRODUCT_INFO = "@productInfo";

export default function ProductsForm({ navigation }) {
  //#region atributos
  const productsService = new ProductsService();
  const navigationService = new NavigationService();
  const storageData = new StorageData();

  let productStorage = new Users();
  let productsStorage = [];

  let product = new Products();
  // let products = [];

  const [formData, setFormData] = useState(product);
  const [errorMess, setErrorMess] = useState("");

  const { handleSubmit, reset } = useForm({
    defaultValues: product,
  });
  //#endregion

  //#region functions

  const getProductsStorage = async () => {
    await storageData
      .getDataStorage(PRODUCT_INFO)
      .then((response) => {
        if (response) {
          productsStorage = JSON.parse(response);
          if (productsStorage) {
            productStorage = productsStorage[0];
            if (productStorage) {
              product = productStorage;
            }
          }
        } else {
          navigationService.navigateProductsForm({ navigation });
        }
      })
      .catch((e) => console.log(e));
  };

  //#region services
  //create user
  const createProduct = async () => {
    productsService
      .createProduct(formData)
      .then((response) => {
        if (response) {
          setErrorMess("Producto agregado con exito.");
          setTimeout(() => {
            setErrorMess("");
            navigationService.logout({ navigation });
          }, 2000);
        }
      })
      .catch((e) => console.log(e));
  };

  const updateProduct = async () => {
    productsService
      .updateProduct(product._id, formData)
      .then((response) => {
        if (response) {
          setErrorMess("Producto actualizado con exito.");
          setTimeout(() => {
            setErrorMess("");
            navigationService.navigateUsersList({ navigation });
          }, 2000);
        }
      })
      .catch((e) => console.log(e));
  };
  //#endregion

  //#region events
  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e });
  };

  useEffect(() => {
    getProductsStorage();
  }, []);
  //#endregion

  //#endregion
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product._id ? `Update` : "Add"}</Text>
      <Text style={styles.subtitle}>
        {product._id ? `` : "Ingresa un producto"}
      </Text>
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        onChangeText={(e) => onChange(e, "name")}
        defaultValue={product.name}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Price"
        onChangeText={(e) => onChange(e, "price")}
        defaultValue={product.price}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (formData.name !== "" && formData.price !== "") {
            product._id ? updateProduct() : createProduct();
          } else {
            setErrorMess("Todos los campos son obligatorios.");
            setTimeout(() => {
              setErrorMess("");
            }, 2000);
          }
        }}
      >
        <Text> {product._id ? `Update` : "Add"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigationService.navigateProductsList({ navigation });
        }}
      >
        <Text style={styles.text}>Seleccionar productos</Text>
      </TouchableOpacity>

      <Text style={{ fontWeight: "bold", marginTop: 10, color: "black" }}>
        {errorMess}
      </Text>
      <TouchableOpacity
        style={styles.subtitle}
        onPress={() => {
          navigationService.navigateMenu({ navigation });
        }}
      >
        <Text>Volver al menú</Text>
      </TouchableOpacity>
    </View>
  );
}
