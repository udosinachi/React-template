import { Box, Card, Flex, Icon, Text } from "@chakra-ui/react";
import { FcMissedCall } from "react-icons/fc";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <Box>
        <Box>
          <Flex>
            <Card>
              <Icon as={FcMissedCall} />
              <Text>73</Text>
              <Text>Total Calls</Text>
            </Card>
          </Flex>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
