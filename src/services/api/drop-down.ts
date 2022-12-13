import { apiURL } from "../../enivironment";
import { DROP_DOWN } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const getAllDropDown = async ({ queryKey }: any) => {
  const [, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${DROP_DOWN}/?page=${page}&itemsPerPage=${itemsPerPage}&orderBy=Id|DESC`
  );
  return res.data;
};

export const getSearchDropDown = async ({ queryKey }: any) => {
  const [, searchKey, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${DROP_DOWN}/search?searchKey=${searchKey}&page=${page}&itemsPerPage=${itemsPerPage}&orderBy=Id|DESC`
  );
  return res?.data;
};

export const getSearchDropDownMutate = async (body: any) => {
  // const [, searchKey, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${DROP_DOWN}/search?searchKey=${body.searchKey}&page=${body.page}&itemsPerPage=${body.itemsPerPage}&orderBy=Id|DESC`
  );
  return res?.data;
};

export const addNewDropDown = async (body: any) => {
  const res = await axiosInstance.post(apiURL + DROP_DOWN, body);
  return res?.data;
};

export const deleteDropDown = async (body: any) => {
  const res = await axiosInstance.delete(`${apiURL}${DROP_DOWN}/${body.id}`);
  return res?.data;
};

export const editDropDown = async (body: any) => {
  console.log(body);
  console.log(body.id);
  const res = await axiosInstance.put(`${apiURL}${DROP_DOWN}/${body.id}`, body);
  return res?.data;
};

export const getDropDownById = async ({ queryKey }: any) => {
  const [, id] = queryKey;
  const res = await axiosInstance.get(`${apiURL}${DROP_DOWN}/${id}`);
  return res?.data;
};

export const getDropDownByIdMutate = async (body: any) => {
  const res = await axiosInstance.get(`${apiURL}${DROP_DOWN}/${body.id}`);
  return res?.data;
};
