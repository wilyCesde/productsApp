import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { styles } from "../../style/style";
import { Users } from "../../models/users";
import { useEffect, useState } from "react";
import { NavigationService } from "../../service/NavigationService";
import { Sale } from "../../models/sale";
import { SaleService } from "../../service/SaleService";
import { Products } from "../../models/products";
import { SelectList } from "react-native-dropdown-select-list";
import { UsersService } from "../../service/UsersService";
import { ProductsService } from "../../service/ProductsService";

// localstorage
const PRODUCT_INFO = "@productInfo";
const SALE_INFO = "@saleInfo";

export default function SaleFrom({ navigation, route }) {
  //#region atributos
  // const [sales, setSales] = useState([]);
  // const [sale, setSale] = useState(new Sale());
  let sale = new Sale();
  let sales = [];

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const [selected, setSelected] = useState([]);

  const navigationService = new NavigationService();
  const saleService = new SaleService();
  const userService = new UsersService();
  const productsService = new ProductsService();

  const [formData, setFormData] = useState(sale);
  const [errorMess, setErrorMess] = useState("");

  const { handleSubmit, reset } = useForm({
    defaultValues: new Users(),
  });
  //#endregion

  //#region functions

  //#region services
  const getUsers = async () => {
    await userService
      .getAllUsers()
      .then((response) => {
        if (response.data) {
          let newArray = response.data.map((item) => {
            return { key: item.id, value: item.username };
          });
          if (newArray) setUsers(newArray);
        }
      })
      .catch((e) => console.log(e));
  };
  const getProducts = async () => {
    await productsService
      .getAllProducts()
      .then((response) => {
        if (response.data) {
          let newArray = response.data.map((item) => {
            return { key: item._id, value: item.name };
          });
          if (newArray) setProducts(newArray);
        }
      })
      .catch((e) => console.log(e));
  };
  //create user
  const createSale = async () => {
    await saleService
      .createSale(formData)
      .then((response) => {
        if (response) {
          setErrorMess("Venta agregada con exito.");
          setTimeout(() => {
            setErrorMess("");
            navigationService.logout({ navigation });
          }, 2000);
        }
      })
      .catch((e) => console.log(e));
  };

  const updateSale = async () => {
    await saleService
      .updateSale(sale._id, formData)
      .then((response) => {
        if (response) {
          setErrorMess("Venta actualizada con exito.");
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
    getUsers();
    getProducts();
  }, []);
  //#endregion

  //#endregion
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sale._id ? `Update` : "Add"}</Text>
      <Text style={styles.subtitle}>
        {sale._id ? `` : "Ingresa un producto"}
      </Text>
      <SelectList
        setSelected={(value) => {
          if (value) sale.product = value;
        }}
        onSelect={() => console.log(sale)}
        data={products}
        save="value"
      />
      <SelectList
        setSelected={(value) => {
          if (value) sale.username = value;
          console.log(sale);
        }}
        onSelect={() => console.log(sale)}
        data={users}
        save="value"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (formData.name !== "" && formData.price !== "") {
            sale._id ? updateSale() : createSale();
          } else {
            setErrorMess("Todos los campos son obligatorios.");
            setTimeout(() => {
              setErrorMess("");
            }, 2000);
          }
        }}
      >
        <Text> {sale._id ? `Update` : "Add"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          sale._id
            ? navigationService.navigateMenu({ navigation })
            : navigationService.navigateProductsList({ navigation });
        }}
      >
        <Text style={styles.text}>
          {sale._id ? "Volver al menú" : `Seleccionar productos`}
        </Text>
      </TouchableOpacity>

      <Text style={{ fontWeight: "bold", marginTop: 10, color: "black" }}>
        {errorMess}
      </Text>
    </View>
  );
}
