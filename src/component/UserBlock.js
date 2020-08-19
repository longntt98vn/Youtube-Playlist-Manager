import React, { Component } from 'react';

class UserBlock extends Component {
    render() {
        return (
            <div className="card" style={{ width: "350px", height: "150px" }}>
                <div className="row">
                    <div className="col-5" ><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png" style={{ height: "140px", borderRadius: "50%", marginTop: "7px" }} /></div>
                    <div className="col-7">
                        <div>Name:</div>
                        <div>Email:</div>
                        <a href="/">My Playlist</a><br/>
                        <button type="button" name="" id="" className="btn btn-primary" >Đăng xuất</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default UserBlock;