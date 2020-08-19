import React, { Component } from 'react';
import MyPlaylistTable from './MyPlaylistTable';

class MyPlaylist extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <MyPlaylistTable></MyPlaylistTable>
                    <MyPlaylistTable></MyPlaylistTable>
                    <MyPlaylistTable></MyPlaylistTable>
                    <MyPlaylistTable></MyPlaylistTable>
                </div>
            </div>
        );
    }
}

export default MyPlaylist;