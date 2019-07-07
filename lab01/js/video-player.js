//init
document.addEventListener("DOMContentLoaded", function() { init(); }, false);

//videoPlayer
var videoPlayer;
//playPauseBtn
var playPauseBtn;
//playPauseIcon
var playPauseIcon;
//muteBtn
var muteBtn;
//muteIcon
var muteIcon;
//progressBar
var progressBar;
//videoLike
var videoLike;
//videoUnlike
var videoUnlike;
//videoVolume
var videoVolume;

//init
function init() {
	videoPlayer = document.getElementById('video');
    playPauseBtn = document.getElementById('play-pause-button');
    playPauseIcon = document.getElementById('play-pause-icon');
    muteBtn = document.getElementById('mute-button');
    muteIcon = document.getElementById('mute-icon');
	progressBar = document.getElementById('progress-bar');
	videoLike = document.getElementById('video-like');
	videoUnlike = document.getElementById('video-unlike');
	videoVolume = document.getElementById('video-volume');

    //init no default controls
	videoPlayer.controls = false;

    //add timeupdate event listener
	videoPlayer.addEventListener('timeupdate', updateProgressBar, false);

    //add play event listener
	videoPlayer.addEventListener('play', function() {
		changeButtonIcon(playPauseIcon, 'fa-play-circle', 'fa-pause-circle');
	}, false);

    //add pause event listener
	videoPlayer.addEventListener('pause', function() {
		changeButtonIcon(playPauseIcon, 'fa-pause-circle', 'fa-play-circle');
	}, false);

    //add volumechange event listener
	videoPlayer.addEventListener('volumechange', function(e) {
		if (videoPlayer.muted){
		    changeButtonIcon(muteIcon, 'fa-volume-up', 'fa-volume-mute');
		}else {
		    changeButtonIcon(muteIcon, 'fa-volume-mute', 'fa-volume-up');
		}
	}, false);

    //init volume inner text
	videoVolume.innerText = videoPlayer.volume * 100;

	//add ended event listener
	videoPlayer.addEventListener('ended', function() { this.pause(); }, false);

	if ((localStorage.getItem('like') == undefined) && localStorage.getItem('unlike') == undefined){
		localStorage.setItem('like', 0);
		localStorage.setItem('unlike', 0)
		videoLike.innerText = localStorage.getItem('like');
		videoUnlike.innerText = localStorage.getItem('unlike');
	}else{
		videoLike.innerText = localStorage.getItem('like');
		videoUnlike.innerText = localStorage.getItem('unlike');
	}
}

//toggle play/pause
function togglePlayPause() {
	if (videoPlayer.paused || videoPlayer.ended) {
		changeButtonIcon(playPauseIcon, 'fa-play-circle', 'fa-pause-circle');
		videoPlayer.play();
	}
	else {
		changeButtonIcon(playPauseIcon, 'fa-pause-circle', 'fa-play-circle');
		videoPlayer.pause();
	}
}

//stop player
function stopPlayer() {
	videoPlayer.pause();
	videoPlayer.currentTime = 0;
}

//change volume
function changeVolume(direction) {
	if (direction == '+') {
	    videoPlayer.volume += videoPlayer.volume == 1 ? 0 : 0.1;
	}else {
	    videoPlayer.volume -= (videoPlayer.volume == 0 ? 0 : 0.1);
	}
	videoPlayer.volume = parseFloat(videoPlayer.volume).toFixed(1);
	videoVolume.innerText = videoPlayer.volume * 100;
}

//toggle mute/unmute
function toggleMute() {
	if (videoPlayer.muted) {
		changeButtonIcon(muteIcon, 'fa-volume-up', 'fa-volume-mute');
		videoPlayer.muted = false;
	}
	else {
		changeButtonIcon(muteIcon, 'fa-volume-mute', 'fa-volume-up');
		videoPlayer.muted = true;
	}
}

//replay video
function replayVideo() {
	resetPlayer();
	videoPlayer.play();
}

// update progress bar
function updateProgressBar() {
    var percentage = 0;
    progressBar.setAttribute("style", "width: " + percentage + "%");
    progressBar.setAttribute("aria-valuenow", percentage);
    progressBar.innerHTML = percentage + '%';
	percentage = Math.floor((100 / videoPlayer.duration) * videoPlayer.currentTime);
	if(!isNaN(percentage)){
	    progressBar.setAttribute("style", "width: " + percentage + "%");
        progressBar.setAttribute("aria-valuenow", percentage);
        progressBar.innerHTML = percentage + '%';
	}
}

//change button icon
function changeButtonIcon(btnIcon, oldIcon, newIcon) {
    btnIcon.classList.remove(oldIcon);
    btnIcon.classList.add(newIcon);
}

//load video
function loadVideo() {
	for (var i = 0; i < arguments.length; i++) {
		var file = arguments[i].split('.');
        var type = file[file.length - 1];
		if (canPlayVideo(type)) {
			resetPlayer();
			videoPlayer.src = arguments[i];
            videoPlayer.load();
            changeButtonIcon(playPauseIcon, 'fa-pause-circle', 'fa-play-circle');
			break;
		}
	}
}

//can play video
function canPlayVideo(type) {
	var type = videoPlayer.canPlayType('video/' + type);
	return (type == '') ? false : true;
}

//reset player
function resetPlayer() {
	progressBar.value = 0;
	videoPlayer.currentTime = 0;
    changeButtonIcon(playPauseIcon, 'fa-play-circle', 'fa-pause-circle');
}

//like video
function likeVideo() {
	var likeCount = localStorage.getItem('like');
	localStorage.setItem('like', parseInt(likeCount) + 1);
	videoLike.innerText = localStorage.getItem('like');
}

//un like video
function unlikeVideo() {
	var unlikeCount = localStorage.getItem('unlike');
	localStorage.setItem('unlike', parseInt(unlikeCount) + 1)
	videoUnlike.innerText = localStorage.getItem('unlike');
}