import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

// Initialize Firebase
const initilizeAuthentication = () => {
    initializeApp(firebaseConfig);
}

export default initilizeAuthentication;