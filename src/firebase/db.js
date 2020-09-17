//this is going to store Firebase realtime database API code
import { db } from "./firebase";

//##########3 user API

//create an user and store it at users/id path (it's an asynchronous func)
export const doCreateUser = (id, username, email, photoURL) =>{
  console.log(2.5);
  db.ref(`users/${id}`).on("value", data => {
    if(!data.val()){
      db.ref(`users/${id}`).set({
        username, email, photoURL
      })
    }else {
      window.location.replace("/");
      return true}
  })
}
  

//returns all users from firebase realtime db
export const onceGetUsers = () => db.ref("users").once("value");

export const doGetAnUnser = uid => db.ref(`users/${uid}`).once("value");

// other APIs could come below
