import Cookies from "js-cookie";
export default class CoockiesService {
    getToken = () => {
        return Cookies.get("accessToken");
    };
    getRefreshToken = () => {
        return Cookies.get("RefreshToken");
    };
    getAdmin = () => {
        const obj = Cookies.get("user");
        const parser = obj ? JSON.parse(obj) : null;
        return parser;
    };
    getAdminInfos = () => {
        const obj = Cookies.get("userInfo");
        const parser = obj ? JSON.parse(obj) : null;
        return parser;
    };
    removeAll = () => {
        ["user", "userInfo", "accessToken", "accessToken", "RefreshToken"].map((item) => {
            this.removeCoockie(item);
        });
    };
    saveAdmin = (user) => {
        Cookies.set("user", JSON.stringify(user));
    };
    saveAdminInfo = (user) => {
        Cookies.set("userInfo", JSON.stringify(user));
    };
    saveToken = (token) => {
        Cookies.set("accessToken", token);
    };
    saveRefreshToken = (refreshToken) => {
        Cookies.set("RefreshToken", refreshToken);
    };
    removeCoockie = (key) => {
        Cookies.remove(key);
    };
}
