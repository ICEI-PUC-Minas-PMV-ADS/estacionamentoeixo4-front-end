import Axios from "axios";
// import "dotenv/config";
const AxiosInstance = Axios.create({
  baseURL: "http://localhost:3000/api_producer",
  headers: {},
});
export default AxiosInstance;
