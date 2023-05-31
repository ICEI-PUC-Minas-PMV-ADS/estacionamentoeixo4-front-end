import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink } from "react-router-dom";
const NavHome = () => {
    return (_jsxs(_Fragment, { children: [_jsx("li", { children: _jsx("a", { className: "text-bodydark2", href: "/about", children: "Sobre n\u00F3s" }) }), _jsx("li", { children: _jsx(NavLink, { className: "text-bodydark2", to: "/contacts", children: "Fale conosco" }) }), _jsx("li", { children: _jsx(NavLink, { className: "text-bodydark2 px-3 py-2  border rounded-md", to: "/auth", children: "Login" }) })] }));
};
export default NavHome;
