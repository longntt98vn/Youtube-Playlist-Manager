import React, { Component } from 'react';
import PlaylistItem from './PlaylistItem';

class PlaylistTable extends Component {
    render() {
        return (
            <div className="col-4"  >
                <header>Playlist Name: .....</header>
                <p>Quantity: 1/n </p>
                <ul className="list-group" style={{ height: "430px", overflowY: "auto", overflowX:"hidden" }}>
                    <PlaylistItem></PlaylistItem>
                    <PlaylistItem></PlaylistItem>
                    <PlaylistItem></PlaylistItem>
                    <PlaylistItem></PlaylistItem>
                    <PlaylistItem></PlaylistItem>
                    <PlaylistItem></PlaylistItem>
                    <PlaylistItem></PlaylistItem>
                    <PlaylistItem></PlaylistItem>
                </ul>




                <div>Đây là footer</div><br />
            </div>
        );
    }
}

export default PlaylistTable;