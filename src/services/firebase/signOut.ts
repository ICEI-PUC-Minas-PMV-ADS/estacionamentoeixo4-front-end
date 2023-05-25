import { signOut } from "firebase/auth";
import { auth } from "./config";

export const _signOut = () => {
  return signOut(auth)
    .then((res) => {
      console.log(`Conta deslogada com sucesso no Firebase! Usuário: ${JSON.stringify(res)}`);
      return res
    })
    .catch((error) => {
      throw new Error("firebase.signout.account.error: ", error);
    });
};