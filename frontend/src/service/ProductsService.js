import { url } from "../environments/env";
import axios from "axios";

export class ProductsService {
  //getAll
  getAllProducts = async () => {
    return await axios.get(`${url}/products/getAll`);
  };
  //byId
  getProductById = async (id) => {
    return await axios.get(`${url}/products/getById/${id}`);
  };
  // create
  createProduct = async (product) => {
    return await axios.post(`${url}/products/create`, product);
  };
  // update
  updateProduct = async (id, product) => {
    return await axios.put(`${url}/products/update/${id}`, product);
  };
  // delete
  deleteProduct = async (id) => {
    return await axios.delete(`${url}/products/delete/${id}`);
  };
}
