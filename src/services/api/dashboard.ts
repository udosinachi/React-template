import { apiURL } from "../../enivironment";
import { DASHBOARD } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const getDashboardStatistics = async ({ queryKey }: any) => {
  const [, dispositionType] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${DASHBOARD}/statistics?dispositionType=${dispositionType}`
  );
  return res.data;
};

export const getDashboardChart = async ({ queryKey }: any) => {
  const [, dispositionType] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}${DASHBOARD}/charts?searchDate=2022-12-07&dispositionType=${dispositionType}`
  );
  return res?.data;
};

export const getAgentDashboardStatistics = async ({ queryKey }: any) => {
  const [, agentId, dispositionType] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}/AgentDashboard/statistics?agentId=${agentId}&dispositionType=${dispositionType}`
  );
  return res.data;
};
export const getAgentDashboardStatisticsMutate = async (body: any) => {
  const res = await axiosInstance.get(
    `${apiURL}/AgentDashboard/statistics?agentId=${body.agentId}&dispositionType=${body.dispositionType}`
  );
  return res.data;
};

export const getAgentDashboardCharts = async ({ queryKey }: any) => {
  const [, agentId, dispositionType] = queryKey;
  const res = await axiosInstance.get(
    `${apiURL}/AgentDashboard/charts?searchDate=2022-12-07&agentId=${agentId}&dispositionType=${dispositionType}`
  );
  return res.data;
};
export const getAgentDashboardChartsMutate = async (body: any) => {
  const res = await axiosInstance.get(
    `${apiURL}/AgentDashboard/charts?searchDate=2022-12-07&agentId=${body.agentId}&dispositionType=${body.dispositionType}`
  );
  return res.data;
};
