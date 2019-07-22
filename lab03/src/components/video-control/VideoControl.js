import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class VideoControl extends Component {
    render() {
        return (
          <div>
            <div className='video-controls'>
              <button type='button' id='replay-button' className='btn success'>
                <FontAwesomeIcon icon="reply"/>
              </button>
              <button type="button" id='play-pause-button' className="btn success">
                <FontAwesomeIcon icon="play"/>
              </button>
              <button type='button' id='stop-button' className='btn success'>
                <FontAwesomeIcon icon="stop"/>
              </button>
              <button type='button' id='volume-inc-button' className='btn success'>
                <FontAwesomeIcon icon="plus"/> 
              </button>
              <button type='button' id='volume-dec-button' className='btn success'>
                <FontAwesomeIcon icon="minus"/> 
              </button>
              <button type='button' id='mute-button' className='btn success'>
                <FontAwesomeIcon icon="volume-up"/> 
              </button>
            </div>
          </div>
        )
    }
}

export default VideoControl
