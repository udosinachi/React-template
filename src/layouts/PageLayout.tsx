import React, { useState, useEffect } from "react";
import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

interface IChildren {
  children: React.ReactNode;
}
export const AuthPageLayout = ({ children }: IChildren) => {
  const [isMobile, setIsMobile] = useState(false);
  const [showSideNav, setShowSideNav] = useState(true);

  useEffect(() => {
    function resize() {
      if (window.innerWidth < 1065) {
        setShowSideNav(false);
        setIsMobile(true);
      } else {
        setIsMobile(false);
        setShowSideNav(true);
      }
    }
    resize();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <Box>
      <Sidebar>{children}</Sidebar>
    </Box>
  );
};

export const NonAuthPageLayout = ({ children }: IChildren) => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      w="100%"
      height={["80vh", "100vh"]}
    >
      {children}
      <Box mt={"auto"}>{/* <Footer /> */}</Box>
    </Box>
  );
};
