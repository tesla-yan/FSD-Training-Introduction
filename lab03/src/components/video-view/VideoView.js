import React, { Component } from 'react'
export class VideoView extends Component {

    click = () => {
        this.props.parentMethod();
    }

    // componentDidMount(){
    //     this.listenPlay()
    // }

    listenPlay() {
        document.getElementById("mediaVideo").addEventListener('play', () => console.log('video play'),
        false)
    }
    render() {
        return (
            <div>
                <video id="mediaVideo" controls>
                    <source src='http://maoyan.meituan.net/movie/videos/ad429561494a4eb09de1c007f037c847.mp4' type='video/mp4'/>
                </video>
                <div className="progress">
                <div id = "progressBar" className="progress-bar bg-dark progress-bar-success progress-bar-striped active" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        );
    }
}

export default VideoView
