// Referências do html
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById('like');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

//Variáveis 
const euMeRendo = {
    songName : 'Eu me Rendo',
    artist : 'Iguinho e Lulinha',
    file: '0' ,
    liked: false,                                  //Direcionamento Musica 1
}
const Karolina = {
    songName : 'Karolina',
    artist : 'Wesley Safadão',
    file: '1' ,
    liked: false,                                  //Direcionamento Musica 2
}
const UmPedido = {
    songName : 'Um Pedido',
    artist : 'Hungria',
    file: '2' ,
    liked: false,                                   //Direcionamento Musica 3
}

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalplaylist = JSON.parse(localStorage.getItem('playlist')) ?? [euMeRendo,Karolina,UmPedido];    //Direcionamento Musicas
let sortedPlaylist = [...originalplaylist];
let index = 0;

//Funcões
function playSong(){                                
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){                                
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if (isPlaying === true){
        pauseSong();
    }else {
        playSong();
    }

}

function likeButtonRender(){
    if(sortedPlaylist[index].liked === true) {
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    }else {
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }

}

function InitializeSong(){
    cover.src = `imagens/${originalplaylist[index].file}.webp`;
    song.src = `songs/${originalplaylist[index].file}.mp3`;
    songName.innerText = originalplaylist[index].songName;
    bandName.innerText = originalplaylist[index].artist;
    likeButtonRender();
}
function previousSong(){
    if (index === 0){
        index = originalplaylist.length - 1;
    }else {
    index -= 1;
    //index = index - 1;
    } 
    InitializeSong();
    playSong();
    
}
function nextSong(){
    if (index === originalplaylist.length - 1){
        index = 0;
    }else {
    index += 1;
    //index = index + 1; 
    } 
    InitializeSong();
    playSong();
    
}
function updateprogress(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}% `);
    songTime.innerText = toHHMMSS(song.currentTime); //updateCurrentTime
}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}
function shuffleArray(preShuffleArray){
    const size = sortedPlaylist.length;                                    
    let currentIndex = size - 1;
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random()* size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}
function shuffleButtonClicked(){
     if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
     }
     else {
        isShuffled = false;
        sortedPlaylist = [...originalplaylist];
        shuffleButton.classList.remove('button-active');

     }
}

function repeatButtonClicked(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
     }
     else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');

       
     }


}
function nextOrRepeat(){
    if (repeatOn === false){
        nextSong();
    }
    else {
        playSong();
    }
}
function toHHMMSS(originalNumber){
    let hours = Math.floor(originalNumber / 3600); 
    let min = Math.floor((originalNumber - hours * 3600) / 60); 
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
}

function updateTotalTime(){
    totalTime.innerText = toHHMMSS(song.duration); 
}

function likeButtonCliked(){
    if(sortedPlaylist[index].liked === false){
        sortedPlaylist[index].liked = true;
    }
    else {
        sortedPlaylist[index].liked = false
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(sortedPlaylist));
}


// Execução de Função
InitializeSong();

//addEventListeners
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateprogress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonCliked);
