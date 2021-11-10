import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initializeFirebase = () => {
	const app = initializeApp(firebaseConfig);
	return app;
}

export default initializeFirebase;