import { apiURL } from "../../enivironment";
import { GET_USER, EDIT_USER_INFO, CHANGE_PASSWORD } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const getUserProfile = async () => {
  const res = await axiosInstance.get(GET_USER);
  return res.data?.message;
};

export const editUserInfo = async (body: any) => {
  const res = await axiosInstance.patch(apiURL + EDIT_USER_INFO, body);
  return res.data?.message;
};

export const changePassword = async (body: any) => {
  const res = await axiosInstance.post(apiURL + CHANGE_PASSWORD, body);

  return res.data?.message;
};
