class PlayerControls extends HTMLElement {

    static get observedAttributes() {
        return ['playing'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render();
        this.setupEvents();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'playing' && oldValue !== newValue) {
            this.updateButtons();
        }
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

    updateButtons() {
        const isPlaying = this.hasAttribute('playing');
        const playBtn = this.shadowRoot?.querySelector('#play');
        const pauseBtn = this.shadowRoot?.querySelector('#pause');

        if (playBtn) playBtn.disabled = isPlaying;
        if (pauseBtn) pauseBtn.disabled = !isPlaying;
    }

}

customElements.define('player-controls', PlayerControls);