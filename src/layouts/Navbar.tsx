import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";

import { LogoImage, User } from "../assets/index";
import useCustomToast from "../utils/notification";

type MenuListItemType = {
  icon: string;
  label: string;
  path?: string;
  action?: "COLOR_MODE" | "LOG_OUT";
};

export const menuLists: MenuListItemType[] = [
  {
    icon: User,
    label: "User Profile",
    path: "/user-profile",
  },
];

// const HeaderMenuItem = ({ item }: { item: MenuListItemType }) => {
//   const location = useLocation();

//   return (
//     <Link to={item.path ?? location.pathname}>
//       <MenuItem color="black" display="flex">
//         <Image width="17px" color="black" alt="dashboard" src={item.icon} />
//         <Text ml="2">{item.label}</Text>
//       </MenuItem>
//     </Link>
//   );
// };

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const Navbar = ({ onOpen, ...rest }: MobileProps) => {
  // const [user, setUser] = useState("");
  // const Auser = JSON.parse(localStorage.getItem("user"));

  const { successToast } = useCustomToast();
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("agentID");
    localStorage.removeItem("role");
    successToast("Logout Successful");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
  ];

  let timer: any;

  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      resetTimer();

      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });

      // logout();
    }, 300000);
  };
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };
  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, []);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {/* <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text> */}
      <Image
        src={LogoImage}
        display={{ base: "flex", md: "none" }}
        // width={{ base: "100%", md: "100px" }}
        // w="100px"
        w={["120px", "200px", "200px", "100%"]}
      />

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    {localStorage.getItem("role")}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              {/* <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider /> */}
              <MenuItem onClick={logout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Navbar;
