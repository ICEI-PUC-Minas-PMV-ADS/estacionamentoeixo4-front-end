import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";

export const signUp = (email, senha) => {
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(`Conta criada com sucesso no Firebase! Usuário: ${JSON.stringify(user)}`);
      return userCredential
    })
    .catch((error) => {
      if (error.message.includes("email-already-in-use")) {
        Alert.alert("E-mail já cadastrado.");
      } else {
        Alert.alert("Erro inesperado, tente novamente mais tarde.");
      }

      throw new Error("firebase.create.account.error: ", error);
    });
};