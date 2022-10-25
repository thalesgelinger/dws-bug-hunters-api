import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDUk6NgQ5itOH_mWh2A6oW_47kk-H6Crdo",
  authDomain: "dws-bug-hunters.firebaseapp.com",
  projectId: "dws-bug-hunters",
  storageBucket: "dws-bug-hunters.appspot.com",
  messagingSenderId: "469905283200",
  appId: "1:469905283200:web:769b23fd5ecd93a921ee65",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
