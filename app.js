class Drumkit {
    constructor(){
        this.pads = document.querySelectorAll('.pad')
        this.kickAudio = document.querySelector('.kick-sound')
        this.snareAudio = document.querySelector('.snare-sound')
        this.hihatAudio = document.querySelector('.hihat-sound')
        this.playButton = document.querySelector('.play')
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select')
        this.muteButtons = document.querySelectorAll('.mute')
        this.tempoSlider = document.querySelector('.tempo-slider')
        this.tempoSpan = document.querySelector('.tempo-span')
    }
    activePad() {
        this.classList.toggle('active')
    }
    repeat() {
        let step = this.index % 8;
        this.index++;
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if(bar.classList.contains('active')){
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play()
                } else if (bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play()
                } else if (bar.classList.contains('hihat-pad')) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play()
                }
            }
            
        })
    }
    start() {
        const interval = (60 / this.bpm) * 1000

        if(this.isPlaying) {
            clearInterval(this.isPlaying)
            this.isPlaying = null;
            this.index = 0;
            this.playButton.innerHTML = 'Play'
            this.playButton.classList.remove('active')
        } else {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
            this.playButton.innerHTML = 'Stop'
            this.playButton.classList.add('active')
        }

    }

    changeSound(e) {
        const name = e.target.name
        const val = e.target.value

        switch(name){
            case "kick-select":
                this.kickAudio.src = val
                break;
            case "snare-select":
                this.snareAudio.src = val
                break;
            case "hihat-select":
                this.hihatAudio.src = val
                break;
        }
    }

    muteTrack(e) {
        const track = e.target.getAttribute('data-track')
        e.target.classList.toggle('muted')
        if(e.target.classList.contains('muted')){
            switch (track){
                case "0":
                    this.kickAudio.volume = 0
                    break;
                case "1":
                    this.snareAudio.volume = 0
                    break;
                case "2":
                    this.hihatAudio.volume = 0
                    break;
            }
        } else {
            switch (track){
                case "0":
                    this.kickAudio.volume = 1
                    break;
                case "1":
                    this.snareAudio.volume = 1
                    break;
                case "2":
                    this.hihatAudio.volume = 1
                    break;
            }
        }
    }

    changeTempo(e){
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        if(this.playButton.classList.contains('active')){
            this.start()
        }
    }

    changeTempoText(e){
        const tempo = e.target.value
        this.bpm = tempo
        this.tempoSpan.innerText = tempo;
    }
}


const drumkit = new Drumkit();


/// Event listeners

drumkit.pads.forEach(pad => {
    pad.addEventListener('click', drumkit.activePad) // keyword this refers to pad clicked
    pad.addEventListener('animationend', function(){
        this.style.animation = '';
    })
})

drumkit.playButton.addEventListener('click', () => {
    drumkit.start(); // anonymous function means this will refer to the class instead
});

drumkit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumkit.changeSound(e);
    })
})

drumkit.muteButtons.forEach(btn => {
    btn.addEventListener('click', function(e){
        drumkit.muteTrack(e);
    })
})

drumkit.tempoSlider.addEventListener('input', function(e){
    drumkit.changeTempoText(e);
})

drumkit.tempoSlider.addEventListener('change', function(e){
    drumkit.changeTempo(e);
})
