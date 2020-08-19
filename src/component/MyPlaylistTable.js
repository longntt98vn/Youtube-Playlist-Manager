import React, { Component } from 'react';
import MyPlaylistItem from './MyPlaylistItem';

class MyPlaylistTable extends Component {
    render() {
        return (
            <div className="col-4"  >
                <div className="row">
                    <div className="col-9">
                        <header>Playlist Name: .....</header>
                <p>Quantity: 1/n </p>
                    </div>
                    <div className="col-3">
                        <div className="btn-group">
                            <a class="btn btn-warning" href="/" role="">Edit</a>
                            <a class="btn btn-danger" href="/" role="">Del</a>
                        </div>
                    </div>
                </div>
                
                <ul className="list-group" style={{ height: "430px", overflowY: "auto", overflowX:"hidden" }}>
                    <MyPlaylistItem></MyPlaylistItem>
                    <MyPlaylistItem></MyPlaylistItem>
                    <MyPlaylistItem></MyPlaylistItem>
                    <MyPlaylistItem></MyPlaylistItem>
                    <MyPlaylistItem></MyPlaylistItem>
                    <MyPlaylistItem></MyPlaylistItem>
                    <MyPlaylistItem></MyPlaylistItem>
                    <MyPlaylistItem></MyPlaylistItem>
                </ul>




                <div>Đây là footer</div><br />
            </div>
        );
    }
}

export default MyPlaylistTable;