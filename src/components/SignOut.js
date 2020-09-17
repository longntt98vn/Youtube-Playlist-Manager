import React from "react";
import { Button } from "reactstrap";

import { auth } from "../firebase";

// const signOut  = () => {
//   localStorage.removeItem("UID");
//   auth.doSignOut;
// }

const SignOutButton = () => (
  <Button className="signout-button" color="info" onClick={()=>auth.doSignOut().then(function(){
    window.location.replace("/");
    localStorage.removeItem("UID")})}>
    Sign Out
  </Button>
);

export default SignOutButton;