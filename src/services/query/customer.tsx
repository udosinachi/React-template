import { useMutation, useQuery } from "react-query";
import {
  getCustomerDetailSearch,
  getCustomerDetailSearchMutate,
} from "../api/customer";

import { CUSTOMER_DETAILS } from "../queryKeys";

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
