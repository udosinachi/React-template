import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  useColorModeValue,
  Image,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useLogin, useLoginAccount } from "../../services/query/login";
import useCustomToast from "../../utils/notification";
import { LogoImage } from "../../assets/index";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const { mutate, isLoading: isCreateLoading } = useLogin({
  //   onSuccess: (res: any) => {
  //     console.log(res);
  //     successToast("Login Successful");
  //     localStorage.setItem("user", JSON.stringify(res));
  //     localStorage.setItem(
  //       "accessToken",
  //       JSON.stringify(res?.document?.accessToken)
  //     );
  //     setTimeout(() => {
  //       window.location.href = "/dashboard";
  //     }, 200);
  //   },
  //   onError: (err: any) => {
  //     console.log(err);
  //     errorToast("Failed");
  //   },
  // });
  const { mutate, isLoading: isCreateLoading } = useLoginAccount({
    onSuccess: (res: any) => {
      console.log(res);
      if (res?.message === "Record Found") {
        successToast("Login Successful");
        localStorage.setItem("user", JSON.stringify(res));
        localStorage.setItem(
          "accessToken",
          JSON.stringify(
            res?.document?.accessTokens?.authorizationToken?.accessToken
          )
        );
        localStorage.setItem("agentID", res?.document?.id);
        localStorage.setItem("role", res?.document?.role);
        setTimeout(() => {
          navigate("/dashboard");
          // window.location.href = "/dashboard";
        }, 200);
      } else {
        errorToast("Invalid Details");
      }
    },
    onError: (err: any) => {
      // console.log(err);
      errorToast("Failed");
    },
  });

  const handleSubmit = () => {
    // console.log(username);
    // console.log(password);
    mutate({
      email: username,
      password: password,
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      // bg={useColorModeValue("gray.50", "gray.800")}
      bg="whitesmoke"
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>
            <Image src={LogoImage} />
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          {/* <Heading textAlign="center" color="#26C6DA" mb="3" fontSize="20px">
            Supervisor Login
          </Heading> */}
          <form>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  {/* <NavLink to="/agent-login" style={{ color: "#26C6DA" }}>
                    Agent Login
                  </NavLink> */}
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  isLoading={isCreateLoading}
                  onClick={handleSubmit}
                  // disabled={Username === "" || Password === ""}
                >
                  Login
                </Button>
                {/* <Stack pt={6}>
                  <Text align={"center"}>
                    Don't have an account?{" "}
                    <NavLink to="/signup" style={{ color: "#26C6DA" }}>
                      Sign Up
                    </NavLink>
                  </Text>
                </Stack> */}
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
