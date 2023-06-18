import Axios from "axios";
const AxiosInstance = Axios.create({
  baseURL: `http://${import.meta.env.VITE_SERVER}:${import.meta.env.VITE_PORT_SERVER}/api_producer`,
});
export default AxiosInstance;
