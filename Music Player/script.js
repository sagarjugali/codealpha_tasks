// Get HTML elements

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play-btn");

const prevBtn = document.getElementById("prev-btn");

const nextBtn = document.getElementById("next-btn");

const progressBar = document.getElementById("progress-bar");

const volume = document.getElementById("volume");

const songTitle = document.getElementById("song-title");

const artist = document.getElementById("artist");

const currentTime = document.getElementById("current-time");

const duration = document.getElementById("duration");

const autoplay = document.getElementById("autoplay");

const playlistItems = document.querySelectorAll("#playlist li");


// Songs

const songs = [

    {
        title: "uptown funk",
        artist: "Mark Ronson ft. Bruno Mars",
        src: "songs/song1.mp3"
    },

    {
        title: "perfect",
        artist: "Ed Sheeran",
        src: "songs/song2.mp3"
    },

    {
        title: "blinding lights",
        artist: "The Weeknd",
        src: "songs/song3.mp3"
    }

];


// Current song

let songIndex = 0;


// Load song

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    artist.textContent = song.artist;

    audio.src = song.src;

    audio.load();

    updatePlaylist();

}


// Play song

function playSong() {

    audio.play();

    playBtn.textContent = "⏸";

}


// Pause song

function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶";

}


// Play / Pause button

playBtn.addEventListener("click", () => {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// Previous song

prevBtn.addEventListener("click", () => {

    songIndex--;

    if (songIndex < 0) {

        songIndex = songs.length - 1;

    }

    loadSong(songIndex);

    playSong();

});


// Next song

nextBtn.addEventListener("click", () => {

    songIndex++;

    if (songIndex >= songs.length) {

        songIndex = 0;

    }

    loadSong(songIndex);

    playSong();

});


// Update progress bar

audio.addEventListener("timeupdate", () => {

    if (audio.duration) {

        const progress =
            (audio.currentTime / audio.duration) * 100;

        progressBar.value = progress;

    }

    currentTime.textContent =
        formatTime(audio.currentTime);

});


// Load duration

audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

});


// Change song position

progressBar.addEventListener("input", () => {

    if (audio.duration) {

        audio.currentTime =
            (progressBar.value / 100) * audio.duration;

    }

});


// Volume control

volume.addEventListener("input", () => {

    audio.volume = volume.value;

});


// Autoplay

audio.addEventListener("ended", () => {

    if (autoplay.checked) {

        songIndex++;

        if (songIndex >= songs.length) {

            songIndex = 0;

        }

        loadSong(songIndex);

        playSong();

    } else {

        playBtn.textContent = "▶";

    }

});


// Playlist click

playlistItems.forEach((item) => {

    item.addEventListener("click", () => {

        songIndex =
            Number(item.dataset.index);

        loadSong(songIndex);

        playSong();

    });

});


// Highlight active song

function updatePlaylist() {

    playlistItems.forEach((item, index) => {

        if (index === songIndex) {

            item.classList.add("active");

        } else {

            item.classList.remove("active");

        }

    });

}


// Format time

function formatTime(time) {

    if (isNaN(time)) {

        return "0:00";

    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;

}


// Load first song

loadSong(songIndex);