import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
const Breadcrumb = (props) => {
    return (_jsxs("div", { className: "flex flex-col gap-3 mb-6 sm:flex-row sm:items-center sm:justify-between", children: [_jsx("h2", { className: "font-semibold text-black text-title-md2 dark:text-white", children: props.pageName }), _jsx("nav", { children: _jsxs("ol", { className: "flex items-center gap-2", children: [_jsx("li", { children: _jsx(Link, { to: "/dashboard/home/read", children: "Dashboard /" }) }), _jsx("li", { className: "text-primary", children: props.pageName })] }) })] }));
};
export default Breadcrumb;
