import Axios from "axios";
const AxiosInstance = Axios.create({
  baseURL: `${import.meta.env.HOST}:${import.meta.env.VITE_PORT}/api_producer`,
});
export default AxiosInstance;
