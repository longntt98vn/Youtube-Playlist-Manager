import React from 'react';
import YouTube from 'react-youtube';
import { useHistory } from 'react-router-dom';

function VideoStream(props) {
    const history = useHistory();

    const opts = {
        height: '500px',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };
    const videoOnReady = (event) => {
        event.target.playVideo();
    }
    const videoStateChange = (event) => {
        if (event.data == 0) {
            history.push("/videoplayer/" + props.playlistID + "." + props.nextVideo);
        }
    }
    return (<div>
            <YouTube
                videoId={props.videoID}
                opts={opts}
                onReady={videoOnReady}
                onStateChange={videoStateChange}
            />

        </div>)


}

export default VideoStream;