import { useMutation, useQuery } from "react-query";
import {
  getCustomerDetailSearch,
  getCustomerDetailSearchMutate,
  addNewCustomerInfo,
} from "../api/customer";

import { CUSTOMER_DETAILS, ADD_CUSTOMER_INFO } from "../queryKeys";

export const useGetCustomerDetailSearch = (
  //   phoneNumber: number,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    // [CUSTOMER_DETAILS, phoneNumber],
    [CUSTOMER_DETAILS],
    getCustomerDetailSearch,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetCustomerDetailSearchMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getCustomerDetailSearchMutate, {
    mutationKey: CUSTOMER_DETAILS,
    ...options,
  });
  return { mutate, isLoading };
};

export const useAddNewUserInfo = (options = {}) => {
  const { mutate, isLoading } = useMutation(addNewCustomerInfo, {
    mutationKey: ADD_CUSTOMER_INFO,
    ...options,
  });
  return { mutate, isLoading };
};
