import { NavLink } from "react-router-dom";

const NavHome = () => {
  return (
    <>
      <li>
        <a className="text-bodydark2" href="/about">
          Sobre nós
        </a>
      </li>
      <li>
        <NavLink className="text-bodydark2"   to="/contacts">
          Fale conosco
        </NavLink>
      </li>
      <li>
        <a href="/"></a>
      </li>
    </>
  );
};

export default NavHome;
