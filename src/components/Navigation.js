import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GoogleLoginButton } from "react-social-login-buttons";

import * as routes from "../constants/routes";

import { auth, db, firebase } from "../firebase";

import AuthUserContext from "./AuthUserContext";
import UserInfoMenu from "./UserInfoMenu";
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  error: null,
  showingAlert: false,
  showingMenu: false,
  userName: "",
  userEmail: "",
  userPhoto: "",
  loading: true,
};
class Navigation extends Component {
  state = { ...INITIAL_STATE };
  googleLogin = () => {
    const { history } = this.props;
    auth
      .doGoogleSignIn()
      .then(authUser => {
        localStorage.setItem("UID", authUser.user.uid)
        db.doCreateUser(
          authUser.user.uid,
          authUser.user.displayName,
          authUser.user.email,
          authUser.user.photoURL,

        )
          .then(() => {
            history.push(routes.HOME); //redirects to Home Page
          })
          .catch(error => {
            this.setState(byPropKey("error", error));
          });
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });
  };


  timer = () => {
    this.setState({
      showingAlert: true
    });

    setTimeout(() => {
      this.setState({
        showingAlert: false
      });
    }, 4000);
  };

  showingMenu = () => {
    this.setState({
      showingMenu: true,
    });
    return (
      true
    )
  }

  editUserInfo = (username) => {
    const UID = localStorage.getItem("UID");
    if (username != "") {
      const db1 = firebase.db.ref(`users/${UID}/username`);
      db1.set(username);
      this.setState({ userName: username });
    } else return true;
  }

  Navigation = () => (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? this.NavigationAuth(authUser) : this.NavigationNonAuth()
      }
    </AuthUserContext.Consumer>
  );


  NavigationAuth = ({ userInfo }) => (
    <div className="NavBar">
      <Link to={routes.LANDING}>
        <img style={{ height: "75px" }} className="icon-header" src="https://i.imgur.com/aOiIHSX.png" alt="" />
      </Link>
      <div className="header_input" style={{ height: "35px", fontSize:"20px", backgroundColor:"white"}}>
        <input  ></input>
        <div type="button" className="fa fa-search"   ></div>

      </div>
      <ul className="row ml-auto right-nav" >

        <li >
          <div className="navbar-item "><Link to={routes.MYPLAYLIST}>My Playlist</Link></div>
        </li>
        <li className="nav-item dropdown">
          <UserInfoMenu
            userEmail={this.state.userEmail}
            userPhoto={this.state.userPhoto}
            userName={this.state.userName}
            editUserInfo={(username) => this.editUserInfo(username)}
          />
        </li>
      </ul>
    </div>
  );

  NavigationNonAuth = () => (
    <div className="NavBar">
      <Link to={routes.LANDING}>
        <img style={{ height: "75px" }} className="icon-header" src="https://i.imgur.com/aOiIHSX.png" alt="" />
      </Link>
      <div className="header_input" style={{ height: "35px", fontSize:"20px", backgroundColor:"white"}}>
        <input  ></input>
        <div type="button" className="fa fa-search"   ></div>

      </div>

      <ul className="row ml-auto right-nav" >
        <GoogleLoginButton onClick={() => this.googleLogin()} />
      </ul>
    </div>
  );

  componentDidMount() {
    if (localStorage.getItem("UID")) {
      const UID = localStorage.getItem("UID");
      db.doGetAnUnser(UID).then(res => {
        this.setState({
          userName: res.val().username,
          userEmail: res.val().email,
          userPhoto: res.val().photoURL,
          loading: false
        });
      });
    }
  }

  render() {
    return (
      <div>
        {
          this.Navigation()
        }
      </div>
    );
  }
}
export default Navigation;


