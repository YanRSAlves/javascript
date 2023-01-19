// Referências do html
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');

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
const playlist = [euMeRendo, Karolina, UmPedido];    //Direcionamento Musicas
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
    cover.src = `imagens/${playlist[index].file}.webp`;
    song.src = `songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}
function previousSong(){
    if (index === 0){
        index = playlist.length - 1;
    }else {
    index -= 1;
    //index = index - 1;
    } 
    InitializeSong();
    playSong();
    
}
function nextSong(){
    if (index === playlist.length - 1){
        index = 0;
    }else {
    index += 1;
    //index = index + 1; 
    } 
    InitializeSong();
    playSong();
    
}


// Execução de Função
InitializeSong();

//addEventListeners
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);