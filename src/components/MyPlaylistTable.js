import React, { Component } from 'react';
import { db } from "../firebase/firebase"
import { Link } from "react-router-dom";


class MyPlaylistTable extends Component {
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

    toSlug(str) {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }

    deletePlaylist = (playlistIDofUser, accessModifier, idDB) => {
        this.props.deletePlaylist(playlistIDofUser, accessModifier, idDB)
    }

    componentDidMount() {

        db.ref(`playlist/${this.props.accessModifier}/${this.props.idDB}/firstVideo`).on("value", data => {
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
                    <div className="btn-group">
                        <Link to={"/editmyplaylist/" + this.toSlug(this.props.playlistTitle) + "." + this.props.playlistIDofUser + ".html"}>
                            <button className="btn btn-warning">Edit</button>
                        </Link>
                        <button className="btn btn-danger" onClick={(playlistIDofUser, accessModifier, idDB) => this.deletePlaylist(this.props.playlistIDofUser, this.props.accessModifier, this.props.idDB)} >Del</button>
                    </div>

                    <Link to={"/videoplayer/" + this.props.idDB + "." + this.state.videoID}>
                        <div style={{ position: "relative", left: "0", top: "0" }}>
                            <img src={this.state.videoThumbnail} alt="" style={{ width: "100%", position: "relative", top: "0", left: "0" }} />
                            <div style={{ height: "100%", width: "33%", top: "0", right: "0", backgroundColor: "#000000cc", position: "absolute" }}>
                                <p style={{ color: "white", fontSize: "20px", margin: "50% 0" }}>{this.props.quantity} <br />video</p>
                            </div>
                        </div>
                        <p style={{ color: "white", fontSize: "20px", width: "100%", height: "55px", textOverflow: "ellipsis", overflow: "hidden" }}>Playlist - {this.props.playlistTitle} - {this.state.videoTitle} </p>
                    </Link>
                </div>

            </div>
        );
    }
}

export default MyPlaylistTable;