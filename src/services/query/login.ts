import { useMutation } from "react-query";
import { getLogin, getInviteLogin } from "../api/login";
import { LOGIN_KEY, INVITE_LOGIN_KEY } from "../queryKeys";

export const useLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(getLogin, {
    mutationKey: LOGIN_KEY,
    ...options,
  });
  return { mutate, isLoading };
};

export const useInviteLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(getInviteLogin, {
    mutationKey: INVITE_LOGIN_KEY,
    ...options,
  });
  return { mutate, isLoading };
};
