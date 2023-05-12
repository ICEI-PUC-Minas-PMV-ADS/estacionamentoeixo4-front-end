import Axios from "axios";
import "dotenv/config";
const AxiosRequest = Axios.create({
  baseURL: process.env.SERVER,
});
export default AxiosRequest;
