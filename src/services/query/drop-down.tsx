import { useMutation, useQuery } from "react-query";

import {
  GET_ALL_DROP_DOWN,
  GET_DROP_DOWN,
  ADD_DROP_DOWN,
  DELETE_DROP_DOWN,
  SEARCH_DROP_DOWN,
  EDIT_DROP_DOWN,
} from "../queryKeys";
import {
  getAllDropDown,
  getDropDownById,
  getDropDownByIdMutate,
  getSearchDropDown,
  getSearchDropDownMutate,
  addNewDropDown,
  deleteDropDown,
  editDropDown,
} from "../api/drop-down";

export const useGetAllDropDown = (
  page: number,
  itemPerPage: number,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_ALL_DROP_DOWN, page, itemPerPage],
    getAllDropDown,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetSearchDropDown = (
  searchKey: string,
  page: number,
  itemPerPage: number,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [SEARCH_DROP_DOWN, searchKey, page, itemPerPage],
    getSearchDropDown,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetSearchDropDownMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getSearchDropDownMutate, {
    mutationKey: SEARCH_DROP_DOWN,
    ...options,
  });
  return { mutate, isLoading };
};

export const useAddNewDropDown = (options = {}) => {
  const { mutate, isLoading } = useMutation(addNewDropDown, {
    mutationKey: ADD_DROP_DOWN,
    ...options,
  });
  return { mutate, isLoading };
};

export const useDeleteDropDown = (options = {}) => {
  const { mutate, isLoading } = useMutation(deleteDropDown, {
    mutationKey: DELETE_DROP_DOWN,
    ...options,
  });
  return { mutate, isLoading };
};

export const useEditDropDown = (options = {}) => {
  const { mutate, isLoading } = useMutation(editDropDown, {
    mutationKey: EDIT_DROP_DOWN,
    ...options,
  });
  return { mutate, isLoading };
};

export const useGetDropDownById = (id: any, options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_DROP_DOWN, id],
    getDropDownById,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetDropDownByIdMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getDropDownByIdMutate, {
    mutationKey: GET_DROP_DOWN,
    ...options,
  });
  return { mutate, isLoading };
};
