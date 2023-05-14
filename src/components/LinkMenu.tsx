import { NavLink, useLocation } from "react-router-dom";
import { TMenu } from "../menu/menu";

const LinkMenu = ({ title, link, icon }: TMenu) => {
  const { pathname } = useLocation();
  return (
    <li>
      <NavLink
        to={link as string}
        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
          pathname.includes("calendar") && "bg-graydark dark:bg-meta-4"
        }`}
      >
        <span>{icon}</span>

        {title}
      </NavLink>
    </li>
  );
};

export default LinkMenu;
