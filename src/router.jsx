import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Stuff from "./pages/Stuff/Index";
import StuffCreate from "./pages/Stuff/Create";
import TrashStuff from "./pages/TrashStuff";
import InboundCreate from "./pages/Inbound/Inbound";
import Inbound from "./pages/Inbound/InboundIndex";
import User from "./pages/User/User";
import Lendings from "./pages/Lending/Lending";
import UserCreate from "./pages/User/Create";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile/>},
    { path: '/dashboard', element: <Dashboard/>},
    { path: '/stuff', element: <Stuff />},
    { path: '/stuff/create', element: <StuffCreate/>},
    { path: '/stuff/trash', element: <TrashStuff/>},
    { path: '/inbound-stuff', element: <InboundCreate/>},
    { path: '/inbound', element: <Inbound/>},
    { path: '/user', element: <User/>},
    { path: '/lending', element: <Lendings/>},
    { path: '/user-create', element: <UserCreate/>},
])