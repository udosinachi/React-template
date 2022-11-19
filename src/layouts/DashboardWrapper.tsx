import React, { Fragment, ReactNode } from "react";
import { Box, Flex, Button, Divider, useDisclosure } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { PRIVATE_PATHS } from "../routes/constants";

interface IProps {
  children: ReactNode;
}

const linkArray = [PRIVATE_PATHS.DASHBOARD];

const tabArray = [{ id: 1, name: "Overview", route: PRIVATE_PATHS.DASHBOARD }];

const DashboardWrapper = (props: IProps) => {
  const { children } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();

  if (!linkArray.includes(location.pathname)) {
    return <Fragment>{children}</Fragment>;
  }

  return (
    <Box>
      <Box position="relative" display={"flex"}>
        <Divider orientation="vertical" />
        <Box flex={1}>
          <Flex mb="30px" borderBottom="1px solid #DFDFDF" gap="1rem">
            {tabArray.map((item) => (
              <Link key={item.id} to={item.route}>
                <Button
                  bg={
                    location.pathname === item.route ? "#D9D9D9" : "transparent"
                  }
                  // borderTopRightRadius="20px"
                  // borderRadius="0"
                  minWidth="153px"
                  _focus={{ bg: "#D9D9D9" }}
                  _hover={{ bg: "#D9D9D9" }}
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </Flex>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardWrapper;
