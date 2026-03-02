import "./player-track.js"
import "./player-controls.js"

export class SmartPlayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render();
        this.setupEvents();
    }

    render() {

        const title = this.getAttribute('title');
        const src = this.getAttribute('src');
        const artist = this.getAttribute('artist');

        this.shadowRoot.innerHTML = `

        <style>
            main {
                border:solid 1px black;
                border-radius:10px;
                background:white;
                box-shadow:2px 2px 2px rgba(0,0,0,0.5);
            }
        </style>

        <main>
            <player-track title=${title} artist=${artist}></player-track>
            <player-controls></player-controls>
            <audio src="${src}" controls></audio>
        </main>
        `
    }

    setupEvents() {
        // Les événements enfants remontent jusqu'au shadowRoot grâce à bubbles + composed
        this.shadowRoot.addEventListener('player-play', () => {
            console.log('player play')
            // this._audio.play();
            // this._setPlayingState(true);
        });

        this.shadowRoot.addEventListener('player-pause', () => {
            console.log('player pause')
            // this._audio.pause();
            // this._setPlayingState(false);
        });
    }
}

customElements.define('smart-player', SmartPlayer);