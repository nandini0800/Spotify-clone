console.log("Welcome to Spotify!")

let songIndex=1;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');     //for play button
let myProgressBar = document.getElementById('progressbar');            //for progress bar
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"Boy with Luv", filepath:"songs/1.mp3", coverpath:"covers/1.png"},
    {songName:"Blood Sweat and Tears", filepath:"songs/2.mp3", coverpath:"covers/2.jpeg"},
    {songName:"Fake Love", filepath:"songs/3.mp3", coverpath:"covers/3.jpg"},
    {songName:"Dynamite", filepath:"songs/4.mp3", coverpath:"covers/4.jpg"},
    {songName:"Spring day", filepath:"songs/5.mp3", coverpath:"covers/5.jpg"},
    {songName:"Butter", filepath:"songs/6.mp3", coverpath:"covers/6.png"},
    {songName:"Run BTS", filepath:"songs/7.mp3", coverpath:"covers/7.jpeg"}
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverpath; 
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName; 
})

//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    
    if (audioElement!== undefined && (audioElement.paused || audioElement.currentTime<=0)){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
      }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//listen to events
audioElement.addEventListener('timeupdate', ()=>{
    //console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);         //find percentage of song played
    //console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = audioElement.duration*myProgressBar.value/100;
})

const makeAllPlays= ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element,songIndex) => {
    element.addEventListener('click', (e)=>{        //'e' is clicked                            //target is used to get the element which is clicked
        makeAllPlays();                             //when a song is paused rest all should become plays
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;          //2nd argument is by default 0, so here index needs to be incremented
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=7){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;          
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;          
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})