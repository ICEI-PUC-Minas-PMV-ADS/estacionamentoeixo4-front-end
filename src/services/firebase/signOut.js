import { signOut } from "firebase/auth";
import { auth } from "./config";
export const _signOut = () => {
    return signOut(auth)
        .then(() => {
        console.log(`Conta deslogada com sucesso no Firebase!`);
    })
        .catch((error) => {
        throw new Error("firebase.signout.account.error: ", error);
    });
};
