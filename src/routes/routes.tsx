import React, { lazy } from "react";
import WithSuspense from "../components/WithSuspense";
import { PRIVATE_PATHS, PUBLIC_PATHS } from "./constants";
import { Navigate } from "react-router-dom";
import { AppRoute } from "../types";

const { LOGIN, AGENTLOGIN, HOME } = PUBLIC_PATHS;

const {
  DASHBOARD,
  CUSTOMERSBOOK,
  CUSTOMERSBOOKDETAILS,
  DISPOSITION,
  TEAMMEMBERS,
  REPORT,
  AGENTMAPPING,
} = PRIVATE_PATHS;

const Home = WithSuspense(lazy(() => import("../pages/Home/Home")));
const Dashboard = WithSuspense(
  lazy(() => import("../pages/Dashboard/Dashboard"))
);
const Login = WithSuspense(lazy(() => import("../pages/Login/Login")));
const AgentLogin = WithSuspense(
  lazy(() => import("../pages/Login/AgentLogin"))
);
const CustomerBook = WithSuspense(
  lazy(() => import("../pages/CustomerBook/CustomerBook"))
);
const CustomerBookDetails = WithSuspense(
  lazy(() => import("../pages/CustomerBook/CustomerBookDetails"))
);
const Disposition = WithSuspense(
  lazy(() => import("../pages/Disposition/Disposition"))
);
const TeamMembers = WithSuspense(
  lazy(() => import("../pages/TeamMembers/TeamMembers"))
);
const Report = WithSuspense(lazy(() => import("../pages/Report/Report")));
const AgentMapping = WithSuspense(
  lazy(() => import("../pages/AgentMapping/AgentMapping"))
);

export const PUBLIC_ROUTES: AppRoute[] = [
  { path: HOME, element: <Home /> },
  { path: LOGIN, element: <Login /> },
  // { path: AGENTLOGIN, element: <AgentLogin /> },
  { path: "*", element: <Navigate to="/login" replace /> },

  // non existing url will redirect to home page
];

export const PRIVATE_ROUTES: AppRoute[] = [
  { path: DASHBOARD, element: <Dashboard /> },
  { path: CUSTOMERSBOOK, element: <CustomerBook /> },
  { path: CUSTOMERSBOOKDETAILS, element: <CustomerBookDetails /> },
  { path: DISPOSITION, element: <Disposition /> },
  {
    path: TEAMMEMBERS,
    element:
      localStorage.getItem("role")?.toString() !== "customerserv1" ? (
        <TeamMembers />
      ) : (
        <Navigate to="/dashboard" replace />
      ),
  },
  {
    path: REPORT,
    element:
      localStorage.getItem("role")?.toString() !== "customerserv1" ? (
        <Report />
      ) : (
        <Navigate to="/dashboard" replace />
      ),
  },
  {
    path: AGENTMAPPING,
    element:
      localStorage.getItem("role")?.toString() === "superadmin" ? (
        <AgentMapping />
      ) : (
        <Navigate to="/dashboard" replace />
      ),
  },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
];
