import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Sidebar from "@components/Sidebar";
import Header from "@components/Header";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import menu, { menu_inital } from "@src/menu/menu";
import { useAuthGuard } from "@src/routes/guardsHooks/Auth.guard";
const DefaultLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = location;
    const [request, setRequest] = useAuthGuard(pathname);
    //Chama o hoocks guard
    useEffect(() => {
        setRequest(pathname);
    }, [pathname, setRequest, request, navigate]);
    if (pathname === "/auth/signin") {
        return (_jsx("main", { className: "flex flex-col w-full h-screen overflow-hidden", children: _jsx("div", { className: "mx-auto max-w-screen-2xl", children: _jsx(Outlet, {}) }) }));
    }
    if (pathname === "/auth/signup") {
        return (_jsx("main", { className: "flex flex-col w-full h-screen overflow-hidden", children: _jsx("div", { className: "mx-auto max-w-screen-2xl ", children: _jsx(Outlet, {}) }) }));
    }
    if (pathname === "/") {
        return (_jsxs("main", { className: "flex flex-col w-full h-screen overflow-x-hidden", children: [_jsx(Sidebar, { sidebarOpen: sidebarOpen, setSidebarOpen: setSidebarOpen, aria_control: "sidebar_home", menu: menu_inital }), _jsx(Header, { sidebarOpen: sidebarOpen, setSidebarOpen: setSidebarOpen }), _jsx("div", { className: "mx-auto max-w-screen-2xl ", children: _jsx(Outlet, {}) })] }));
    }
    return (_jsx("div", { className: "dark:bg-boxdark-2 dark:text-bodydark", children: _jsxs("div", { className: "flex h-screen overflow-hidden", children: [pathname !== "/auth/signup" && pathname !== "/auth/signin" ? (_jsx(Sidebar, { sidebarOpen: sidebarOpen, setSidebarOpen: setSidebarOpen, aria_control: "sidebar_home", menu: menu })) : (""), _jsxs("div", { className: "relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto", children: [_jsx(Header, { sidebarOpen: sidebarOpen, setSidebarOpen: setSidebarOpen }), _jsx("main", { children: _jsx("div", { className: "p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10", children: _jsx(Outlet, {}) }) })] })] }) }));
};
export default DefaultLayout;
