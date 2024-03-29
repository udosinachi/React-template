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
  Image,
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
import { LogoImage } from "../assets";
import useCustomToast from "../utils/notification";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, path: "/dashboard" },
  { name: "Customer Book", icon: FiBook, path: "/customer-book" },
  { name: "Disposition", icon: MdOutlineRestartAlt, path: "/disposition" },
  { name: "Team Members", icon: RiTeamLine, path: "/team-members" },
  { name: "Report", icon: TbReportAnalytics, path: "/report" },
  { name: "Agent Mapping", icon: FiBook, path: "/agent-mapping" },
];
const SupervisorLinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, path: "/dashboard" },
  { name: "Customer Book", icon: FiBook, path: "/customer-book" },
  // { name: "Disposition", icon: MdOutlineRestartAlt, path: "/disposition" },
  { name: "Team Members", icon: RiTeamLine, path: "/team-members" },
  { name: "Report", icon: TbReportAnalytics, path: "/report" },
];
const AgentLinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, path: "/dashboard" },
  { name: "Customer Book", icon: FiBook, path: "/customer-book" },
  { name: "Disposition", icon: MdOutlineRestartAlt, path: "/disposition" },
];

const activeStyle: React.CSSProperties = {
  color: "#26C6DA",
  background: "white",
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
        // size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Navbar onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4" position="relative">
        <Box>{children}</Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { successToast } = useCustomToast();
  const logout = () => {
    localStorage.removeItem("user");
    successToast("Logout Successful");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      bgColor="#26C6DA"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {/* <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text> */}
        <Image src={LogoImage} w={["200px", "200px", "200px", "100%"]} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {localStorage.getItem("role")?.toString() === "superadmin" && (
        <div>
          {LinkItems.map((link) => (
            <div key={link.name}>
              <NavLink
                onClick={onClose}
                to={link.path}
                style={({ isActive }) =>
                  isActive
                    ? activeStyle
                    : {
                        ...activeStyle,
                        background: "none",
                        color: "white",
                      }
                }
              >
                <Flex>
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
        </div>
      )}
      {localStorage.getItem("role")?.toString() === "customerserv2" && (
        <div>
          {SupervisorLinkItems.map((link) => (
            <div key={link.name}>
              <NavLink
                onClick={onClose}
                to={link.path}
                style={({ isActive }) =>
                  isActive
                    ? activeStyle
                    : {
                        ...activeStyle,
                        background: "none",
                        color: "white",
                      }
                }
              >
                <Flex>
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
        </div>
      )}
      {localStorage.getItem("role")?.toString() === "customerserv1" && (
        <div>
          {AgentLinkItems.map((link) => (
            <div key={link.name}>
              <NavLink
                onClick={onClose}
                to={link.path}
                style={({ isActive }) =>
                  isActive
                    ? activeStyle
                    : {
                        ...activeStyle,
                        background: "none",
                        color: "white",
                      }
                }
              >
                <Flex>
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
        </div>
      )}
    </Box>
  );
};
