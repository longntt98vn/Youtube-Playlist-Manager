import React, { Component } from "react";

import withAuthorization from "./withAuthorization";
import { db } from "../firebase";

class HomePage extends Component {
  state = {
    users: null,
    username: "",
    photoURL: "",
    email: "",
    loading: true
  };

  componentDidMount() {
    const { loggedUser } = this.props;
    db.doGetAnUnser(loggedUser.uid).then(res => {
      this.setState({
        username: res.val().username,
        email: res.val().email,
        photoURL: res.val().photoURL,
        loading: false
      });
    });
  }

  render() {
    const { username, loading, email, photoURL } = this.state;
    return (
      <div className="row">
        <div className="col-8">
          {!loading &&
            <div className="centered">
              <h3>Hello {username}!</h3>
              <img src={photoURL} alt="" style={{ height: "100px", borderRadius: "50%" }} />
              <p>{email}</p>
            </div>
          }
        </div>

      </div>
    );
  }
}


const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage); 