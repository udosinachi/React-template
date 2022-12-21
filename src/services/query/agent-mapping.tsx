import { useMutation, useQuery } from "react-query";
import {
  getAgentMappingById,
  getAgentMappingByIdMutate,
  getAllAgentMapping,
  getSearchAgentMapping,
  getSearchAgentMappingMutate,
  editAgentMapping,
  addNewAgentMapping,
  deleteAgentMapping,
} from "../api/agent-mapping";
import {
  GET_ALL_AGENT_MAPPING,
  GET_AGENT_MAPPING,
  ADD_AGENT_MAPPING,
  DELETE_AGENT_MAPPING,
  SEARCH_AGENT_MAPPING,
  EDIT_AGENT_MAPPING,
} from "../queryKeys";

export const useGetAllAgentMapping = (
  page: number,
  itemPerPage: number,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_ALL_AGENT_MAPPING, page, itemPerPage],
    getAllAgentMapping,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetSearchAgentMapping = (
  searchKey: string,
  page: number,
  itemPerPage: number,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [SEARCH_AGENT_MAPPING, searchKey, page, itemPerPage],
    getSearchAgentMapping,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetSearchAgentMappingMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getSearchAgentMappingMutate, {
    mutationKey: SEARCH_AGENT_MAPPING,
    ...options,
  });
  return { mutate, isLoading };
};

export const useAddNewAgentMapping = (options = {}) => {
  const { mutate, isLoading } = useMutation(addNewAgentMapping, {
    mutationKey: ADD_AGENT_MAPPING,
    ...options,
  });
  return { mutate, isLoading };
};

export const useDeleteAgentMapping = (options = {}) => {
  const { mutate, isLoading } = useMutation(deleteAgentMapping, {
    mutationKey: DELETE_AGENT_MAPPING,
    ...options,
  });
  return { mutate, isLoading };
};

export const useEditAgentMapping = (options = {}) => {
  const { mutate, isLoading } = useMutation(editAgentMapping, {
    mutationKey: EDIT_AGENT_MAPPING,
    ...options,
  });
  return { mutate, isLoading };
};

export const useGetAgentMappingById = (id: any, options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [GET_AGENT_MAPPING, id],
    getAgentMappingById,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetAgentMappingByIdMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getAgentMappingByIdMutate, {
    mutationKey: GET_AGENT_MAPPING,
    ...options,
  });
  return { mutate, isLoading };
};
