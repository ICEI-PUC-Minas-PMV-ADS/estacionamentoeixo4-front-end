import Cookies from "js-cookie";

export default class CoockiesService {
  public readonly getToken = (): string => {
    return Cookies.get("accessToken") as string;
  };

  public readonly getRefreshToken = (): string => {
    return Cookies.get("RefreshToken") as string;
  };
  public readonly getAdmin = () => {
    const obj = Cookies.get("user");
    const parser = obj ? JSON.parse(obj) : null;
    return parser;
  };

  public readonly saveAdmin = (user) => {
    Cookies.set("user", JSON.stringify(user));
  };
  public readonly saveToken = (token: string) => {
    Cookies.set("accessToken", token);
  };

  public readonly saveRefreshToken = (refreshToken: string) => {
    Cookies.set("RefreshToken", refreshToken);
  };

  public readonly removeCoockie = (key: string) => {
    Cookies.remove(key);
  };
}
