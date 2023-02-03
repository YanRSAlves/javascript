// Referências do html
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');

//Variáveis 
const euMeRendo = {
    songName : 'Eu me Rendo',
    artist : 'Iguinho e Lulinha',
    file: '0'                                   //Direcionamento Musica 1
}
const Karolina = {
    songName : 'Karolina',
    artist : 'Wesley Safadão',
    file: '1'                                   //Direcionamento Musica 2
}
const UmPedido = {
    songName : 'Um Pedido',
    artist : 'Hungria',
    file: '2'                                   //Direcionamento Musica 3
}
let isPlaying = false;
let isShuffled = false;
const originalplaylist = [euMeRendo, Karolina, UmPedido];    //Direcionamento Musicas
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
function InitializeSong(){
    cover.src = `imagens/${originalplaylist[index].file}.webp`;
    song.src = `songs/${originalplaylist[index].file}.mp3`;
    songName.innerText = originalplaylist[index].songName;
    bandName.innerText = originalplaylist[index].artist;
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
function updateprogressbar(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}% `);
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


// Execução de Função
InitializeSong();

//addEventListeners
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateprogressbar);
progressContainer.addEventListener('click', jumpTo);
shuffle.addEventListener('click', shuffleButtonClicked);