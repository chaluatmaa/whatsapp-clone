import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCay52WDtvWaKnTOBpXVohimFSKqlOMG6Q",
	authDomain: "whatsapp-clone-900a3.firebaseapp.com",
	databaseURL: "https://whatsapp-clone-900a3.firebaseio.com",
	projectId: "whatsapp-clone-900a3",
	storageBucket: "whatsapp-clone-900a3.appspot.com",
	messagingSenderId: "351396800376",
	appId: "1:351396800376:web:89ad28bc59c4ef124f4a8d",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
