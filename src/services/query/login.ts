import { useMutation } from "react-query";
import { getLogin, getLoginAccount } from "../api/login";
import { LOGIN_KEY, LOGIN_ACCOUNT } from "../queryKeys";

export const useLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(getLogin, {
    mutationKey: LOGIN_KEY,
    ...options,
  });
  return { mutate, isLoading };
};

export const useLoginAccount = (options = {}) => {
  const { mutate, isLoading } = useMutation(getLoginAccount, {
    mutationKey: LOGIN_ACCOUNT,
    ...options,
  });
  return { mutate, isLoading };
};
