import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DropdownNotification from "./DropdownNotification";
import DropdownMessage from "./DropdownMessage";
import DropdownUser from "./DropdownUser";
import Logo from "../images/logo/logo.svg";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import NavHome from "./NavHome";
import ButtonHamburger from "./ButtonHamburger";
const Header = (props) => {
    const [_searchForm] = useState(props.disableSearch || false);
    const { pathname } = useLocation();
    const handllerMenuToogle = (e) => {
        e.stopPropagation();
        props.setSidebarOpen(!props.sidebarOpen);
    };
    return (_jsx("header", { className: "sticky top-0 flex w-full bg-white z-999 drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none", children: _jsxs("div", { className: "flex items-center justify-between flex-grow px-4 py-4 shadow-2 md:px-6 2xl:px-11", children: [_jsxs("div", { className: "flex items-center gap-2 sm:gap-4 lg:hidden", children: [pathname !== "/" ? (_jsx(ButtonHamburger, { aria_control: "sidebar", props: props, onClick: handllerMenuToogle })) : (_jsx(ButtonHamburger, { aria_control: "sidebar_home", props: props, onClick: handllerMenuToogle })), pathname !== "/dashboard" && (_jsx(Link, { className: "flex-shrink-0 block md:hidden sm:hidden lg:hidden", to: "/", children: _jsx("img", { src: Logo, className: "w-12", alt: "Logo" }) }))] }), (pathname === "/" ||
                    pathname === "/auth/signup" ||
                    pathname === "/auth/signin") && (_jsx("div", { className: "hidden pl-8 sm:hide lg:block", children: _jsx(Link, { className: "flex-shrink-0 block ", to: "/", children: _jsx("img", { src: Logo, className: "w-12", alt: "Logo" }) }) })), pathname !== "/" &&
                    pathname !== "/auth/signup" &&
                    pathname !== "/auth/signin" && (_jsx("div", { className: "hidden sm:block", children: _jsx("form", { action: "https://formbold.com/s/unique_form_id", method: "POST", children: _jsxs("div", { className: "relative", children: [_jsx("button", { className: "absolute left-0 -translate-y-1/2 top-1/2", children: _jsxs("svg", { className: "fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary", width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z", fill: "" }), _jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z", fill: "" })] }) }), _jsx("input", { type: "text", placeholder: "Pesquise aqui ...", className: "w-full pr-4 bg-transparent pl-9 focus:outline-none" })] }) }) })), _jsxs("div", { className: "flex items-center gap-3 2xsm:gap-7", children: [_jsxs("ul", { className: "flex items-center gap-2 2xsm:gap-4", children: [(pathname === "/auth/signup" ||
                                    pathname === "/auth/signin" ||
                                    pathname === "/") && _jsx(NavHome, {}), pathname !== "/auth/signup" &&
                                    pathname !== "/auth/signin" &&
                                    pathname !== "/" && _jsx(DarkModeSwitcher, {}), pathname !== "/auth/signup" &&
                                    pathname !== "/auth/signin" &&
                                    pathname !== "/" && _jsx(DropdownNotification, {}), pathname !== "/auth/signup" &&
                                    pathname !== "/auth/signin" &&
                                    pathname !== "/" && _jsx(DropdownMessage, {})] }), pathname !== "/auth/signup" &&
                            pathname !== "/auth/signin" &&
                            pathname !== "/" && _jsx(DropdownUser, {})] })] }) }));
};
export default Header;
