import React, { Component } from 'react';
import SignOutButton from "./SignOut";

class UserInfoMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonState: true,
            username: "",
        }
    }

    isChange = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    editUserInfo = () => {
        if (this.state.buttonState) {
            return (<div type="button" onClick={() => this.editClick()} className="btn btn-primary editUserInfo-button">Edit Info</div>)
        } else return <div type="button" onClick={(username) => this.saveClick(this.state.username)} className="btn btn-success editUserInfo-button">Save</div>
    }

    usernameState = () => {
        if (this.state.buttonState) return (<p>{this.props.userName}</p>)
        else return (<input onChange={(event) => this.isChange(event)} defaultValue={this.props.userName} style={{ width: "inherit" }}></input>)

    }

    editClick = () => {
        this.setState({
            buttonState: false
        });
    }
    saveClick = (username) => {
        this.setState({
            buttonState: true
        });
        this.props.editUserInfo(username)
    }

    render() {
        return (
            <div className="dropdown">
                <button className="navbar-item dropdown-toggle" type="button" id="dropdownMenuButton" style={{ color: "#007bff", backgroundColor: "transparent", border: "none" }} data-toggle="dropdown" >
                    <img alt="" src={this.props.userPhoto} style={{ height: "50px", borderRadius: "50%" }} />
                </button>
                <div className="dropdown-menu" style={{ width: "350px", left: "-290px" }}>
                    <form >
                        <div className="userInfo row">
                            <div className="col-4">
                                <img src={this.props.userPhoto} alt="" style={{ height: "100px", borderRadius: "50%" }}></img>
                            </div>
                            <div className="col-8">
                                {this.usernameState()}
                                <p>{this.props.userEmail}</p>
                                {this.editUserInfo()}
                            </div>
                        </div>
                    </form>
                    <div className="dropdown-divider"></div>
                    <div style={{ padding: "0px 0px 10px 0px" }}> <SignOutButton /></div>

                </div>
            </div>
        );
    }
}

export default UserInfoMenu;