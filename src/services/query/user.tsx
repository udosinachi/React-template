import { useMutation, useQuery } from "react-query";
import {
  getAllUserInfo,
  addNewUserInfo,
  deleteUserInfo,
  getUserInfoById,
  editUserInfo,
  getUserInfoByIdMutate,
} from "../api/user";
import {
  GET_ALL_USER_INFO,
  ADD_USER_INFO,
  DELETE_USER_INFO,
  EDIT_USER_INFO,
  GET_USER_INFO,
} from "../queryKeys";

export const useGetAllUserInfo = (
  page: number,
  itemPerPage: number,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_ALL_USER_INFO, page, itemPerPage],
    getAllUserInfo,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useAddNewUserInfo = (options = {}) => {
  const { mutate, isLoading } = useMutation(addNewUserInfo, {
    mutationKey: ADD_USER_INFO,
    ...options,
  });
  return { mutate, isLoading };
};

export const useDeleteUserInfo = (options = {}) => {
  const { mutate, isLoading } = useMutation(deleteUserInfo, {
    mutationKey: DELETE_USER_INFO,
    ...options,
  });
  return { mutate, isLoading };
};

export const useEditUserInfo = (options = {}) => {
  const { mutate, isLoading } = useMutation(editUserInfo, {
    mutationKey: EDIT_USER_INFO,
    ...options,
  });
  return { mutate, isLoading };
};

export const useGetUserInfoById = (id: any, options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_USER_INFO, id],
    getUserInfoById,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetUserInfoByIdMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getUserInfoByIdMutate, {
    mutationKey: GET_USER_INFO,
    ...options,
  });
  return { mutate, isLoading };
};
