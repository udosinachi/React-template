// import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import {
  Box,
  Flex,
  Icon,
  // useColorMode,
  useColorModeValue,
  Text,
  Progress,
} from "@chakra-ui/react";
import { useGetDashboardChart } from "../services/query/dashboard";
import { useGetAgentDashboardCharts } from "../services/query/agent-mapping";

const CircleIcon = (props: any) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);

const BarChart = ({ listOfAgent }: any) => {
  const {
    data: chartData,
    isLoading: isLoaded,
    refetch: refetchAllUser,
  } = useGetDashboardChart();
  console.log(chartData);

  const {
    data: dataAgentCharts,
    isLoading: isLoadingAgentCharts,
    refetch: refetchAgentCharts,
  } = useGetAgentDashboardCharts(listOfAgent);
  console.log(dataAgentCharts);

  //   const { data } = useGetDashboardStats()
  //   const [chartData, setChartData] = useState([]);
  //   const [chartOptions, setChartOptions] = useState([]);

  // const { colorMode } = useColorMode();

  const barChartData: any = [
    {
      name: "Disposition",
      //   data: chartData,
      //   data: ["21", "10", "15"],
      data: [
        {
          x: "Apple",
          y: `${
            localStorage.getItem("role")?.toString() !== "customerserv1"
              ? dataAgentCharts?.document?.promiseToPay
              : chartData?.document?.promiseToPay
          }`,
          fillColor: "#e53e3e",
        },
        {
          x: "Orange",
          y: `${
            localStorage.getItem("role")?.toString() !== "customerserv1"
              ? dataAgentCharts?.document?.callBack
              : chartData?.document?.callBack
          }`,
          fillColor: "#d69e2e",
        },
        {
          x: "Orange",
          y: `${
            localStorage.getItem("role")?.toString() !== "customerserv1"
              ? dataAgentCharts?.document?.loanPaid
              : chartData?.document?.loanPaid
          }`,
          fillColor: "#38a169",
        },
      ],
    },
  ];

  const barChartOption: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      onDatasetHover: {
        style: {
          fontSize: "12px",
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: ["Promise to Pay", "Call Back", "Loan Paid"],
      show: false,
      labels: {
        show: true,
        style: {
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    yaxis: {
      show: true,
      color: "#fff",
      labels: {
        show: true,
        style: {
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: true,
      },
    },
    grid: {
      show: true,
    },
    // fill: {
    //   colors: "#fb3333", //336CFB
    // },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      //   bar: {
      //     borderRadius: 8,
      //     columnWidth: "7px",
      //   },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
            },
          },
        },
      },
    ],
  };

  //   useEffect(() => {
  //     if (data) {
  //       const objKeys = Object.keys(data)
  //       const formatKeys = objKeys?.map(data => data.split("").join(" "))
  //       const objValues = Object.values(data)

  //       setChartData(objValues)
  //       setChartOptions(formatKeys)
  //     }
  //   }, [data])

  return (
    <Box
      mt={"10px"}
      color={useColorModeValue("#000", "#FFFFFF")}
      bg={useColorModeValue("lightMode.white", "darkMode.wBgColor")}
    >
      <Box display="flex" flexWrap="wrap">
        <Box
          height="250px"
          borderRadius="20px"
          w={["100%", "100%", "100%", "50%"]}
        >
          <Chart
            options={barChartOption}
            series={barChartData}
            type="bar"
            width="100%"
            height="100%"
          />
        </Box>

        {localStorage.getItem("role")?.toString() !== "customerserv1" && (
          <Box w={["100%", "100%", "100%", "50%"]} mt="40px">
            <Flex mb="5">
              <CircleIcon boxSize={6} color="red.500" mr="2" />
              <Box w="100%">
                <Flex mb="2" justifyContent="space-between">
                  <Text fontSize="12">Promise to pay</Text>
                  <Text fontSize="12">
                    {dataAgentCharts?.document?.promiseToPay} Count
                  </Text>
                </Flex>
                <Progress
                  value={dataAgentCharts?.document?.promiseToPay}
                  size="xs"
                  colorScheme="red"
                />
              </Box>
            </Flex>
            <Flex mb="5">
              <CircleIcon boxSize={6} color="yellow.500" mr="2" />
              <Box w="100%">
                <Flex mb="2" justifyContent="space-between">
                  <Text fontSize="12">Call Back</Text>
                  <Text fontSize="12">
                    {dataAgentCharts?.document?.callBack} Count
                  </Text>
                </Flex>
                <Progress
                  value={dataAgentCharts?.document?.callBack}
                  size="xs"
                  colorScheme="yellow"
                />
              </Box>
            </Flex>
            <Flex mb="5">
              <CircleIcon boxSize={6} color="green.500" mr="2" />
              <Box w="100%">
                <Flex mb="2" justifyContent="space-between">
                  <Text fontSize="12">Loan Paid</Text>
                  <Text fontSize="12">
                    {dataAgentCharts?.document?.loanPaid} Count
                  </Text>
                </Flex>
                <Progress
                  value={dataAgentCharts?.document?.loanPaid}
                  size="xs"
                  colorScheme="green"
                />
              </Box>
            </Flex>
          </Box>
        )}

        {localStorage.getItem("role")?.toString() === "customerserv1" && (
          <Box w={["100%", "100%", "100%", "50%"]} mt="40px">
            <Flex mb="5">
              <CircleIcon boxSize={6} color="red.500" mr="2" />
              <Box w="100%">
                <Flex mb="2" justifyContent="space-between">
                  <Text fontSize="12">Promise to pay</Text>
                  <Text fontSize="12">
                    {chartData?.document?.promiseToPay} Count
                  </Text>
                </Flex>
                <Progress
                  value={chartData?.document?.promiseToPay}
                  size="xs"
                  colorScheme="red"
                />
              </Box>
            </Flex>
            <Flex mb="5">
              <CircleIcon boxSize={6} color="yellow.500" mr="2" />
              <Box w="100%">
                <Flex mb="2" justifyContent="space-between">
                  <Text fontSize="12">Call Back</Text>
                  <Text fontSize="12">
                    {chartData?.document?.callBack} Count
                  </Text>
                </Flex>
                <Progress
                  value={chartData?.document?.callBack}
                  size="xs"
                  colorScheme="yellow"
                />
              </Box>
            </Flex>
            <Flex mb="5">
              <CircleIcon boxSize={6} color="green.500" mr="2" />
              <Box w="100%">
                <Flex mb="2" justifyContent="space-between">
                  <Text fontSize="12">Loan Paid</Text>
                  <Text fontSize="12">
                    {chartData?.document?.loanPaid} Count
                  </Text>
                </Flex>
                <Progress
                  value={chartData?.document?.loanPaid}
                  size="xs"
                  colorScheme="green"
                />
              </Box>
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BarChart;
