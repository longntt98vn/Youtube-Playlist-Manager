import React, { Component } from 'react';
import EditMyPlaylistItem from './EditMyPlaylistItem';

class EditMyPlaylist extends Component {
    render() {
        return (
            <div className="container-fluid row">
                <div className="col-5">Info PlaylistInfo PlaylistInfo PlaylistInfo PlaylistInfo PlaylistInfo PlaylistInfo PlaylistInfo PlaylistInfo PlaylistInfo PlaylistInfo PlaylistInfo PlaylistInfo PlaylistInfo PlaylistInfo PlaylistInfo Playlist</div>
                <div className="col-7">
                <div className="header_input mt-2 mb-3" >
                    <input  ></input>
                    <div className="fa fa-search"   ></div>
                    
                </div>
                    <EditMyPlaylistItem></EditMyPlaylistItem>
                    <EditMyPlaylistItem></EditMyPlaylistItem>
                    <EditMyPlaylistItem></EditMyPlaylistItem>
                    <EditMyPlaylistItem></EditMyPlaylistItem>
                    <EditMyPlaylistItem></EditMyPlaylistItem>
                    <EditMyPlaylistItem></EditMyPlaylistItem>
                    <EditMyPlaylistItem></EditMyPlaylistItem>
                    <EditMyPlaylistItem></EditMyPlaylistItem>
                    <EditMyPlaylistItem></EditMyPlaylistItem>
                </div>
            </div>
        );
    }
}

export default EditMyPlaylist;