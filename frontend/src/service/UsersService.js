import { url } from "../environments/env";
import axios from "axios";

export class UsersService {
  //getAll
  getAllUsers = async () => {
    return await axios.get(`${url}/users/getAll`);
  };
  //byId
  getUserById = async (id) => {
    return await axios.get(`${url}/users/getById/${id}`);
  };
  //byEmail
  getUserByEmail = async (email) => {
    return await axios.get(`${url}/users/getByEmail/${email}`);
  };
  // create
  createUser = async (user) => {
    return await axios.post(`${url}/users/create`, user);
  };
  // update
  updateUser = async (user) => {
    return await axios.put(`${url}/users/create`, user);
  };
  // delete
  deleteUser = async (id) => {
    return await axios.delete(`${url}/users/create/${id}`);
  };
}
