import { lazy } from 'react';

export const Login = lazy(() => import("./Auth/Login"))
export const Leads = lazy(() => import("./Leads/Leads"))
export const Overview = lazy(() => import("./Overview/Overview"))