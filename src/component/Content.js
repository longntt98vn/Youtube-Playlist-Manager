import React, { Component } from 'react';
import PlaylistTable from './PlaylistTable';

class Content extends Component {
    render() {
        return (
            <div class="container-fluid" style={{width:"100%"}}>
        <div className="row">
        <PlaylistTable></PlaylistTable>
        <PlaylistTable></PlaylistTable>
        <PlaylistTable></PlaylistTable>
        <PlaylistTable></PlaylistTable>
        
        </div>
        </div>
        );
    }
}

export default Content;