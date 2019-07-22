import React, { Component } from 'react'
import axios from 'axios'
import { VideoView } from './video-view/VideoView'
import { VideoControl } from './video-control/VideoControl'
import { VideoList } from './video-list/VideoList'

export class Video extends Component {

    state = {
        videos: [
            {
              "title": "Sadhguru and Physics",
              "url": "https://www.youtube.com/watch?v=pAluQXDTM9g",
              "status": "added",
              "approved": 1,
              "likes": 22,
              "unlike": 4,
              "currentStatus": "playing",
              "exitplayprogress": 30
            },
            {
              "title": "Angular 6 Tutorial",
              "url": "https://www.youtube.com/watch?v=BoxuTR4ruUs",
              "status": "added",
              "approved": 0,
              "likes": 0,
              "unlike": 0,
              "currentStatus": "paused",
              "exitplayprogress": 0
            },
            {
              "title": "Nikon P900 83X Zoom",
              "url": "https://www.youtube.com/watch?v=m7kdx9b_Jvk",
              "status": "added",
              "approved": 1,
              "likes": 10,
              "unlike": 1,
              "currentStatus": "paused",
              "exitplayprogress": 80
            },
            {
              "title": "Understanding Javascript",
              "url": "https://www.youtube.com/watch?v=Bv_5Zv5c-Ts",
              "status": "edited",
              "approved": 0,
              "likes": 25,
              "unlike": 5,
              "currentStatus": "stopped",
              "exitplayprogress": 80
            }
          ]
    }

    componentDidMount() {
        axios.get('http://localhost:8080/youtube')
        .then(res => this.setState({
            videos : res.data
        }))
    }

    someMethod() {
        console.log('someMethod');
    }

    delVideo = (id) => {
        this.setState({
            videos: [...this.state.videos.filter(video => video.id !== id)]
        })
        axios.delete(`http://localhost:8080/youtube/${id}`)
    }

    approveVideo = (video) => {
        video.approved = true
        this.setState({
            videos: [...this.state.videos]
        })
        axios.put(`http://localhost:8080/youtube/${video.id}`, video)
    }

    render() {
        return (
            <div id = 'video-player'>
                <div class="video-player-main">
                    <div class = "video-player-left">
                        <div class="video-player-header">
                            <div class="header-name">Vedio Player</div>
                        </div>
                        <VideoView />
                    </div>
                        <VideoList videos={this.state.videos} delVideo={this.delVideo} approveVideo={this.approveVideo}/>
                    <div>
                        <VideoControl />
                    </div>
                </div>
            </div>
        )
    }
}

export default Video
