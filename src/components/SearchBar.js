import React, { Component } from 'react';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idVideo: '',
        }
    }

    youtube_parser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    pushItem = (idVideo) => {
        if (idVideo) this.props.getItem(idVideo);
        
    }

    isChange = (event) => {
        this.setState({
            idVideo: this.youtube_parser(event.target.value)
        });
    }

    render() {
        return (
            <div >
                <form className="button-group search-bar">
                    <input onChange={(event) => { this.isChange(event) }} type="text" className="form-control col" aria-describedby="helpId" placeholder="" required/>
                    <button type="reset" onClick={(idVideo) => this.pushItem(this.state.idVideo)} className="btn btn-primary col-3">Tìm kiếm</button>
                </form>
            </div>
        );
    }
}

export default SearchBar;