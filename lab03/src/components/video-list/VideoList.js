import React, { Component } from "react";
import PropTypes from "prop-types";

export class VideoList extends Component {

  
  render() {
    return (
      <div id='video-player-list'>
        <div className="video-player-list-header">
          <div className="play-list-name">Play List</div>
        </div>
        <ul className="list-group list-group-flush">
          {this.props.videos.map(video => (
            <li className="list-group-item">{video.title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

VideoList.propTypes = {
  videos: PropTypes.array.isRequired
};

export default VideoList;
