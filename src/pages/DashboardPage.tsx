import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  //Chama a rota index do dashboard  caso não tenha
  useEffect(() => {
    pathname === "/dashboard" && navigate("/dashboard/reservas/read");
  });

  return <Outlet />;
};
export default DashboardPage;
