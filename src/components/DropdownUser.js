import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "@images/logo/logo.svg";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useMutation, useQuery } from "react-query";
import AxiosRequest from "@src/services/axiosRequests/axiosRequests";
import { _signOut } from "@src/services/firebase/signOut";
import CoockiesService from "../services/auth/CoockieService";
const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const coockies = new CoockiesService();
    const axios = new AxiosRequest();
    const trigger = useRef(null);
    const dropdown = useRef(null);
    const user = coockies.getAdmin();
    const userRequest = new AxiosRequest();
    const { pathname } = useLocation();
    //Recupera o user logado
    const { data, error } = useQuery({
        queryKey: ["Admin"],
        cacheTime: 12,
        queryFn: async () => await userRequest.get({ url: `/administrador/${user?.id}` }),
    });
    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }) => {
            if (!dropdown.current)
                return;
            const drop = dropdown.current || "";
            const trig = trigger.current || "";
            if (!dropdownOpen || drop.contains(target) || trig?.contains(target))
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("click", clickHandler);
        return () => document.removeEventListener("click", clickHandler);
    });
    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!dropdownOpen || keyCode !== 27)
                return;
            setDropdownOpen(false);
        };
        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    });
    const mutationOut = useMutation({
        mutationFn: async () => await axios.get({ url: "/auth/logout" }),
    });
    const signOut = async () => {
        //Faz logout no
        await _signOut()
            .then(async () => {
            await mutationOut
                .mutateAsync()
                .then(() => {
                coockies.removeAll();
                navigate("/auth");
            })
                .catch(async () => {
                await mutationOut.mutateAsync().then(() => {
                    coockies.removeAll();
                    navigate("/auth/signin");
                });
            });
        })
            .catch(async () => {
            throw new Error("Erro ao deslogar do firebas");
        });
    };
    return (_jsxs("div", { className: "relative z-50", children: [_jsxs(Link, { ref: trigger, onClick: () => setDropdownOpen(!dropdownOpen), className: "flex items-center gap-4", to: "/dashboard/user/profile", children: [_jsx("span", { className: "hidden text-right lg:block", children: _jsx("span", { className: "block text-sm font-medium text-black dark:text-white", children: !error && data?.nome }) }), pathname !== "/" &&
                        pathname !== "/auth/signup" &&
                        pathname !== "/auth/signin" && (_jsx("span", { className: "w-12 h-12 rounded-full", children: _jsx("img", { src: Logo, alt: "User" }) })), _jsx("svg", { className: `hidden fill-current sm:block ${dropdownOpen ? "rotate-180" : ""}`, width: "12", height: "8", viewBox: "0 0 12 8", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z", fill: "" }) })] }), _jsxs("div", { ref: dropdown, onFocus: () => setDropdownOpen(true), onBlur: () => setDropdownOpen(false), className: `absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? "block" : "hidden"}`, children: [_jsxs("ul", { className: "flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark", children: [_jsx("li", { children: _jsxs(Link, { to: "/dashboard/user/profile", className: "flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base", children: [_jsx(Person, {}), "My Profile"] }) }), _jsx("li", { children: _jsxs(Link, { to: "/dashboard/user/settings", className: "flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base", children: [_jsx(Settings, {}), "Account Settings"] }) })] }), _jsxs("button", { onClick: () => signOut(), className: "flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base", children: [_jsx(Logout, {}), "Log Out"] })] })] }));
};
export default DropdownUser;
