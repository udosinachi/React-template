import { apiURL } from "../../enivironment";
import { DISPOSITION } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const getAllDisposition = async ({ queryKey }: any) => {
  const [, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${DISPOSITION}/?page=${page}&itemsPerPage=${itemsPerPage}&orderBy=Id|DESC`
  );
  return res.data;
};

export const getSearchDisposition = async ({ queryKey }: any) => {
  const [, searchKey, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${DISPOSITION}/search?searchKey=${searchKey}&page=${page}&itemsPerPage=${itemsPerPage}&orderBy=Id|DESC`
  );
  return res?.data;
};

export const getSearchDispositionMutate = async (body: any) => {
  // const [, searchKey, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${DISPOSITION}/search?searchKey=${body.searchKey}&page=${body.page}&itemsPerPage=${body.itemsPerPage}&orderBy=Id|DESC`
  );
  return res?.data;
};

export const addNewDisposition = async (body: any) => {
  const res = await axiosInstance.post(apiURL + DISPOSITION, body);
  return res?.data;
};

export const deleteDisposition = async (body: any) => {
  const res = await axiosInstance.delete(`${apiURL}${DISPOSITION}/${body.id}`);
  return res?.data;
};

export const editDisposition = async (body: any) => {
  console.log(body);
  console.log(body.id);
  const res = await axiosInstance.put(
    `${apiURL}${DISPOSITION}/${body.id}`,
    body
  );
  return res?.data;
};

export const getDispositionById = async ({ queryKey }: any) => {
  const [, id] = queryKey;
  const res = await axiosInstance.get(`${apiURL}${DISPOSITION}/${id}`);
  return res?.data;
};

export const getDispositionByIdMutate = async (body: any) => {
  const res = await axiosInstance.get(`${apiURL}${DISPOSITION}/${body.id}`);
  return res?.data;
};

export const getDispositionReport = async ({ queryKey }: any) => {
  const [, searchDate, searchKey, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${DISPOSITION}/report?searchKey=${searchKey}&searchDate=${searchDate}&page=${page}&itemsPerPage=${itemsPerPage}&orderBy=Id|DESC`
  );
  return res?.data;
};

export const getDispositionReportMutate = async (body: any) => {
  const res = await axiosInstance.get(
    `${apiURL}${DISPOSITION}/report?searchKey=${body.searchKey}&&fromDate=${body.fromDate}&toDate=${body.toDate}&page=${body.page}&itemsPerPage=${body.itemsPerPage}&orderBy=Id|DESC`
  );
  return res?.data;
};
export const getDispositionAgentReportMutate = async (body: any) => {
  const res = await axiosInstance.get(
    `${apiURL}${DISPOSITION}/agenttopreport?agentId=${body.agentId}&itemNumber=${body.itemsNumber}`
  );
  return res?.data;
};
export const getDispositionAgentReport = async ({ queryKey }: any) => {
  const [, agentId, itemsNumber] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${DISPOSITION}/agenttopreport?agentId=${agentId}&itemNumber=${itemsNumber}`
  );
  return res?.data;
};
export const getDispositionReportByDateMutate = async (body: any) => {
  const res = await axiosInstance.get(
    `${apiURL}${DISPOSITION}/dispositionsanalysis?fromDate=${body.fromDate}&toDate=${body.toDate}&page=${body.page}&itemsPerPage=${body.itemsPerPage}`
  );
  return res?.data;
};
