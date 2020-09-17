import React, { Component } from 'react';

class SearchResult extends Component {
    render() {
        return (
        <div>
            <h4>Ten Video: {this.props.titleVideo}</h4>
            <img src={this.props.thumbnailVideo} style={{height:"200px"}} alt=""></img>
        </div>
        );
    }
}

export default SearchResult;