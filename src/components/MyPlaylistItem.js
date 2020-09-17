import React, { Component } from 'react';
import { Link } from "react-router-dom";

class PlaylistItem extends Component {
    render() {
        return (
            <Link to={"/videoplayer/" + this.props.playlistID + "." + this.props.videoID}>
                <div className="row" style={{ margin: "1px 0px" }}>
                    <div className="col-3">
                        <img src={this.props.videoThumbnail} style={{ height: "64px", width: "100px" }} alt=""></img>
                    </div>
                    <div className="col-9" style={{ color: "white", fontSize: "20px", height: "64px",textOverflow: "ellipsis", overflow: "hidden" }}>
                        <p>{this.props.videoTitle}</p>
                    </div>
                </div>
            </Link>
        );
    }
}

export default PlaylistItem;