import { auth, facebookProvider, googleProvider } from "./firebase"; //importing the previously instatiated object from the firebase.js config file

//## below the authentication functions ##

//sign in
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

//sign out
export const doSignOut = () => auth.signOut();

//#### for
//     facebook #####
export const doFacebookSignIn = () => auth.signInWithPopup(facebookProvider);
export const doGoogleSignIn = () => {auth.signInWithPopup(googleProvider);console.log(2);}
