import { Axios } from "axios";
import axiosRequestInterface from "./axiosRequestsInterface";
import AxiosInstance from "@src/axios/index";
import { interceptor } from "@src/axios/interceptor";

export default class AxiosRequest {
  private readonly axios: Axios;
  constructor() {
    this.axios = AxiosInstance;
    //inicia os interceptors
    interceptor(this.axios);
  }

  public readonly get = async (axiosConfig: axiosRequestInterface) => {
    return await this.axios
      .get(axiosConfig.url)
      .then((res) => {
        console.log(`Método: GET / Response: ${JSON.stringify(res)}`);
        return res.data;
      })
      .catch((error) => {
        console.log(`ERROR: Método: GET / Error: ${JSON.stringify(error)}`);
        throw error;
      });
  };
  public readonly post = async (axiosConfig: axiosRequestInterface) => {
    return await this.axios
      .post(axiosConfig.url, axiosConfig.data!)
      .then((res) => {
        console.log(`Método: POST / Response: ${JSON.stringify(res)}`);
        return res.data;
      })
      .catch((error) => {
        console.log(`ERROR: Método: POST / Error: ${JSON.stringify(error)}`);
        throw error;
      });
  };
  public readonly put = async (axiosConfig: axiosRequestInterface) => {
    return await this.axios
      .put(axiosConfig.url, axiosConfig.data!)
      .then((res) => {
        console.log(`Método: PUT / Response: ${JSON.stringify(res)}`);
        return res.data;
      })
      .catch((error) => {
        console.log(`ERROR: Método: PUT / Error: ${JSON.stringify(error)}`);
        throw error;
      });
  };
  public readonly patch = async (axiosConfig: axiosRequestInterface) => {
    return await this.axios
      .patch(axiosConfig.url, axiosConfig.data!)
      .then((res) => {
        console.log(`Método: PATCH / Response: ${JSON.stringify(res)}`);
        return res.data;
      })
      .catch((error) => {
        console.log(`ERROR: Método: PATCH / Error: ${JSON.stringify(error)}`);
        throw error;
      });
  };
  public readonly delete = async (axiosConfig: axiosRequestInterface) => {
    return await this.axios
      .delete(axiosConfig.url)
      .then((res) => {
        console.log(`Método: DELETE / Response: ${JSON.stringify(res)}`);
        return res.data;
      })
      .catch((error) => {
        console.log(`ERROR: Método: DELETE / Error: ${JSON.stringify(error)}`);
        throw error;
      });
  };
}
