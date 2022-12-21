import React, { lazy } from "react";
import WithSuspense from "../components/WithSuspense";
import { PRIVATE_PATHS, PUBLIC_PATHS } from "./constants";
import { Navigate } from "react-router-dom";
import { AppRoute } from "../types";

const { LOGIN, SIGNUP, HOME } = PUBLIC_PATHS;

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
const SignUp = WithSuspense(lazy(() => import("../pages/Signup/Signup")));
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
  { path: SIGNUP, element: <SignUp /> },
  { path: "*", element: <Navigate to="/login" replace /> },

  // non existing url will redirect to home page
];

export const PRIVATE_ROUTES: AppRoute[] = [
  { path: DASHBOARD, element: <Dashboard /> },
  { path: CUSTOMERSBOOK, element: <CustomerBook /> },
  { path: CUSTOMERSBOOKDETAILS, element: <CustomerBookDetails /> },
  { path: DISPOSITION, element: <Disposition /> },
  { path: TEAMMEMBERS, element: <TeamMembers /> },
  { path: REPORT, element: <Report /> },
  { path: AGENTMAPPING, element: <AgentMapping /> },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
];
