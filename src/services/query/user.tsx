import { useMutation, useQuery } from "react-query";
import {
  getAllUserInfo,
  addNewUserInfo,
  deleteUserInfo,
  getUserInfoById,
  editUserInfo,
  getUserInfoByIdMutate,
  getSearchUserInfo,
  getSearchUserInfoMutate,
  getUserInfoForSupervisor,
  getUserInfoForAgent,
} from "../api/user";
import {
  GET_ALL_USER_INFO,
  ADD_USER_INFO,
  DELETE_USER_INFO,
  EDIT_USER_INFO,
  GET_USER_INFO,
  SEARCH_USER_INFO,
  GET_USER_INFO_SUPERVISOR,
  GET_USER_INFO_AGENTS,
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

export const useGetSearchUserInfo = (
  searchKey: string,
  page: number,
  itemPerPage: number,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [SEARCH_USER_INFO, searchKey, page, itemPerPage],
    getSearchUserInfo,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetSearchUserInfoMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getSearchUserInfoMutate, {
    mutationKey: SEARCH_USER_INFO,
    ...options,
  });
  return { mutate, isLoading };
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

export const useGetUserInfoForSupervisor = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_USER_INFO_SUPERVISOR],
    getUserInfoForSupervisor,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetUserInfoForAgents = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_USER_INFO_AGENTS],
    getUserInfoForAgent,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};
