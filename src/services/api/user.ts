import { apiURL } from "../../enivironment";
import { GET_ALL_USER_INFO } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const getAllUserInfo = async ({ queryKey }: any) => {
  const [, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${GET_ALL_USER_INFO}/?page=${page}&itemsPerPage=${itemsPerPage}&orderBy=Id|DESC`
  );
  return res.data;
};

export const addNewUserInfo = async (body: any) => {
  const res = await axiosInstance.post(apiURL + GET_ALL_USER_INFO, body);
  return res?.data;
};

export const deleteUserInfo = async (body: any) => {
  const res = await axiosInstance.delete(
    `${apiURL}${GET_ALL_USER_INFO}/${body.id}`
  );
  return res?.data;
};

export const editUserInfo = async (body: any) => {
  console.log(body);
  console.log(body.id);
  const res = await axiosInstance.put(
    `${apiURL}${GET_ALL_USER_INFO}/${body.id}`,
    body
  );
  return res?.data;
};

export const getUserInfoById = async ({ queryKey }: any) => {
  const [, id] = queryKey;
  const res = await axiosInstance.get(`${apiURL}${GET_ALL_USER_INFO}/${id}`);
  return res?.data;
};

export const getUserInfoByIdMutate = async (body: any) => {
  const res = await axiosInstance.get(
    `${apiURL}${GET_ALL_USER_INFO}/${body.id}`
  );
  // console.log(res?.data);
  // console.log(body?.id);
  return res?.data;
};