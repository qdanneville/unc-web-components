class PlayerControls extends HTMLElement {
    static get observedAttributes() {
        return ['playing'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEvents();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'playing' && oldValue !== newValue) {
            this._updateButtons();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    gap: 16px;
                    align-items: center;
                    justify-content: center;
                }

                button {
                    background: rgba(255, 255, 255, 0.12);
                    border: 2px solid rgba(255, 255, 255, 0.25);
                    color: white;
                    border-radius: 50%;
                    width: 52px;
                    height: 52px;
                    font-size: 18px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.2s, transform 0.15s, opacity 0.2s;
                }

                button:hover:not(:disabled) {
                    background: rgba(255, 255, 255, 0.25);
                    transform: scale(1.08);
                }

                button:active:not(:disabled) {
                    transform: scale(0.96);
                }

                button:disabled {
                    opacity: 0.35;
                    cursor: not-allowed;
                }

                #play-btn {
                    width: 60px;
                    height: 60px;
                    font-size: 22px;
                    background: rgba(167, 139, 250, 0.3);
                    border-color: rgba(167, 139, 250, 0.6);
                }

                #play-btn:hover:not(:disabled) {
                    background: rgba(167, 139, 250, 0.5);
                }
            </style>

            <button id="play-btn" title="Lecture">▶</button>
            <button id="pause-btn" title="Pause" disabled>⏸</button>
        `;
    }

    setupEvents() {
        this.shadowRoot.querySelector('#play-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('player-play', {
                bubbles: true,
                composed: true
            }));
        });

        this.shadowRoot.querySelector('#pause-btn').addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('player-pause', {
                bubbles: true,
                composed: true
            }));
        });
    }

    _updateButtons() {
        const isPlaying = this.hasAttribute('playing');
        const playBtn = this.shadowRoot?.querySelector('#play-btn');
        const pauseBtn = this.shadowRoot?.querySelector('#pause-btn');

        if (playBtn) playBtn.disabled = isPlaying;
        if (pauseBtn) pauseBtn.disabled = !isPlaying;
    }
}

customElements.define('player-controls', PlayerControls);
