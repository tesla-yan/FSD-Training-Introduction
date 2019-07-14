import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { VideoViewComponent } from '../video-view/video-view.component';
@Component({
  selector: 'app-video-control',
  templateUrl: './video-control.component.html',
  styleUrls: ['./video-control.component.css']
})
export class VideoControlComponent implements OnInit {
  @Input() videoView: VideoViewComponent;

  play: boolean;
  mute: boolean;
  constructor() { }

  ngOnInit() {
    this.play = false;
    this.mute = false;
  }

  // toggle play/pause
  togglePlayPause() {
    if (this.videoView.videoPlayer.nativeElement.paused || this.videoView.videoPlayer.nativeElement.ended) {
      this.videoView.videoPlayer.nativeElement.play();
      this.play = true;
    } else {
      this.videoView.videoPlayer.nativeElement.pause();
      this.play = false;
    }
  }
  // stop player
  stopPlayer() {
    this.videoView.videoPlayer.nativeElement.pause();
    this.videoView.videoPlayer.nativeElement.currentTime = 0;
    this.play = false;
  }

  // toggle mute/unmute
  toggleMute() {
    if (this.videoView.videoPlayer.nativeElement.muted) {
      this.videoView.videoPlayer.nativeElement.muted = false;
      this.mute = false;
    } else {
      this.videoView.videoPlayer.nativeElement.muted = true;
      this.mute = true;
    }
  }

  // change volume
  changeVolume(direction) {
    if (direction == '+') {
      this.videoView.videoPlayer.nativeElement.volume += this.videoView.videoPlayer.nativeElement.volume == 1 ? 0 : 0.1;
    }else {
    	this.videoView.videoPlayer.nativeElement.volume -= (this.videoView.videoPlayer.nativeElement.volume == 0 ? 0 : 0.1);
    }
    this.videoView.videoPlayer.nativeElement.volume = parseFloat(this.videoView.videoPlayer.nativeElement.volume).toFixed(1);
    this.videoView.videoPlayer.nativeElement.innerText = this.videoView.videoPlayer.nativeElement.volume * 100;
  }

  // update progress bar
  updateProgressBar() {
    var percentage = 0;
    percentage = Math.floor((100 / this.videoView.videoPlayer.nativeElement.duration) * this.videoView.videoPlayer.nativeElement.currentTime);
    if(!isNaN(percentage)){
      this.videoView.progressBar.nativeElement.style.width = percentage + '%';
      this.videoView.progressBar.nativeElement.innerHTML = percentage + '%';
    }
  }

  // reset player
  resetPlayer() {
    this.videoView.progressBar.nativeElement.value = 0;
    this.videoView.videoPlayer.nativeElement.currentTime = 0;
  }

  // reset player
  replayMedia() {
    this.resetPlayer();
    this.videoView.videoPlayer.nativeElement.play();
    this.play = true;
  }
}
