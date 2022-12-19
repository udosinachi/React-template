import { apiURL } from "../../enivironment";
import { DASHBOARD } from "../apiUrl";
import axiosInstance from "../axiosInstance";

export const getDashboardStatistics = async () => {
  const res = await axiosInstance.get(`${apiURL}${DASHBOARD}/statistics`);
  return res.data;
};

export const getDashboardChart = async () => {
  const res = await axiosInstance.get(
    `${apiURL}${DASHBOARD}/charts?searchDate=2022-12-07`
  );
  return res?.data;
};
