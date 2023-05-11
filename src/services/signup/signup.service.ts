import AxiosRequest from "@src/axios";
import { Axios } from "axios";
interface IMutationAdm {
  nome: string;
  email: string;
  uuid_firebase: string;
}
export default class ServiceSignup {
  service: Axios = AxiosRequest;

  public async me(email: string, uuid_firebase: string): Promise<IMutationAdm> {
    return this.service
      .post("/auth/me", { email, uuid_firebase })
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  }

  public async create(user: IMutationAdm): Promise<IMutationAdm> {
    return this.service
      .post("/manager", { user })
      .then((result) => result.data)
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
  }
}
