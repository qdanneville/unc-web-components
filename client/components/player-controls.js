import "./player-track.js"

export class PlayerControls extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render();
        this.setupEvents();
    }

    render() {

        this.shadowRoot.innerHTML = `

        <style>
            div {
                display:flex;
                justify-content:center;
                align-items:center;
                gap:10px;
                padding:20px;
            }

            button {

                width:50px;
                height:50px;

                display:flex;
                justify-content:center;
                align-items:center;

                button-appearance:none;
                border:none;
                padding:20px;
                border-radius:50%;
                background:#222;

                font-size:20px;
                color:white;
                box-shadow: 0px 0px 12px rgba(0,0,0,0.5);

                cursor:pointer;
            }
        </style>

        <div>
            <button id="play">▶</button>
            <button id="pause">⏸</button>
        </div>
        `
    }

    setupEvents() {
        const playButton = this.shadowRoot.querySelector('#play');

        const pauseButton = this.shadowRoot.querySelector('#pause');

        playButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('player-play', {
                bubbles: true,
                composed: true
            }));
        })

        pauseButton.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('player-pause', {
                bubbles: true,
                composed: true
            }));
        })
    }
}

customElements.define('player-controls', PlayerControls);