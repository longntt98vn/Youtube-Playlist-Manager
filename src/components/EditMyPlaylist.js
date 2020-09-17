import React, { useState, useEffect } from 'react';
import EditMyPlaylistItem from './EditMyPlaylistItem';
import { db } from "../firebase/firebase"
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import { Link } from "react-router-dom";


const UID = localStorage.getItem("UID")
function EditMyPlaylist(props) {
    const [dataFromDB, setDataFromDB] = useState([]);
    const [videoID, setVideoID] = useState("");
    const [thumbnailVideo, setThumbnailVideo] = useState("");
    const [item, setItem] = useState({});
    const [firstVideo, setFirstVideo] = useState("");
    const [lastVideo, setLastVideo] = useState("");
    const [playlistDes, setPlaylistDes] = useState("");
    const [playlistTitle, setPlaylistTitle] = useState("");
    const [playlistID, setPlaylistID] = useState("");
    const [quantity, setQuantity] = useState("");
    const [videoTitle, setVideoTitle] = useState("");
    const [titleVideo, setTitleVideo] = useState("");
    const [firstVideoThumbnail, setFirstVideoThumbnail] = useState("");

    useEffect(() => {
        const db2 = db.ref(`users/${UID}/playlistList/${props.match.params.id}`);
        db2.on("value", data => {
            if (data.val()) {
                const accessModifier = (data.val().playlistAM == 0) ? "private" : "public";
                const db1 = db.ref(`playlist/${accessModifier}/${data.val().playlistID}`);
                db1.on("value", data1 => {
                    if (data1.val()) {
                        setFirstVideo(data1.val().firstVideo);
                        setLastVideo(data1.val().lastVideo);
                        setPlaylistID(data.val().playlistID);
                        setQuantity(data1.val().quantity);
                        setPlaylistDes(data1.val().playlistDes);
                        setPlaylistTitle(data1.val().playlistTitle);

                        db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo/${data1.val().firstVideo}/videoThumbnail`).on("value", data2 => {
                            if (data2.val()) { setFirstVideoThumbnail(data2.val()); console.log(data2.val()); }
                        })
                    }
                })
                const db3 = db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo`);
                db3.on("value", data1 => {
                    let array = [];
                    data1.forEach(element => {
                        array.push({
                            key: element.key,
                            videoID: element.val().videoID,
                            videoTitle: element.val().videoTitle,
                            videoThumbnail: element.val().videoThumbnail,

                        })
                    })
                    setDataFromDB([...array])
                })
            }
        })
    }, [])

    const getVideoID = (videoID, videoTitle) => {
        setVideoID(videoID);
        setVideoTitle(videoTitle);
    }

    const deleteVideo = (videoID) => {
        db.ref(`users/${UID}/playlistList/${props.match.params.id}`).on("value", data => {
            if (data.val()) {
                let accessModifier = (data.val().playlistAM == 0) ? "private" : "public";
                if (quantity == 1) alert("Vui lòng xóa playlist")
                else {
                    if (videoID == firstVideo) {
                        console.log("first video");
                        db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo/${videoID}`).on("value", data2 => {
                            if (data2.val()) {
                                db.ref(`playlist/${accessModifier}/${data.val().playlistID}/firstVideo`).set(data2.val().nextVideo);
                                db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo/${data2.val().nextVideo}/previousVideo`).set(data2.val().previousVideo);
                                db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo/${data2.val().previousVideo}/nextVideo`).set(data2.val().nextVideo);
                                setFirstVideo(...data2.val().nextVideo);
                            }
                        })

                    }
                    else if (videoID == lastVideo) {
                        console.log("last video");
                        db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo/${videoID}`).on("value", data2 => {
                            if (data2.val()) {
                                db.ref(`playlist/${accessModifier}/${data.val().playlistID}/lastVideo`).set(data2.val().previousVideo);
                                db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo/${data2.val().nextVideo}/previousVideo`).set(data2.val().previousVideo);
                                db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo/${data2.val().previousVideo}/nextVideo`).set(data2.val().nextVideo);
                                setLastVideo(...data2.val().previousVideo)
                            }
                        })
                    }
                    if (videoID != firstVideo && videoID != lastVideo) {
                        console.log("normal video");
                        db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo/${videoID}`).on("value", data2 => {
                            if (data2.val()) {
                                db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo/${data2.val().nextVideo}/previousVideo`).set(data2.val().previousVideo);
                                db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo/${data2.val().previousVideo}/nextVideo`).set(data2.val().nextVideo);
                            }
                        })
                    }
                    db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo`).child(videoID).remove();
                    let quantity1 = quantity;
                    db.ref(`playlist/${accessModifier}/${data.val().playlistID}/quantity`).set(quantity1 -= 1)

                }
            }
        });
    }

    const getVideo = () => {
        if (dataFromDB) {
            return dataFromDB.map((value, key) => {
                return (<EditMyPlaylistItem
                    deleteVideo={(videoID) => deleteVideo(videoID)}
                    key={key}
                    playlistID={playlistID}
                    videoID={value.key}
                    videoTitle={value.videoTitle}
                    videoThumbnail={value.videoThumbnail}
                    videoID2={(videoID, videoTitle) => getVideoID(videoID, videoTitle)}
                />)
            })
        }

    }

    const getThumbnail = (id) => {
        let a = "https://i.ytimg.com/vi/";
        let b = "/hqdefault.jpg";
        setThumbnailVideo(a + id + b);
    }

    const getTitle = (id) => {
        let a = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCAaefSzfa_SLpbO1Mt7hl8faCwfwBgk_E&fields=items(snippet(title))&part=snippet,statistics&id=' + id;
        getJSON(a, (err, data) => {
            if (err === null && data !== null) setTitleVideo(data.items[0].snippet.title)
            else return err;
        })
    }

    const getJSON = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) {
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
    };

    const getItem = (idVideo) => {
        setTitleVideo("");
        setThumbnailVideo("");
        getThumbnail(idVideo);
        getTitle(idVideo);
        setVideoID(idVideo);
    }

    const addVideo = (item) => {
        const db1 = db.ref(`users/${UID}/playlistList/${props.match.params.id}`);
        db1.on("value", data => {
            if (data.val()) {
                const accessModifier = (data.val().playlistAM == 0) ? "private" : "public";
                const db2 = db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo/${videoID}`);
                db2.once("value", data1 => {
                    if (!data1.val()) {
                        db2.set({
                            videoThumbnail: thumbnailVideo,
                            videoTitle: titleVideo,
                            nextVideo: firstVideo,
                            previousVideo: lastVideo,
                        })
                        let quantity1 = quantity
                        db.ref(`playlist/${accessModifier}/${data.val().playlistID}/quantity`).set(quantity1 += 1);
                        setLastVideo(videoID);
                    } else alert("Video đã có trong playlist")
                })
                db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo/${firstVideo}/previousVideo`).set(videoID);
                db.ref(`playlist/${accessModifier}/${data.val().playlistID}/playlistVideo/${lastVideo}/nextVideo`).set(videoID);
                db.ref(`playlist/${accessModifier}/${data.val().playlistID}/lastVideo`).set(videoID);
            }
        })
        setThumbnailVideo("");
        setTitleVideo("");
    }

    return (
        <div className="container-fluid row edit-my-playlist">
            <div className="col-5">
                <Link to={"/videoplayer/" + playlistID + "." + firstVideo}>
                    <div style={{ position: "relative", left: "0", top: "0" }}>
                        <img src={firstVideoThumbnail} alt="" style={{ width: "100%", position: "relative", top: "0", left: "0" }} />
                        <div style={{ height: "20%", width: "100%", bottom: "0", backgroundColor: "#000000cc", position: "absolute" }}>
                            <h1 className="fa fa-play" style={{ color: "white", fontSize: "30px", padding:"3% 28% 3% 35%" }}>  Phát tất cả</h1>
                        </div>
                    </div>
                </Link>

                <h1 className="playlist-info" style={{ color: "white" }}> {playlistTitle}</h1>
                <h1 className="playlist-info" style={{ color: "white" }}>{playlistDes}</h1>
                <h1 className="playlist-info" style={{ color: "white" }}>{quantity} video</h1>
            </div>
            <div className="col-7">
                {getVideo()}
            </div>

            <div className="dropdown button-add-playlist dropup">
                <button className="dropup-toggle fa fa-plus" type="button" id="dropdownMenuButton" style={{ color: "#ffc107", backgroundColor: "transparent", border: "none" }} data-toggle="dropdown" ></button>
                <div className="dropdown-menu" style={{ width: "350px", left: "-295px" }}>
                    <form className="text-center create-playlist-table">
                        <h3>Thêm mới Video</h3>
                        <div className="form-group ">
                            <label>Link video </label>
                            <SearchBar getItem={(item) => { getItem(item) }} />
                            <SearchResult thumbnailVideo={thumbnailVideo} titleVideo={titleVideo} />
                            <div className="dropdown-divider"></div>
                            <input type="reset" onClick={() => addVideo()} className="btn btn-primary btn-lg btn-block " value="Thêm Video" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditMyPlaylist;