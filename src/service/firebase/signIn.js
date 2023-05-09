import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

export const signIn = (email, senha) => {
  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(`Conta logada com sucesso no Firebase! Usuário: ${JSON.stringify(user)}`);
      return userCredential
    })
    .catch((error) => {
      if (
        error.message.includes("auth/wrong-password") ||
        error.message.includes("firebase.login.error")
      ) {
        alert("Email ou senha inválido. Tente novamente.");
      } else {
        alert("Erro inesperado, tente novamente mais tarde.");
      }

      throw new Error("firebase.login.error: ", error);
    });
};