import { useMutation, useQuery } from "react-query";
import { getDashboardStatistics, getDashboardChart } from "../api/dashboard";
import { DASHBOARD_CHARTS, DASHBOARD_GET_STATISTICS } from "../queryKeys";

export const useGetDashboardStatistics = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [DASHBOARD_GET_STATISTICS],
    getDashboardStatistics,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetDashboardChart = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    [DASHBOARD_CHARTS],
    getDashboardChart,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};
