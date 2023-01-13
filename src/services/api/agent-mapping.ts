import { apiURL } from "../../enivironment";
import { AGENT_MAPPING } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const getAllAgentMapping = async ({ queryKey }: any) => {
  const [, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${AGENT_MAPPING}/?page=${page}&itemsPerPage=${itemsPerPage}&orderBy=Id|DESC`
  );
  return res.data;
};

export const getSearchAgentMapping = async ({ queryKey }: any) => {
  const [, searchKey, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${AGENT_MAPPING}/search?searchKey=${searchKey}&page=${page}&itemsPerPage=${itemsPerPage}&orderBy=Id|DESC`
  );
  return res?.data;
};

export const getSearchAgentMappingMutate = async (body: any) => {
  // const [, searchKey, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${AGENT_MAPPING}/search?searchKey=${body.searchKey}&page=${body.page}&itemsPerPage=${body.itemsPerPage}&orderBy=Id|DESC`
  );
  return res?.data;
};

export const addNewAgentMapping = async (body: any) => {
  const res = await axiosInstance.post(apiURL + AGENT_MAPPING, body);
  return res?.data;
};

export const deleteAgentMapping = async (body: any) => {
  const res = await axiosInstance.delete(
    `${apiURL}${AGENT_MAPPING}/${body.id}`
  );
  return res?.data;
};

export const editAgentMapping = async (body: any) => {
  console.log(body);
  console.log(body.id);
  const res = await axiosInstance.put(
    `${apiURL}${AGENT_MAPPING}/${body.id}`,
    body
  );
  return res?.data;
};

export const getAgentMappingById = async ({ queryKey }: any) => {
  const [, id] = queryKey;
  const res = await axiosInstance.get(`${apiURL}${AGENT_MAPPING}/${id}`);
  return res?.data;
};

export const getAgentMappingByIdMutate = async (body: any) => {
  const res = await axiosInstance.get(`${apiURL}${AGENT_MAPPING}/${body.id}`);
  return res?.data;
};

export const getAllSupervisorAgentsMapping = async ({ queryKey }: any) => {
  const [, supervisorId, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${AGENT_MAPPING}/supervisoragents?supervisorId=${supervisorId}&page=${page}&itemsPerPage=${itemsPerPage}&orderBy=Id|DESC`
  );
  return res.data;
};

export const getAgentDashboardStatistics = async ({ queryKey }: any) => {
  const [, agentId] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}/AgentDashboard/statistics?agentId=${agentId}`
  );
  return res.data;
};

export const getAgentDashboardCharts = async ({ queryKey }: any) => {
  const [, agentId] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}/AgentDashboard/charts?searchDate=2022-12-07&agentId=${agentId}`
  );
  return res.data;
};

export const getAgentDispositionReport = async ({ queryKey }: any) => {
  const [, agentId, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}/Dispositions/agentreport?&searchDate=2022-12-07&agentId=${agentId}&page=${page}&itemsPerPage=${itemsPerPage}&orderBy=Id|DESC`
  );
  return res.data;
};

export const getAgentDispositionReportMutate = async (body: any) => {
  // const [, fromDate, toDate, agentId, page, itemsPerPage] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}/Dispositions/agentreport?fromDate=${body.fromDate}&toDate=${body.toDate}&agentId=${body.agentId}&page=${body.page}&itemsPerPage=${body.itemsPerPage}&orderBy=Id|DESC`
  );
  return res.data;
};
