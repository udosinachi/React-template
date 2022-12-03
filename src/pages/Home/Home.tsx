import { Button, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Flex w="100%" h={"100vh"} justifyContent="center">
        <NavLink to="/login" style={{ margin: "auto" }}>
          <Button size="lg" bgColor="green.500" color="white">
            Login
          </Button>
        </NavLink>
      </Flex>
    </div>
  );
};

export default Home;
