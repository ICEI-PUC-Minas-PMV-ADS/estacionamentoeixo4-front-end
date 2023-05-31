import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import DropdowLinks from "./DropdowLinks";
import LinkMenu from "./LinkMenu";
import Logo from "@images/logo/logo.svg";
import CoockiesService from "@src/services/auth/CoockieService";
import { Dashboard } from "@mui/icons-material";
const Sidebar = ({ sidebarOpen, setSidebarOpen, aria_control, menu }) => {
  const { pathname } = useLocation();
  const trigger = useRef(null);
  const sidebar = useRef(null);
  const coockies = new CoockiesService();
  const user = coockies.getAdmin();
  const storedSidebarExpanded = localStorage.getItem(
    `${aria_control}-expanded`
  );
  const [sidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    if (
      user &&
      pathname === "/" &&
      !menu.find((item) => item.title === "Dashboard")
    ) {
      menu.unshift({
        title: "Dashboard",
        childrens: null,
        link: "/dashboard",
        icon: <Dashboard />,
      });
    }
  }, [user, menu, pathname]);
  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem(`${aria_control}-expanded`, String(sidebarExpanded));
    if (sidebarExpanded) {
      (document.querySelector("body") as HTMLBodyElement).classList.add(
        `${aria_control}-expanded`
      );
    } else {
      (document.querySelector("body") as HTMLBodyElement).classList.remove(
        `${aria_control}-expanded`
      );
    }
  });

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-2 lg:py-2">
        <NavLink
          to="/"
          className="flex items-center justify-center w-full pr-4 "
        >
          <img src={Logo} className="w-22" alt="logo why parck" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls={`${aria_control}-expanded`}
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 py-4 mt-2 lg:mt-2 lg:px-2">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="flex flex-col ">
              {menu.map((item, index) =>
                /* <!-- Menu Item Dashboard --> */
                item.childrens ? (
                  <DropdowLinks
                    key={index}
                    title={item.title}
                    childrens={item.childrens}
                    icon={item.icon}
                  />
                ) : (
                  <LinkMenu
                    title={item.title}
                    key={index}
                    icon={item.icon}
                    link={item.link}
                  />
                )
              )}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
