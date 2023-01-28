import { useMutation, useQuery } from "react-query";
import {
  getDashboardStatistics,
  getDashboardChart,
  getAgentDashboardStatistics,
  getAgentDashboardCharts,
} from "../api/dashboard";
import {
  AGENT_DASHBOARD_CHARTS,
  AGENT_DASHBOARD_STATISTICS,
  DASHBOARD_CHARTS,
  DASHBOARD_GET_STATISTICS,
} from "../queryKeys";

export const useGetDashboardStatistics = (
  dispositionType: any,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [DASHBOARD_GET_STATISTICS, dispositionType],
    getDashboardStatistics,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetDashboardChart = (dispositionType: any, options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [DASHBOARD_CHARTS, dispositionType],
    getDashboardChart,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetAgentDashboardStatistics = (
  agentId: any,
  dispositionType: any,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [AGENT_DASHBOARD_STATISTICS, agentId],
    getAgentDashboardStatistics,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetAgentDashboardStatisticsMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getAgentDashboardStatistics, {
    mutationKey: AGENT_DASHBOARD_STATISTICS,
    ...options,
  });
  return { mutate, isLoading };
};

export const useGetAgentDashboardCharts = (
  agentId: any,
  dispositionType: any,
  options = {}
) => {
  const { data, isLoading, refetch } = useQuery(
    [AGENT_DASHBOARD_CHARTS, agentId],
    getAgentDashboardCharts,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetAgentDashboardChartsMutate = (options = {}) => {
  const { mutate, isLoading } = useMutation(getAgentDashboardCharts, {
    mutationKey: AGENT_DASHBOARD_CHARTS,
    ...options,
  });
  return { mutate, isLoading };
};
