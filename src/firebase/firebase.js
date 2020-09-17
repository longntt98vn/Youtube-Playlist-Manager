import firebase from "firebase/app";
import "@firebase/auth";
import "@firebase/database";

//this config is being used for both development and production environment. Though, it is a best practice creating a second project and have two configs: one for production (prodConfig) and another for development (devConfig), so you choose the config based on the environment.

const config = {
  apiKey: "AIzaSyBIuc0OUP2sC9FVJOOO1uucFkxydOni3mM",
    authDomain: "note-manager-1310f.firebaseapp.com",
    databaseURL: "https://note-manager-1310f.firebaseio.com",
    projectId: "note-manager-1310f",
    storageBucket: "note-manager-1310f.appspot.com",
    messagingSenderId: "510625283322",
    appId: "1:510625283322:web:b636ae9176490718c09d43",
    measurementId: "G-QHC8S5S0RJ"
};

if (!firebase.apps.length) {
  //initializing with the config object
  firebase.initializeApp(config);
}

//separting database API and authentication
const db = firebase.database();
const auth = firebase.auth();

const facebookProvider = new firebase.auth.FacebookAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { db, auth, facebookProvider, googleProvider };
