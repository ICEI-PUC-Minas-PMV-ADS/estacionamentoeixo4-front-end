import EscritaImage from "@images/logo/escrita.svg";
import RodaImage from "@images/logo/roda.svg";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const ComponentAuth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    //se for /auth navega para sigin
    if (pathname === "/") {
      navigate("/signin");
    }
  });

  return (
    <div className="w-full h-full">
      <div className="w-screen h-screen overflow-hidden ">
        <div className="grid items-center justify-center w-full h-full grid-cols-1 gap-0 sm:grid-col-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          <div className="flex-col items-center justify-center hidden w-full h-screen space-y-4 bg-black dark:bg-boxdark sm:flex md:flex lg:flex">
            <Link
              to="/"
              className="flex flex-col items-center justify-center space-y-6 "
            >
              <img src={RodaImage} alt="Roda" className="w-32 animate-spin-3" />
              <img src={EscritaImage} alt="Logo" className="w-40" />
            </Link>
            <div className="">
              <h1 className="text-sm text-center px-30 text-bodydark2">
                O App para facilitar a vida de motoristas e estacionamentos,
                tornando a experiência de estacionar mais fácil, segura e
                eficiente
              </h1>
            </div>
          </div>

          {/*  */}
          <div className="flex flex-col items-center justify-center w-full h-screen pt-12 ">
            <div className="flex flex-col items-center w-full ">
              <h2 className="text-4xl font-bold text-black mb-9 dark:text-boxdark sm:text-title-xl2">
                {pathname === "/auth" ||
                  (pathname !== "/auth/signup" ? "Entrar" : "Cadastrar")}
              </h2>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentAuth;
