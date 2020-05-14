import React from 'react';
import Video from '../components/Video';
class VideoPage extends React.Component {
render(){
    const type = this.props.match.parms.type;
    const videos = this.props.datavideo.filter(video=> video.type.indexOf(type) !== -1)
    return (
        <Video datavideo={videos} />
    );
}

}
export default VideoPage;