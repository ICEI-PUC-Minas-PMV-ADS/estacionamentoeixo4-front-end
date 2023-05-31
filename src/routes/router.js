import { jsx as _jsx } from "react/jsx-runtime";
import DefaultLayout from "@src/layout/DefaultLayout";
import SignIn from "@src/pages/Authentication/SignIn";
import SignUp from "@src/pages/Authentication/SignUp";
import ComponentAuth from "@src/pages/Authentication/componentes/ComponentAuth";
import DashboardPage from "@src/pages/DashboardPage";
import Home from "@src/pages/Home";
import FormAdm from "@src/pages/administrador/Form.component";
import ReadAdm from "@src/pages/administrador/Read.component";
import FormEstacionamento from "@src/pages/estacionamentos/Form.component";
import ReadEstacionamento from "@src/pages/estacionamentos/Read.component";
import FormUsers from "@src/pages/users/Form.component";
import ReadUser from "@src/pages/users/Read.component";
import Dashboard from "@src/pages/Dashboard";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Profile from "@src/pages/Profile";
import Settings from "@src/pages/Settings";
const routes = createBrowserRouter([
    {
        path: "/",
        Component: () => {
            return _jsx(DefaultLayout, {});
        },
        children: [
            {
                index: true,
                path: "/",
                Component: Home,
            },
            {
                path: "dashboard",
                Component: () => _jsx(DashboardPage, {}),
                children: [
                    {
                        path: "home",
                        children: [
                            {
                                path: "read",
                                Component: () => _jsx(Dashboard, {}),
                            },
                        ],
                    },
                    {
                        path: "user",
                        Component: () => _jsx(Outlet, {}),
                        children: [
                            {
                                path: "settings",
                                Component: () => _jsx(Settings, {}),
                            },
                            {
                                path: "profile",
                                Component: () => _jsx(Profile, {}),
                            },
                        ],
                    },
                    {
                        path: "users",
                        children: [
                            {
                                path: "read",
                                Component: () => _jsx(ReadUser, {}),
                            },
                            {
                                path: "create",
                                Component: () => _jsx(FormUsers, {}),
                            },
                            {
                                path: "edit/:id",
                                Component: () => _jsx(FormUsers, {}),
                            },
                        ],
                    },
                    {
                        path: "estacionamento",
                        children: [
                            {
                                path: "read",
                                Component: () => _jsx(ReadEstacionamento, {}),
                            },
                            {
                                path: "create",
                                Component: () => _jsx(FormEstacionamento, {}),
                            },
                            {
                                path: "edit/:id",
                                Component: () => _jsx(FormEstacionamento, {}),
                            },
                        ],
                    },
                    {
                        path: "administrador",
                        children: [
                            {
                                path: "read",
                                Component: () => _jsx(ReadAdm, {}),
                            },
                            {
                                path: "create",
                                Component: () => _jsx(FormAdm, {}),
                            },
                            {
                                path: "edit/:id",
                                Component: () => _jsx(FormAdm, {}),
                            },
                        ],
                    },
                    {
                        path: "reserva",
                        children: [
                            {
                                path: "read",
                                Component: () => _jsx(ReadAdm, {}),
                            },
                            {
                                path: "create",
                                Component: () => _jsx(FormAdm, {}),
                            },
                            {
                                path: "edit/:id",
                                Component: () => _jsx(FormAdm, {}),
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        path: "auth",
        Component: () => _jsx(ComponentAuth, {}),
        children: [
            {
                index: true,
                path: "signin",
                Component: () => _jsx(SignIn, {}),
            },
            {
                path: "signup",
                Component: () => _jsx(SignUp, {}),
            },
        ],
    },
]);
export default routes;
