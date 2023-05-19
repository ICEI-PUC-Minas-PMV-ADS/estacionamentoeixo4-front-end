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
      className={` rounded-sm bg-boxdark-2  font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
        (pathname === "/" || pathname.includes("dashboard")) &&
        "bg-graydark dark:bg-meta-4"
      }`}
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
            className={`group w-full relative gap-1.5   flex items-center  rounded-sm  font-medium text-bodydark1 duration-300 ease-in-out `}
          >
            <span>{icon}</span>

            {title}
          </NavLink>
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        className={`w-full translate transform overflow-hidden `}
      >
        <ul className="flex flex-col gap-x-2.5 gap-y-2 items-start justify-start ">
          {childs &&
            childs?.map((item: TMenu, index: number) => (
              <li key={index}>
                <NavLink
                  to={item.link as string}
                  className={({ isActive }) =>
                    "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
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

  // return (
  //   <>
  //     <SidebarLinkGroup
  //       activeCondition={pathname === "/" || pathname.includes("dashboard")}
  //     >
  //       {(handleClick, open) => {
  //         return (
  //           <React.Fragment>
  //             <NavLink
  //               to="#"
  //               className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
  //                 (pathname === "/" || pathname.includes("dashboard")) &&
  //                 "bg-graydark dark:bg-meta-4"
  //               }`}
  //               onClick={(e) => {
  //                 e.preventDefault();
  //                 sidebarExpanded ? handleClick() : setSidebarExpanded(true);
  //               }}
  //             >
  //               <span>{icon}</span>

  //               {title}
  //               <svg
  //                 className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
  //                   open && "rotate-180"
  //                 }`}
  //                 width="20"
  //                 height="20"
  //                 viewBox="0 0 20 20"
  //                 fill="none"
  //                 xmlns="http://www.w3.org/2000/svg"
  //               >
  //                 <path
  //                   fillRule="evenodd"
  //                   clipRule="evenodd"
  //                   d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
  //                   fill=""
  //                 />
  //               </svg>
  //             </NavLink>
  //             {/* <!-- Dropdown Menu Start --> */}
  //             <div
  //               className={`translate transform overflow-hidden ${
  //                 !open && "hidden"
  //               }`}
  //             >
  //               <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
  //                 {childs &&
  //                   childs?.map((item: TMenu, index: number) => (
  //                     <li key={index}>
  //                       <NavLink
  //                         to={item.link as string}
  //                         className={({ isActive }) =>
  //                           "group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white " +
  //                           (isActive && "!text-white")
  //                         }
  //                       >
  //                         <span>{item.icon}</span>
  //                         {item.title}
  //                       </NavLink>
  //                     </li>
  //                   ))}
  //               </ul>
  //             </div>
  //             {/* <!-- Dropdown Menu End --> */}
  //           </React.Fragment>
  //         );
  //       }}
  //     </SidebarLinkGroup>
  //   </>
  // );
};

export default DropdowLinks;
