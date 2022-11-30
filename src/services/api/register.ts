import axios from "axios";
import { apiURL } from "../../enivironment";
import { REGISTER } from "../apiUrl";

export const createUser = async (body: any) => {
  const res = await axios.post(apiURL + REGISTER, body);
  return res.data;
};
