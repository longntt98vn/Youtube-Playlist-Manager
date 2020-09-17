import React, { useState, useEffect } from 'react';
import { db } from "../firebase/firebase"
import PlaylistItem from './MyPlaylistItem';
import VideoStream from './VideoStream';
import Comment from "./Comment"
const UID = localStorage.getItem("UID");
function VideoPlayer(props) {
    const [dataFromDB, setDataFromDB] = useState([]);
    const [nextVideo, setNextVideo] = useState("");
    const [videoID, setVideoID] = useState("");
    const [videoTitle, setVideoTitle] = useState("");
    const [playlistTitle, setPlaylistTitle] = useState("");
    const [commentDetail, setCommentDetail] = useState("");
    const [comment, setComment] = useState([])
    const [quantity, setQuantity] = useState("")


    useEffect(() => {
        db.ref(`playlist/public/${props.match.params.playlistID}`).on("value", data => {
            let accessModifier = "";
            if (data.val()) {
                accessModifier = "public";
            } else accessModifier = "private";
            const db1 = db.ref(`playlist/${accessModifier}/${props.match.params.playlistID}/playlistVideo`)
            db1.on("value", data => {
                let array = [];
                data.forEach(element => {
                    array.push({
                        videoID: element.key,
                        videoTitle: element.val().videoTitle,
                        videoThumbnail: element.val().videoThumbnail,
                    })
                })
                setDataFromDB([...array])
            })
            const db2 = db.ref(`playlist/${accessModifier}/${props.match.params.playlistID}/playlistVideo/${props.match.params.videoID}`)
            db2.on("value", data2 => {
                if (data2.val()) {
                    setVideoID(props.match.params.videoID);
                    setNextVideo(data2.val().nextVideo);
                    setVideoTitle(data2.val().videoTitle);

                }
            })

            const db3 = db.ref(`playlist/${accessModifier}/${props.match.params.playlistID}`);
            db3.on("value", data => { if (data.val()){
                setPlaylistTitle(data.val().playlistTitle);
                setQuantity(data.val().quantity)
            }  });

            db.ref(`playlist/${accessModifier}/${props.match.params.playlistID}/playlistComment`).on("value", data => {
                if (data.val()) {
                    let array = [];
                    data.forEach(element => {
                        db.ref(`users/${element.val().UID}`).on("value", data1 => {
                            if (data1.val()) {
                                array.push({
                                    username: data1.val().username,
                                    photoURL: data1.val().photoURL,
                                    commentDetail: element.val().commentDetail,
                                })
                                setComment([...array]);
                            }
                        })
                    })

                }

            })
        })

    }, [props.match.params.videoID, props.match.params.playlistID]);

    const getVideo = () => {
        if (dataFromDB) {
            return dataFromDB.map((value, key) => {
                return <PlaylistItem

                    key={key}
                    videoID={value.videoID}
                    videoThumbnail={value.videoThumbnail}
                    videoTitle={value.videoTitle}
                    playlistID={props.match.params.playlistID}
                    videoID2={(videoID, videoTitle) => getVideoID(videoID, videoTitle)}
                />
            })
        }
    }

    const getComment = () => {
        if (comment) {
            return comment.map((value, key) => {
                return <Comment
                    key={key}
                    username={value.username}
                    photoURL={value.photoURL}
                    commentDetail={value.commentDetail}
                />
            })
        }
    }

    const getVideoID = (videoID, videoTitle) => {
        setVideoID(videoID);
        setVideoTitle(videoTitle);
    }

    const func = (params) => {
        setVideoID(params)
    }

    const isChange = (event) => {
        setCommentDetail(event.target.value);
    }

    const pushComment = () => {
        console.log(123)
        if (UID) {
            if (commentDetail) {
                db.ref(`playlist/public/${props.match.params.playlistID}`).once("value", data => {
                    console.log("abc");
                    let accessModifier = "";
                    if (data.val()) {
                        accessModifier = "public";
                    } else accessModifier = "private";
                    db.ref(`playlist/${accessModifier}/${props.match.params.playlistID}/playlistComment`).push({
                        UID: UID,
                        commentDetail: commentDetail,
                    })
                })
            } else alert("Vui lòng nhập nội dung bình luận")

        } else alert("Vui lòng đăng nhập để bình luận")
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-8">
                    <VideoStream videoID={props.match.params.videoID} nextVideo={nextVideo} func={(params) => func(params)} playlistID={props.match.params.playlistID} ></VideoStream>
                    <p className="videoplayer-video-title">{videoTitle}</p>
                    <hr style={{ backgroundColor: "white" }} />
                    <h2>Bình luận:</h2>
                    <div style={{ flexWrap: "wrap", display: "flex", height: "45px" }}>
                        <input type="text" onChange={(event) => isChange(event)} className="form-control col" placeholder="Bình luận công khai ...." aria-describedby="helpId" style={{ height: "auto", fontSize: "20px" }} />
                        <button onClick={() => pushComment()} className="col-2" className="btn btn-info">Bình luận:</button>
                    </div>
                    <hr style={{ backgroundColor: "white" }} />
                    {getComment()}
                </div>
                <div className="col-4">
                    <ul className="list-group" style={{ height: "430px", overflowY: "auto", overflowX: "hidden" }}>
                        <p className="videoplayer-video-title text-center">{playlistTitle}<br />{quantity} video</p>
                        {getVideo()}
                    </ul>
                </div>
            </div>

        </div>
    );
}

export default VideoPlayer;