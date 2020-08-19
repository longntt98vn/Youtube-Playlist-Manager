import React, { Component } from 'react';
import GoogleBtn from './GoogleBtn';
class Header extends Component {
    render() {
        return (
            <div className="header">
                <img className="icon_header" src="https://i.imgur.com/KjXX84B.png"  alt=""></img>
                <div className="header_input">
                    <input  ></input>
                    <div className="fa fa-search"   ></div>
                    
                </div>
                {/* <div className="btn btn-primary fa fa-user-circle " >  Đăng nhập</div> */}
                <GoogleBtn></GoogleBtn>
            </div>
        );
    }
}

export default Header;