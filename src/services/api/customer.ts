import { apiURL } from "../../enivironment";
import { CUSTOMER_DETAILS, CUSTOMER_INFO } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const getCustomerDetailSearch = async ({ queryKey }: any) => {
  const [, dateFrom, dateTo, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    // `${apiURL}${CUSTOMER_DETAILS}?phoneNumber=&dateFrom=${dateFrom}&dateTo=${dateTo}&page=${page}&itemsPerPage=${itemsPerPage}`
    `${apiURL}${CUSTOMER_DETAILS}?phoneNumber=&dateFrom=2021-12-10&dateTo=2022-12-11&page=1&itemsPerPage=100`
  );
  return res?.data;
};

export const getCustomerDetailSearchByNumber = async ({ queryKey }: any) => {
  const [, phoneNumber] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${CUSTOMER_DETAILS}?phoneNumber=${phoneNumber}`
  );
  return res?.data;
};

export const getCustomerDetailSearchMutate = async (body: any) => {
  const res = await axiosInstance.get(
    // `${apiURL}${CUSTOMER_DETAILS}?phoneNumber=08036975694`
    `${apiURL}${CUSTOMER_DETAILS}?phoneNumber=${body.phoneNumber}`
  );
  return res?.data;
};

export const addNewCustomerInfo = async (body: any) => {
  const res = await axiosInstance.post(apiURL + CUSTOMER_INFO, body);
  return res?.data;
};
