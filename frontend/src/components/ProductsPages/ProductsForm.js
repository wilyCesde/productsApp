import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { styles } from "../../style/style";
import { Users } from "../../models/users";
import { useEffect, useState } from "react";
import { NavigationService } from "../../service/NavigationService";
import { StorageData } from "../../service/StorageDataService";
import { Auth } from "../../models/auth";
import { Products } from "../../models/products";
import { ProductsService } from "../../service/ProductsService";

// localstorage
const AUTH_INFO = "@authInfo";
const PRODUCT_INFO = "@productInfo";
const SALE_INFO = "@saleInfo";

export default function ProductsForm({ navigation, route }) {
  //#region atributos
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(new Products());
  const [auth, setAuth] = useState([]);
  const [authValidate, setAuthValidate] = useState(new Auth());

  const productsService = new ProductsService();
  const navigationService = new NavigationService();
  const storageData = new StorageData();

  const [formData, setFormData] = useState(new Users());
  const [errorMess, setErrorMess] = useState("");

  const { handleSubmit, reset } = useForm({
    defaultValues: new Users(),
  });
  //#endregion

  //#region functions

  const getProduct = async () => {
    const dataProduct = await storageData.getDataStorage(PRODUCT_INFO);
    const authUser = await storageData.getDataStorage(AUTH_INFO);
    if (dataProduct && authUser) {
      setProducts(dataProduct);
      setAuth(authUser);
    }
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
    setProduct(route.params.info);
    getProduct();
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
        defaultValue={product.name ? product.name : formData.name}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Date"
        editable={false}
        // onChangeText={(e) => onChange(e, "dateOfPreparation")}
        defaultValue={
          product.dateOfPreparation
            ? product.dateOfPreparation
            : formData.dateOfPreparation
        }
      />
      <TextInput
        style={styles.textInput}
        placeholder="Price"
        onChangeText={(e) => onChange(e, "price")}
        defaultValue={product.price ? product.price : formData.price}
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
          product._id
            ? navigationService.navigateProductsList({ navigation })
            : navigationService.navigateMenu({ navigation });
        }}
      >
        <Text style={styles.text}>
          {product._id ? `Seleccionar productos` : "Volver al menú"}
        </Text>
      </TouchableOpacity>

      <Text style={{ fontWeight: "bold", marginTop: 10, color: "black" }}>
        {errorMess}
      </Text>
    </View>
  );
}
