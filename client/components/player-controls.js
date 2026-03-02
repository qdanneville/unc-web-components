class PlayerControls extends HTMLElement {
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