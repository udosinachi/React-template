import { apiURL } from "../../enivironment";
import { USER_INFO } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const getAllUserInfo = async ({ queryKey }: any) => {
  const [, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${USER_INFO}/?page=${page}&itemsPerPage=${itemsPerPage}&orderBy=Id|DESC`
  );
  return res.data;
};

export const getSearchUserInfo = async ({ queryKey }: any) => {
  const [, searchKey, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${USER_INFO}/search?searchKey=${searchKey}&page=${page}&itemsPerPage=${itemsPerPage}&orderBy=Id|DESC`
  );
  return res?.data;
};

export const getSearchUserInfoMutate = async (body: any) => {
  // const [, searchKey, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${USER_INFO}/search?searchKey=${body.searchKey}&page=${body.page}&itemsPerPage=${body.itemsPerPage}&orderBy=Id|DESC`
  );
  return res?.data;
};

export const addNewUserInfo = async (body: any) => {
  const res = await axiosInstance.post(apiURL + USER_INFO, body);
  return res?.data;
};

export const deleteUserInfo = async (body: any) => {
  const res = await axiosInstance.delete(`${apiURL}${USER_INFO}/${body.id}`);
  return res?.data;
};

export const editUserInfo = async (body: any) => {
  console.log(body);
  console.log(body.id);
  const res = await axiosInstance.put(`${apiURL}${USER_INFO}/${body.id}`, body);
  return res?.data;
};

export const getUserInfoById = async ({ queryKey }: any) => {
  const [, id] = queryKey;
  const res = await axiosInstance.get(`${apiURL}${USER_INFO}/${id}`);
  return res?.data;
};

export const getUserInfoByIdMutate = async (body: any) => {
  const res = await axiosInstance.get(`${apiURL}${USER_INFO}/${body.id}`);
  return res?.data;
};

export const getUserInfoForSupervisor = async (body: any) => {
  const res = await axiosInstance.get(`${apiURL}${USER_INFO}/supervisors`);
  return res?.data;
};

export const getUserInfoForAgent = async (body: any) => {
  const res = await axiosInstance.get(`${apiURL}${USER_INFO}/agents`);
  return res?.data;
};

export const userInfoAgentLogin = async (body: any) => {
  const res = await axiosInstance.post(
    `${apiURL}${USER_INFO}/agentlogin`,
    body
  );
  return res?.data;
};
