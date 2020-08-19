import React, { Component } from 'react';

class PlaylistItem extends Component {
    render() {
        return (
            <div>
                <li className="list-group-item">
                <div className="row">
                    <div className="col-4">
                        <img src="https://kenh14cdn.com/thumb_w/640/2020/8/19/teaser-3-159780809591776695725-crop-159780864873013651439.png" alt="" style={{height:"56px"}}/>
                    </div>
                    <div className="col">
                        <p style={{width: "200px", height:"30px",textOverflow: "ellipsis",overflow:"hidden"}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?</p>
                    </div>
                </div>
                </li>
                
            </div>
        );
    }
}

export default PlaylistItem;