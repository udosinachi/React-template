import { Box, Card, Flex, Icon, Text } from "@chakra-ui/react";
import { FcMissedCall, FcCallTransfer, FcCallback } from "react-icons/fc";
import DashboardChart from "../../components/DashboardChart";
import { Loader } from "../../components/WithSuspense";
import {
  useGetDashboardChart,
  useGetDashboardStatistics,
} from "../../services/query/dashboard";

const Dashboard = () => {
  const { data, isLoading, refetch } = useGetDashboardStatistics();
  // console.log(data);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <Box>
          <Box>
            <Flex justifyContent="space-evenly" flexWrap="wrap" mb="5">
              <Card
                bg="white"
                w={["100%", "100%", "100%", "31%"]}
                mb="3"
                borderRadius="none"
                p="4"
              >
                <Flex align="center">
                  <Icon as={FcCallTransfer} fontSize="30" mr="4" />
                  <Text fontSize="22" mr="2" fontWeight="600">
                    {data?.document?.totalCalls}
                  </Text>
                  <Text fontSize="14">Total Calls</Text>
                </Flex>
              </Card>
              <Card
                bg="white"
                w={["100%", "100%", "100%", "31%"]}
                mb="3"
                borderRadius="none"
                p="4"
              >
                <Flex align="center">
                  <Icon as={FcCallback} fontSize="30" mr="4" />
                  <Text fontSize="22" mr="2" fontWeight="600">
                    {data?.document?.successfulCalls}
                  </Text>
                  <Text fontSize="14">Successful Calls</Text>
                </Flex>
              </Card>
              <Card
                bg="white"
                w={["100%", "100%", "100%", "31%"]}
                mb="3"
                borderRadius="none"
                p="4"
              >
                <Flex align="center">
                  <Icon as={FcMissedCall} fontSize="30" mr="4" />
                  <Text fontSize="22" mr="2" fontWeight="600">
                    {data?.document?.failedCalls}
                  </Text>
                  <Text fontSize="14">Failed Calls</Text>
                </Flex>
              </Card>
            </Flex>

            <Box bg="white" p={["2", "5", "5", "5"]}>
              <Box mb="5">
                <DashboardChart />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Dashboard;
