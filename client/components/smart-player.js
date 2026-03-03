import './player-track.js'
import './player-controls.js'
import './player-progress.js'

class SmartPlayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
        this._audio = null;
    }

    connectedCallback() {
        this.render();
        this.setupAudio();
        this.setupEvents();
    }

    render() {

        const src = this.getAttribute('src')
        const title = this.getAttribute('title')
        const artist = this.getAttribute('artist')

        this.shadowRoot.innerHTML = `

        <style>
            main {
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                text-align:center;

                background:white;
                border-radius:20px;
                box-shadow:0px 2px 2px rgba(0,0,0,4px);
            }
        </style>

        <main>
            <player-track title=${title} artist=${artist}></player-track>
            <player-controls></player-controls>
            <player-progress></player-progress>
            <audio src="${src}"></audio>
        </main>
        `
    }

    setupEvents() {
        this.shadowRoot.addEventListener('player-play', () => {
            console.log('player play')
            this._audio.play();
        })

        this.shadowRoot.addEventListener('player-pause', () => {
            console.log('player pause')
            this._audio.pause();
        })
    }

    setupAudio() {
        const audio = this.shadowRoot.querySelector('audio');
        this._audio = audio;

        const playerTrack = this.shadowRoot.querySelector('player-track');
        const playerControls = this.shadowRoot.querySelector('player-controls');

        this._audio.addEventListener('durationchange', (event) => {
            console.log('duration changed', event);
        })

        this._audio.addEventListener('play', () => {
            playerTrack.setAttribute('playing', true)
            playerControls.setAttribute('playing', true)
        })

        this._audio.addEventListener('pause', () => {
            playerTrack.removeAttribute('playing')
            playerControls.removeAttribute('playing')
        })

        this._audio.addEventListener('loadedmetadata', () => {
            this.shadowRoot.querySelector('player-progress')
                .setAttribute('duration', this._audio.duration);
        });

        // Mise à jour du temps courant à chaque tick
        this._audio.addEventListener('timeupdate', () => {
            this.shadowRoot.querySelector('player-progress')
                .setAttribute('current-time', this._audio.currentTime);
        });
    }
}

customElements.define('smart-player', SmartPlayer);