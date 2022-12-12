import { apiURL } from "../../enivironment";
import { CUSTOMER_DETAILS } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const getCustomerDetailSearch = async ({ queryKey }: any) => {
  const [, phoneNumber] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${CUSTOMER_DETAILS}?phoneNumber=08036975694`
    // `${apiURL}${CUSTOMER_DETAILS}?phoneNumber=${phoneNumber}`
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
