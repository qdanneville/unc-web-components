import './player-track.js'
import './player-controls.js'

class SmartPlayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render();
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
            <audio src="${src}" controls></audio>
        </main>
        `
    }

    setupEvents() {
        this.shadowRoot.addEventListener('player-play', () => {
            console.log('player play')
        })

        this.shadowRoot.addEventListener('player-pause', () => {
            console.log('player pause')
        })
    }
}

customElements.define('smart-player', SmartPlayer);