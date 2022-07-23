import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeRef = document.querySelector('iframe');
const player = new Player(iframeRef);
const VIDEOPLAYER_CURRENT_TIME_KEY = "videoplayer-current-time"
const savedTime = localStorage.getItem("videoplayer-current-time")


player.on('play', function() {
    console.log('played the video!');
});

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});

player.on('timeupdate', throttle(saveCurrentTime, 1000))

player.setCurrentTime(savedTime).then(function () {
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            console.log("the time was less than 0 or greater than the video’s duration")
            break;
        default:
            console.log("some other error occurred")
            break;
            }
        });
        
function saveCurrentTime(data) {
    localStorage.setItem(VIDEOPLAYER_CURRENT_TIME_KEY, data.seconds)
}