import React, { useEffect, useState } from 'react';
import MyPlaylistTable from './MyPlaylistTable';
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import { db } from "../firebase/firebase"

const UID = localStorage.getItem("UID");


function MyPlaylist(props) {
    const [playlistTitle, setPlaylistTitle] = useState("");
    const [playlistDes, setPlaylistDes] = useState("");
    const [playlistAM, setPlaylistAM] = useState("");
    const [videoID, setVideoID] = useState("");
    const [thumbnailVideo, setThumbnailVideo] = useState("");
    const [titleVideo, setTitleVideo] = useState("");
    const [dataFromDB, setDataFromDB] = useState([]);

    useEffect(() => {
        console.log(12);
        const db1 = db.ref(`users/${UID}/playlistList`)
        db1.on("value", data1 => {
            if (data1.val()) {
                let array = [];
                data1.forEach(element => {
                    const accessModifier = (element.val().playlistAM == 0) ? "private" : "public";
                    const db2 = db.ref(`playlist/${accessModifier}/${element.val().playlistID}`);
                    db2.once("value", data2 => {
                        if (data2.val()) {
                            array.push({
                                playlistIDofUser: element.key,
                                key: data2.key,
                                playlistTitle: data2.val().playlistTitle,
                                accessModifier: accessModifier,
                                quantity: data2.val().quantity,
                            })

                        } setDataFromDB([...array]);
                    })
                });
            }
        })
    }, [])

    const isChange = (event) => {
        if (event.target.name == "playlistTitle") { setPlaylistTitle(event.target.value); }
        else if (event.target.name == "playlistAM") { setPlaylistAM(event.target.value); }
        else if (event.target.name == "playlistDes") { setPlaylistDes(event.target.value); }
    }

    const getThumbnail = (id) => {
        let a = "https://i.ytimg.com/vi/";
        let b = "/hqdefault.jpg";
        setThumbnailVideo(a + id + b)
    }

    const getTitle = (id) => {
        let a = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyCAaefSzfa_SLpbO1Mt7hl8faCwfwBgk_E&fields=items(snippet(title))&part=snippet,statistics&id=' + id;
        getJSON(a, (err, data) => {
            if (err === null && data !== null) setTitleVideo(data.items[0].snippet.title);
            else return err;
        })
    }

    const getJSON = function (url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            var status = xhr.status;
            if (status === 200) callback(null, xhr.response);
            else callback(status, xhr.response);
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

    const createPlaylist = () => {
        if (UID) {
            let accessModifier = (playlistAM == 0) ? "private" : "public";
            if (playlistAM && playlistDes && playlistTitle && videoID) {
                let str1 = db.ref(`playlist/${accessModifier}`).push({
                    playlistDes: playlistDes,
                    playlistTitle: playlistTitle,
                    firstVideo: videoID,
                    lastVideo: videoID,
                    quantity: 1,
                    UID: UID,
                }).getKey();
                db.ref(`playlist/${accessModifier}/${str1}/playlistVideo/${videoID}`).set({
                    videoThumbnail: thumbnailVideo,
                    videoTitle: titleVideo,
                    nextVideo: videoID,
                    previousVideo: videoID,
                })
                db.ref(`users/${UID}/playlistList`).push({
                    playlistID: str1,
                    playlistAM: playlistAM,
                })
                // alert("Thêm mới thành công")
            } else alert("Vui lòng điền toàn bộ thông tin");
        }else alert("Vui lòng đăng nhập để tạo playlist mới")

    }

    const deletePlaylist = (playlistIDofUser, accessModifier, idDB) => {
        if (dataFromDB.length == 1) setDataFromDB([])
        db.ref(`users/${UID}/playlistList/`).child(playlistIDofUser).remove();
        db.ref(`playlist/${accessModifier}/`).child(idDB).remove();
    }

    const getData = () => {
        if (dataFromDB) {
            return dataFromDB.map((value, key) => {
                return (
                    <MyPlaylistTable
                        playlistIDofUser={value.playlistIDofUser}
                        accessModifier={value.accessModifier}
                        key={key}
                        idDB={value.key}
                        playlistTitle={value.playlistTitle}
                        deletePlaylist={(playlistIDofUser, accessModifier, idDB) => deletePlaylist(playlistIDofUser, accessModifier, idDB)}
                        quantity={value.quantity}
                    ></MyPlaylistTable>
                )
            })
        }
    }
    return (
        console.log(12),
        <div className="container">
            <div className="row">
                {getData()}
            </div>
            <div className="dropdown button-add-playlist dropup">
                <button className="dropup-toggle fa fa-plus" type="button" id="dropdownMenuButton" style={{ color: "#007bff", backgroundColor: "transparent", border: "none" }} data-toggle="dropdown" ></button>
                <div className="dropdown-menu" style={{ width: "350px", left: "-295px" }}>
                    <form className="text-center create-playlist-table">
                        <h3>Tạo Playlist</h3>
                        <div className="form-group ">
                            <label>Tên Playlist</label>
                            <input type="text" name="playlistTitle" onChange={(event) => isChange(event)} className="form-control mb-2" placeholder="Tên Playlist ... " required />
                            <label>Mô tả Playlist</label>
                            <input type="text" name="playlistDes" onChange={(event) => isChange(event)} className="form-control mb-2" placeholder="Mô tả Playlist ... " required />
                            <div className="form-group">
                                <label>Phân quyền</label>
                                <select name="playlistAM" className="form-control mb-2" onChange={(event) => isChange(event)} defaultValue="Lựa chọn phân quyền">
                                    <option>Lựa chọn phân quyền</option>
                                    <option value={1}>Công khai</option>
                                    <option value={0}>Bí mật</option>
                                </select>
                            </div>
                            <label>Link video </label>
                            <SearchBar getItem={(item) => { getItem(item) }} />
                            <SearchResult thumbnailVideo={thumbnailVideo} titleVideo={titleVideo} />
                            <div className="dropdown-divider"></div>
                            <input type="button" onClick={() => createPlaylist()} className="btn btn-primary btn-lg btn-block " value="Thêm Playlist" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MyPlaylist;