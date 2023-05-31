import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { NavLink, useLocation } from "react-router-dom";
const LinkMenu = ({ title, link, icon }) => {
    const { pathname } = useLocation();
    return (_jsx("li", { children: _jsxs(NavLink, { to: link, className: `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-primary dark:hover:bg-primary ${pathname.includes("calendar") && "bg-graydark dark:bg-meta-4"}`, children: [_jsx("span", { children: icon }), title] }) }));
};
export default LinkMenu;
