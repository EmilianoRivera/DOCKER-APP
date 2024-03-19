import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  collectionGroup,
} from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyBEcjGyiFFkHELCiZnA_6AeUFVVy_J1LEc",
  
    authDomain: "prueba-docker-f4ba0.firebaseapp.com",
  
    projectId: "prueba-docker-f4ba0",
  
    storageBucket: "prueba-docker-f4ba0.appspot.com",
  
    messagingSenderId: "228251118350",
  
    appId: "1:228251118350:web:a9c9d51007fa8e5c14855f"
  
  };
  

const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
export {
    db,   getFirestore,
    collection,
    getDocs,
    onSnapshot,
    collectionGroup,
}
