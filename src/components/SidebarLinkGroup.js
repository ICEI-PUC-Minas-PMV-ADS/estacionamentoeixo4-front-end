import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
const SidebarLinkGroup = ({ children, activeCondition }) => {
    const [open, setOpen] = useState(activeCondition);
    const handleClick = () => {
        setOpen(!open);
    };
    return _jsx("li", { children: children(handleClick, open) });
};
export default SidebarLinkGroup;
