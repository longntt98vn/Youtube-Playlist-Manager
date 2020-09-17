import React, { Component } from 'react';
import { Link } from "react-router-dom";


class EditMyPlaylistItem extends Component {

    getVideoLink(videoID) {
        return "https://www.youtube.com/watch?v=" + videoID
    }

    deleteVideo = (videoID) => {
        this.props.deleteVideo(videoID);
    }

    sendVideoInfo = (videoID, videoTitle) => {
        this.props.videoID2(videoID, videoTitle)
    }

    render() {
        return (
            <Link to={"/videoplayer/" + this.props.playlistID + "." + this.props.videoID}>
                <div className="edit-myplaylist-item row">

                    <div className="col-3">
                        <img onClick={(videoID, videoTitle) => this.sendVideoInfo(this.props.videoID, this.props.videoTitle)} src={this.props.videoThumbnail} alt="" style={{ height: "99px" }} />

                    </div>
                    <div className="col-7">
                        <p style={{ height: "98px", width: "100%", fontSize: "20px", textOverflow: "ellipsis", overflow: "hidden" }}>{this.props.videoTitle}</p>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger" type="button" onClick={(videoID) => this.deleteVideo(this.props.videoID)} style={{height:"-webkit-fill-available", fontSize: "20px" }} >X</button>
                    </div>


                </div>
            </Link>
        );
    }
}

export default EditMyPlaylistItem;