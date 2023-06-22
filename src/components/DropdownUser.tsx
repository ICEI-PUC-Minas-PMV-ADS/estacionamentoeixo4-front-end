import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "@images/logo/logo.svg";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useMutation, useQuery } from "react-query";
import AxiosRequest from "@src/services/axiosRequests/axiosRequests";
import { _signOut } from "@src/services/firebase/signOut";
import CoockiesService from "../services/auth/CoockieService";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const coockies = new CoockiesService();
  const axios = new AxiosRequest();
  const trigger = useRef(null);
  const dropdown = useRef(null);
  const user = coockies.getAdmin();
  const userRequest = new AxiosRequest();

  const { pathname } = useLocation();

  //Recupera o user logado
  const { data, error } = useQuery({
    queryKey: ["Admin"],
    cacheTime: 12,
    queryFn: async () =>
      await userRequest.get({ url: `/administrador/${user?.id}` }),
  });
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      const drop = (dropdown.current as HTMLDivElement) || "";
      const trig = (trigger.current as unknown as HTMLAnchorElement) || "";
      if (!dropdownOpen || drop.contains(target) || trig?.contains(target))
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const mutationOut = useMutation({
    mutationFn: async () => await axios.get({ url: "/auth/logout" }),
  });

  const signOut = async () => {
    //Faz logout no
    await _signOut()
      .then(async () => {
        await mutationOut
          .mutateAsync()
          .then(() => {
            coockies.removeAll();
            navigate("/signin");
          })
          .catch(async () => {
            await mutationOut.mutateAsync().then(() => {
              coockies.removeAll();
              navigate("/signin");
            });
          });
      })
      .catch(async () => {
        throw new Error("Erro ao deslogar do firebas");
      });
  };

  return (
    <div className="relative z-50">
      <a
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
      //to="/dashboard/user/profile"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {!error && data?.nome}
          </span>
        </span>

        {pathname !== "/" &&
          pathname !== "/auth/signup" &&
          pathname !== "/signin" && (
            <span className="w-12 h-12 rounded-full">
              <img src={Logo} alt="User" />
            </span>
          )}

        <svg
          className={`hidden fill-current sm:block ${dropdownOpen ? "rotate-180" : ""
            }`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </a>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? "block" : "hidden"
          }`}
      >
        
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <Logout />
          Sair
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
