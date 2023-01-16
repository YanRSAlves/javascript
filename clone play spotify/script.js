const songName = document.getElementById('song-name');
const song = document.getElementById('audio');
const play = document.getElementById('play');

songName.innerText = 'Eu me rendo'

function playsong(){
    song.play();
}

play.addEventListener('click', playsong);