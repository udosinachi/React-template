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
  getDispositionAgentReportMutate,
  getDispositionAgentReport,
  getDispositionReportByDateMutate,
} from "../api/disposition";
import {
  GET_ALL_DISPOSITION,
  GET_DISPOSITION,
  ADD_DISPOSITION,
  DELETE_DISPOSITION,
  SEARCH_DISPOSITION,
  EDIT_DISPOSITION,
  DISPOSITION_REPORT,
  AGENT_TOP_DISPOSITION_REPORT,
  DISPOSITION_REPORT_ANALYSIS_BY_DATE,
  GET_DISPOSITION_BY_ID,
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
  searchKey: any,
  // page: number,
  // itemPerPage: number,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [SEARCH_DISPOSITION, searchKey],
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
    mutationKey: GET_DISPOSITION_BY_ID,
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

export const useGetDispositionAgentReportMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getDispositionAgentReportMutate, {
    mutationKey: AGENT_TOP_DISPOSITION_REPORT,
    ...options,
  });
  return { mutate, isLoading };
};

export const useGetDispositionAgentReport = (
  agentId: any,
  itemsNumber: number,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [AGENT_TOP_DISPOSITION_REPORT, agentId, itemsNumber],
    getDispositionAgentReport,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetDispositionReportByDateMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getDispositionReportByDateMutate, {
    mutationKey: DISPOSITION_REPORT_ANALYSIS_BY_DATE,
    ...options,
  });
  return { mutate, isLoading };
};
