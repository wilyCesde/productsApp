import { url } from "../environments/env";
import axios from "axios";

export class SaleService {
  //getAll
  getAllSale = async () => {
    return await axios.get(`${url}/sale/getAll`);
  };
  //byId
  getSaleById = async (id) => {
    return await axios.get(`${url}/sale/getById/${id}`);
  };
  // create
  createSale = async (sale) => {
    return await axios.post(`${url}/sale/create`, sale);
  };
  // update
  updateSale = async (id, sale) => {
    return await axios.put(`${url}/sale/update/${id}`, sale);
  };
  // delete
  deleteSale = async (id) => {
    return await axios.delete(`${url}/sale/delete/${id}`);
  };
}
