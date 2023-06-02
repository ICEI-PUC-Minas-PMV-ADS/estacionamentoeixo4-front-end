import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import EscritaImage from "@images/logo/escrita.svg";
import RodaImage from "@images/logo/roda.svg";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
const ComponentAuth = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        //se for /auth navega para sigin
        if (pathname === "/auth") {
            navigate("/auth/signin");
        }
    });
    return (_jsx("div", { className: "w-full h-full", children: _jsx("div", { className: "w-screen h-screen overflow-hidden ", children: _jsxs("div", { className: "grid items-center justify-center w-full h-full grid-cols-1 gap-0 sm:grid-col-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2", children: [_jsxs("div", { className: "flex-col items-center justify-center hidden w-full h-screen space-y-4 bg-black dark:bg-boxdark sm:flex md:flex lg:flex", children: [_jsxs(Link, { to: "/", className: "flex flex-col items-center justify-center space-y-6 ", children: [_jsx("img", { src: RodaImage, alt: "Roda", className: "w-32 animate-spin-3" }), _jsx("img", { src: EscritaImage, alt: "Logo", className: "w-40" })] }), _jsx("div", { className: "", children: _jsx("h1", { className: "text-sm text-center px-30 text-bodydark2", children: "O App para facilitar a vida de motoristas e estacionamentos, tornando a experi\u00EAncia de estacionar mais f\u00E1cil, segura e eficiente" }) })] }), _jsx("div", { className: "flex flex-col items-center justify-center w-full h-screen pt-12 ", children: _jsxs("div", { className: "flex flex-col items-center w-full ", children: [_jsx("h2", { className: "text-4xl font-bold text-black mb-9 dark:text-boxdark sm:text-title-xl2", children: pathname === "/auth" ||
                                        (pathname !== "/auth/signup" ? "Entrar" : "Cadastrar") }), _jsx(Outlet, {})] }) })] }) }) }));
};
export default ComponentAuth;
