// import React from "react";
// import SidebarLinkGroup from "./SidebarLinkGroup";
import { useLocation } from "react-router-dom";
import { useState, useEffect, SyntheticEvent } from "react";
import { NavLink } from "react-router-dom";
import { TMenu } from "../menu/menu";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DropdowLinks = ({ title, childrens, icon }: TMenu) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      event.currentTarget;
      setExpanded(isExpanded ? panel : false);
    };

  const { pathname } = useLocation();

  const [childs, setChilds] = useState<TMenu[] | null>(null);

  useEffect(() => {
    setChilds(childrens as []);
  }, [childrens]);

  return (
    <Accordion
      className={` text-w rounded-sm  py-0 font-medium duration-300 ease-in-out ${
        expanded ? "dark:bg-primary" : "bg-boxdark-2"
      } hover:bg-primary dark:bg-boxdark dark:hover:bg-primary ${
        (pathname === "/" || pathname.includes("dashboard")) && ""
      }`}
      sx={{
        background: `${expanded ? "#5E5CE5" : "#1C2434"}`,
        color: "#000000",
      }}
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography sx={{ width: "100%", flexShrink: 0 }}>
          <NavLink
            to="#"
            className={`group relative  flex w-full items-center  gap-1.5  rounded-sm   font-medium  text-white  duration-300 ease-in-out `}
          >
            <span>{icon}</span>

            {title}
          </NavLink>
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        className={`translate w-full transform overflow-hidden `}
      >
        <ul className="flex flex-col items-start justify-start gap-x-2.5 gap-y-2 ">
          {childs &&
            childs?.map((item: TMenu, index: number) => (
              <li key={index}>
                <NavLink
                  to={item.link as string}
                  className={({ isActive }) =>
                    "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-white duration-300 ease-in-out hover:text-white " +
                    (isActive && "!text-white")
                  }
                >
                  <span>{item.icon}</span>
                  {item.title}
                </NavLink>
              </li>
            ))}
        </ul>
        {/* <!-- Dropdown Menu End --> */}
      </AccordionDetails>
    </Accordion>
  );
};

export default DropdowLinks;
