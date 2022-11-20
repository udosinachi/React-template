import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { FiBook, FiHome } from "react-icons/fi";
import { RiTeamLine } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineRestartAlt } from "react-icons/md";
import { IconType } from "react-icons";
// import { ReactText } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, path: "/dashboard" },
  { name: "Customer Book", icon: FiBook, path: "/customer-book" },
  { name: "Setup Book", icon: MdOutlineRestartAlt, path: "/fff" },
  { name: "Team Members", icon: RiTeamLine, path: "/hh" },
  { name: "Report", icon: TbReportAnalytics, path: "/kk" },
];

const activeStyle: React.CSSProperties = {
  color: "white",
  background: "#26C6DA",
  display: "flex",
  alignItems: "center",
  padding: "10px",
  margin: "10px",
  // borderRadius: "10px",
  cursor: "pointer",
};

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg="whitesmoke">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
        // bg="blackAlpha.300"
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Navbar onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Box height="100vh">{children}</Box>
        <Footer />
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <div key={link.name}>
          <NavLink
            to={link.path}
            style={({ isActive }) =>
              isActive
                ? activeStyle
                : {
                    ...activeStyle,
                    background: "none",
                    color: "black",
                  }
            }
          >
            <Flex
            // align="center"
            // p="4"
            // mx="4"
            // borderRadius="lg"
            // role="group"
            // cursor="pointer"
            // _hover={{
            //   bg: "cyan.400",
            //   color: "white",
            // }}
            >
              <Icon
                mr="4"
                mt="1"
                fontSize="16"
                _groupHover={{
                  color: "white",
                }}
                as={link.icon}
              />

              {link.name}
            </Flex>
          </NavLink>
        </div>
      ))}
    </Box>
  );
};
