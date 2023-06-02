import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon } from "@mui/material";
const CardOne = (props) => {
    return (_jsx("div", { className: "rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark", children: _jsxs("div", { className: "mt-4 flex items-end justify-between", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-title-md font-bold text-black dark:text-white", children: props.count }), _jsx("span", { className: "text-md font-medium", children: props.title })] }), _jsx("div", { className: "dark:bg-meta-4' flex h-20 w-20 items-center justify-center rounded-full bg-meta-2", children: _jsx(Icon, { component: props.icon, style: { width: "45px", height: "45px" } }) })] }) }));
};
export default CardOne;
