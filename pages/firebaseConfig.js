import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7R2VlZrVnR3as9iNNV-KnO84uE-F4zH0",
  authDomain: "my-articles-2f007.firebaseapp.com",
  projectId: "my-articles-2f007",
  storageBucket: "my-articles-2f007.appspot.com",
  messagingSenderId: "459791000866",
  appId: "1:459791000866:web:f35a38e7811ce8862bb17b",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
