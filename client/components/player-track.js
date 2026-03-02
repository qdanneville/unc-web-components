class PlayerTrack extends HTMLElement {
    static get observedAttributes() {
        return ['title', 'artist'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this._updateDisplay();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                }

                .album-art {
                    width: 96px;
                    height: 96px;
                    background: linear-gradient(135deg, #a78bfa44, #60a5fa44);
                    border: 2px solid rgba(167, 139, 250, 0.4);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 40px;
                    margin-bottom: 8px;
                    animation: spin 8s linear infinite paused;
                }

                :host([playing]) .album-art {
                    animation-play-state: running;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }

                .title {
                    font-size: 17px;
                    font-weight: 700;
                    color: white;
                    text-align: center;
                    max-width: 260px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .artist {
                    font-size: 13px;
                    color: rgba(255, 255, 255, 0.55);
                    text-align: center;
                }
            </style>

            <div class="album-art">🎵</div>
            <span class="title">${this.getAttribute('title') || 'Titre inconnu'}</span>
            <span class="artist">${this.getAttribute('artist') || 'Artiste inconnu'}</span>
        `;
    }

    _updateDisplay() {
        const titleEl = this.shadowRoot?.querySelector('.title');
        const artistEl = this.shadowRoot?.querySelector('.artist');

        if (titleEl) titleEl.textContent = this.getAttribute('title') || 'Titre inconnu';
        if (artistEl) artistEl.textContent = this.getAttribute('artist') || 'Artiste inconnu';
    }
}

customElements.define('player-track', PlayerTrack);
