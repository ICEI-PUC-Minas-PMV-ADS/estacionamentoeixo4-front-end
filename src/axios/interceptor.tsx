import CoockiesService from "@src/services/auth/CoockieService";
import { Axios } from "axios";

export const interceptor = (axios: Axios) => {
  const cookiesService = new CoockiesService();
  //Request
  axios.interceptors.request.use(
    async (config) => {
      // eslint-disable-next-line no-debugger
      let token = cookiesService.getToken();
      if (config["url"] === "/auth/refresh") {
        token = cookiesService.getRefreshToken();
      }
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers.Accept = "application/json";
      return config;
    },
    (error) => {
      console.error("Interceptor error response" + error);
      throw new Error(error);
    }
  );

  //Response
  axios.interceptors.response.use(
    (response) => {
      const url = response.request.responseURL;
      //Set user
      if (url.includes("/manager")) {
        cookiesService.saveUser(response.data.user);
      }
      //Get token e token Refresh in route me e refresh
      if (url.includes("/auth/me") || url.includes("/auth/refresh")) {
        if (url.includes("/auth/me")) {
          cookiesService.saveUser(response.data.user);
        }
        cookiesService.saveToken(response.data.accessToken);
        cookiesService.saveRefreshToken(response.data.refreshToken);
      }
      return response;
    },
    async (error) => {
      const access_token = cookiesService.getToken();
      if (error?.response.status === 403 && access_token) {
        const response = await refreshToken(error);
        return response;
      }
      return Promise.reject(error);
    }
  );

  async function refreshToken(error) {
    return new Promise((resolve, reject) => {
      try {
        const refresh_token = cookiesService.getRefreshToken();
        const header = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refresh_token}`,
        };
        const parameters = {
          method: "POST",
          headers: header,
        };
        const body = {};
        axios
          .post("/auth/refresh", body, parameters)
          .then(async (res) => {
            cookiesService.saveToken(res.data.accessToken);
            cookiesService.saveRefreshToken(res.data.refreshToken);
            // Fazer algo caso seja feito o refresh token
            return resolve(res);
          })
          .catch(() => {
            // Fazer algo caso não seja feito o refresh token
            return reject(error);
          });
      } catch (err) {
        return reject(err);
      }
    });
  }
};
