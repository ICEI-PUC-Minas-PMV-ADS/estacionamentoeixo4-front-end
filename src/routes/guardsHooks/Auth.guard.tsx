/* eslint-disable no-debugger */
import CoockiesService from "@src/services/auth/CoockieService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthGuard = (pathname) => {
  const [request, setRequest] = useState(pathname);
  const navigate = useNavigate();

  useEffect(() => {
    function onGuard() {
      const coockies = new CoockiesService();
      const user = coockies.getUser();

      if (request.includes("/auth/signin")) {
        if (user) {
          navigate("/dashboard");
        }
      }

      if (request.includes("/dashboard")) {
        if (!user) {
          navigate("/auth/signin");
          coockies.removeCoockie("accessToken");
          coockies.removeCoockie("RefreshToken");
        }
      }
    }
    onGuard();
  }, [navigate, request]);

  return [request, setRequest];
};
