import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// import React from "react";
// import SidebarLinkGroup from "./SidebarLinkGroup";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const DropdowLinks = ({ title, childrens, icon }) => {
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        event.currentTarget;
        setExpanded(isExpanded ? panel : false);
    };
    const { pathname } = useLocation();
    const [childs, setChilds] = useState(null);
    useEffect(() => {
        setChilds(childrens);
    }, [childrens]);
    return (_jsxs(Accordion, { className: ` text-w rounded-sm  py-0 font-medium duration-300 ease-in-out ${expanded ? "dark:bg-primary" : "bg-boxdark-2"} hover:bg-primary dark:bg-boxdark dark:hover:bg-primary ${(pathname === "/" || pathname.includes("dashboard")) && ""}`, sx: {
            background: `${expanded ? "#5E5CE5" : "#1C2434"}`,
            color: "#000000",
        }, expanded: expanded === "panel1", onChange: handleChange("panel1"), children: [_jsx(AccordionSummary, { expandIcon: _jsx(ExpandMoreIcon, {}), "aria-controls": "panel1bh-content", id: "panel1bh-header", children: _jsx(Typography, { sx: { width: "100%", flexShrink: 0 }, children: _jsxs(NavLink, { to: "#", className: `group relative  flex w-full items-center  gap-1.5  rounded-sm   font-medium  text-white  duration-300 ease-in-out `, children: [_jsx("span", { children: icon }), title] }) }) }), _jsx(AccordionDetails, { className: `translate w-full transform overflow-hidden `, children: _jsx("ul", { className: "flex flex-col items-start justify-start gap-x-2.5 gap-y-2 ", children: childs &&
                        childs?.map((item, index) => (_jsx("li", { children: _jsxs(NavLink, { to: item.link, className: ({ isActive }) => "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-white duration-300 ease-in-out hover:text-white " +
                                    (isActive && "!text-white"), children: [_jsx("span", { children: item.icon }), item.title] }) }, index))) }) })] }));
};
export default DropdowLinks;
