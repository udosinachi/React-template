// import { useQuery } from "react-query";
// import {
//   getFirmwareNews,
//   getGeneralItems,
//   getRecentFirmwareList,
//   getThreatDetails,
//   getThreatCount,
//   getThreatIntelligenceSummary,
//   getTwoRecentComparison,
// } from "../api/dashboard";
// import {
//   GET_FIRMWARE_NEWS,
//   GET_RECENT_FIRMWARES,
//   GET_THREAT_DETAILS,
//   GET_GENERAL_ITEMS,
//   GET_RECENT_COMPARISONS,
//   GET_THREAT_COUNT,
//   GET_THREAT_INTELLIGENCE,
// } from "../queryKeys";

// export const useGetFirmwareNews = (options = {}) => {
//   const { data, isLoading, error } = useQuery(
//     [GET_FIRMWARE_NEWS],
//     getFirmwareNews,
//     {
//       ...options,
//     }
//   );

//   return { data, isLoading, error };
// };

// export const useGetGeneralItems = (options = {}) => {
//   const { data, isLoading, error, refetch } = useQuery(
//     [GET_GENERAL_ITEMS],
//     getGeneralItems,
//     {
//       ...options,
//     }
//   );

//   return { data, isLoading, error, refetch };
// };

// export const useGetThreatDetails = (options = {}) => {
//   const { data, isLoading, error } = useQuery(
//     [GET_THREAT_DETAILS],
//     getThreatDetails,
//     {
//       ...options,
//     }
//   );

//   return { data, isLoading, error };
// };

// export const useGetRecentComparisons = (options = {}) => {
//   const { data, isLoading, error, refetch } = useQuery(
//     [GET_RECENT_COMPARISONS],
//     getTwoRecentComparison,
//     {
//       ...options,
//     }
//   );
//   return { data, isLoading, error, refetch };
// };

// export const useGetThreatSummary = (options = {}) => {
//   const { data, isLoading, error, refetch } = useQuery(
//     [GET_THREAT_INTELLIGENCE],
//     getThreatIntelligenceSummary,
//     {
//       ...options,
//     }
//   );
//   return { data, isLoading, error, refetch };
// };

// export const useThreatCount = (options = {}) => {
//   const { data, isLoading, error, refetch } = useQuery(
//     [GET_THREAT_COUNT],
//     getThreatCount,
//     {
//       ...options,
//     }
//   );
//   return { data, isLoading, error, refetch };
// };

// export const useRecentFirmwareList = (options = {}) => {
//   const { data, isLoading, error, refetch } = useQuery(
//     [GET_RECENT_FIRMWARES],
//     getRecentFirmwareList,
//     {
//       ...options,
//     }
//   );
//   return { data, isLoading, error, refetch };
// };

export const data = [];
