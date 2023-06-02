import AxiosInstance from "@src/axios/index";
import { interceptor } from "@src/axios/interceptor";
export default class AxiosRequest {
    axios;
    constructor() {
        this.axios = AxiosInstance;
        //inicia os interceptors
        interceptor(this.axios);
    }
    get = async (axiosConfig) => {
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
    post = async (axiosConfig) => {
        return await this.axios
            .post(axiosConfig.url, axiosConfig.data)
            .then((res) => {
            console.log(`Método: POST / Response: ${JSON.stringify(res)}`);
            return res.data;
        })
            .catch((error) => {
            console.log(`ERROR: Método: POST / Error: ${JSON.stringify(error)}`);
            throw error;
        });
    };
    put = async (axiosConfig) => {
        return await this.axios
            .put(axiosConfig.url, axiosConfig.data)
            .then((res) => {
            console.log(`Método: PUT / Response: ${JSON.stringify(res)}`);
            return res.data;
        })
            .catch((error) => {
            console.log(`ERROR: Método: PUT / Error: ${JSON.stringify(error)}`);
            throw error;
        });
    };
    patch = async (axiosConfig) => {
        return await this.axios
            .patch(axiosConfig.url, axiosConfig.data)
            .then((res) => {
            console.log(`Método: PATCH / Response: ${JSON.stringify(res)}`);
            return res.data;
        })
            .catch((error) => {
            console.log(`ERROR: Método: PATCH / Error: ${JSON.stringify(error)}`);
            throw error;
        });
    };
    delete = async (axiosConfig) => {
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
