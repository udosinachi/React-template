import { useMutation, useQuery } from "react-query";
import { getUserProfile, editUserInfo, changePassword } from "../api/user";
import {
  GET_USER_PROFILE,
  EDIT_USER_INFO,
  CHANGE_PASSWORD,
} from "../queryKeys";

export const useGetUserProfile = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_USER_PROFILE],
    getUserProfile,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useEditUserProfile = (options = {}) => {
  const { mutate, isLoading } = useMutation(editUserInfo, {
    mutationKey: EDIT_USER_INFO,
    ...options,
  });
  return { mutate, isLoading };
};

export const useChangePassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(changePassword, {
    mutationKey: CHANGE_PASSWORD,
    ...options,
  });
  return { mutate, isLoading };
};
