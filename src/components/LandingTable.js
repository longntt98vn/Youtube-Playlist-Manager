import React, { Component } from 'react';
import { db } from "../firebase/firebase";
import { Link } from "react-router-dom"


class LandingTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoData: [],
            nextVideo: "",
            videoID: "",
            videoThumbnail: "",
            videoTitle: "",
        }
    }

    componentDidMount() {
        db.ref(`playlist/public/${this.props.idDB}/firstVideo`).on("value", data => {
            db.ref(`playlist/public/${this.props.idDB}/playlistVideo/${data.val()}`).on("value", data1 => {
                if (data1.val()) {
                    this.setState({
                        videoID: data1.key,
                        videoThumbnail: data1.val().videoThumbnail,
                        videoTitle: data1.val().videoTitle,
                    });
                }
            })
        })
    }

    render() {
        return (
                <div className="col-3 "  >
                    <div className="playlist-table">

                        <Link to={"/videoplayer/" + this.props.idDB + "." + this.state.videoID}>
                            <div style={{position:"relative", left:"0", top:"0"}}>
                                <img src={this.state.videoThumbnail} alt="" style={{ width: "100%", position:"relative", top:"0", left:"0" }} />
                                <div style={{height:"100%", width:"33%", top:"0", right:"0", backgroundColor:"#000000cc",position:"absolute"}}>
                                    <p style={{ color: "white", fontSize: "20px" , margin: "50% 0"}}>{this.props.quantity} <br/>video</p>
                                </div>
                            </div>
                            
                            <p style={{ color: "white", fontSize: "20px", width: "100%", height: "55px", textOverflow: "ellipsis", overflow: "hidden" }}>Playlist - {this.props.playlistTitle} - {this.state.videoTitle} </p>
                        </Link>
                    </div>

                </div>
        );
    }
}

export default LandingTable;