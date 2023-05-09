import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnt9CBCcPzeWBbBNHcdlicnPo7lDJf4Pc",
  authDomain: "whypark-ab6d6.firebaseapp.com",
  projectId: "whypark-ab6d6",
  storageBucket: "whypark-ab6d6.appspot.com",
  messagingSenderId: "887804319158",
  appId: "1:887804319158:web:d901ee288addfd74819d17"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);