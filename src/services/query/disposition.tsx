import { useMutation, useQuery } from "react-query";
import {
  getAllDisposition,
  getDispositionById,
  getDispositionByIdMutate,
  addNewDisposition,
  editDisposition,
  getSearchDisposition,
  getSearchDispositionMutate,
  deleteDisposition,
  getDispositionReport,
  getDispositionReportMutate,
} from "../api/disposition";
import {
  GET_ALL_DISPOSITION,
  GET_DISPOSITION,
  ADD_DISPOSITION,
  DELETE_DISPOSITION,
  SEARCH_DISPOSITION,
  EDIT_DISPOSITION,
  DISPOSITION_REPORT,
} from "../queryKeys";

export const useGetAllDisposition = (
  page: number,
  itemPerPage: number,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_ALL_DISPOSITION, page, itemPerPage],
    getAllDisposition,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetSearchDisposition = (
  searchKey: string,
  page: number,
  itemPerPage: number,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [SEARCH_DISPOSITION, searchKey, page, itemPerPage],
    getSearchDisposition,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetSearchDispositionMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getSearchDispositionMutate, {
    mutationKey: SEARCH_DISPOSITION,
    ...options,
  });
  return { mutate, isLoading };
};

export const useAddNewDisposition = (options = {}) => {
  const { mutate, isLoading } = useMutation(addNewDisposition, {
    mutationKey: ADD_DISPOSITION,
    ...options,
  });
  return { mutate, isLoading };
};

export const useDeleteDisposition = (options = {}) => {
  const { mutate, isLoading } = useMutation(deleteDisposition, {
    mutationKey: DELETE_DISPOSITION,
    ...options,
  });
  return { mutate, isLoading };
};

export const useEditDisposition = (options = {}) => {
  const { mutate, isLoading } = useMutation(editDisposition, {
    mutationKey: EDIT_DISPOSITION,
    ...options,
  });
  return { mutate, isLoading };
};

export const useGetDispositionById = (id: any, options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_DISPOSITION, id],
    getDispositionById,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetDispositionByIdMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getDispositionByIdMutate, {
    mutationKey: GET_DISPOSITION,
    ...options,
  });
  return { mutate, isLoading };
};

export const useGetDispositionReport = (
  searchDate: any,
  searchKey: string,
  page: number,
  itemsPerPage: number,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [DISPOSITION_REPORT, searchDate, searchKey, page, itemsPerPage],
    getDispositionReport,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetDispositionReportMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getDispositionReportMutate, {
    mutationKey: DISPOSITION_REPORT,
    ...options,
  });
  return { mutate, isLoading };
};
