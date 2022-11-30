import { Box, Card, Flex, Icon, Text } from "@chakra-ui/react";
import { FcMissedCall, FcCallTransfer, FcCallback } from "react-icons/fc";
import React from "react";
import DashboardChart from "../../components/DashboardChart";

const Dashboard = () => {
  return (
    <div>
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
                  73
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
                  39
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
                  34
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
    </div>
  );
};

export default Dashboard;
