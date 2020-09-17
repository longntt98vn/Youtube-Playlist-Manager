import React from 'react';

function Comment(props) {
    return (
        <div className="row" style={{margin:"30px 0px"}}>
            <div className="col-1">
                <img src={props.photoURL} alt="" style={{ borderRadius: "50%", height: "50px" }}></img>
            </div>
            <div className="col" style={{fontSize:"20px", color:"white"}}>
                <p>{props.username}</p>
                <p>{props.commentDetail}</p>
            </div>
        </div>
    );
}

export default Comment;