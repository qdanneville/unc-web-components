import './player-track.js';
import './player-controls.js';
import './player-progress.js';

class SmartPlayer extends HTMLElement {
    static get observedAttributes() {
        return ['src', 'title', 'artist'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._audio = null;
    }

    connectedCallback() {
        this.render();
        this.setupAudio();
        this.setupEvents();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        switch (name) {
            case 'src':
                if (this._audio) this._audio.src = newValue;
                break;
            case 'title':
                this.shadowRoot?.querySelector('player-track')?.setAttribute('title', newValue);
                break;
            case 'artist':
                this.shadowRoot?.querySelector('player-track')?.setAttribute('artist', newValue);
                break;
        }
    }

    render() {
        const title = this.getAttribute('title') || 'Titre inconnu';
        const artist = this.getAttribute('artist') || 'Artiste inconnu';
        const src = this.getAttribute('src') || '';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                .player {
                    background: linear-gradient(160deg, #1e1b4b 0%, #312e81 50%, #1e3a5f 100%);
                    border-radius: 24px;
                    padding: 36px 32px;
                    width: 300px;
                    display: flex;
                    flex-direction: column;
                    gap: 28px;
                    box-shadow:
                        0 30px 60px rgba(0, 0, 0, 0.5),
                        inset 0 1px 0 rgba(255, 255, 255, 0.1);
                }

                .warning {
                    color: rgba(251, 191, 36, 0.8);
                    font-size: 12px;
                    text-align: center;
                    font-style: italic;
                    padding: 8px;
                    border: 1px solid rgba(251, 191, 36, 0.3);
                    border-radius: 8px;
                    background: rgba(251, 191, 36, 0.05);
                }
            </style>

            <div class="player">
                <player-track title="${title}" artist="${artist}"></player-track>
                <player-controls></player-controls>
                <player-progress current-time="0" duration="0"></player-progress>
                ${!src ? '<p class="warning">⚠ Aucune source audio — ajouter l\'attribut <code>src</code></p>' : ''}
            </div>

            <audio src="${src}" preload="metadata"></audio>
        `;
    }

    setupAudio() {
        this._audio = this.shadowRoot.querySelector('audio');

        // Mise à jour de la durée dès que les métadonnées sont chargées
        this._audio.addEventListener('loadedmetadata', () => {
            this.shadowRoot.querySelector('player-progress')
                .setAttribute('duration', this._audio.duration);
        });

        // Mise à jour du temps courant à chaque tick
        this._audio.addEventListener('timeupdate', () => {
            this.shadowRoot.querySelector('player-progress')
                .setAttribute('current-time', this._audio.currentTime);
        });

        // Remise à zéro en fin de piste
        this._audio.addEventListener('ended', () => {
            this._setPlayingState(false);
            this.shadowRoot.querySelector('player-progress')
                .setAttribute('current-time', 0);
        });
    }

    setupEvents() {
        // Les événements enfants remontent jusqu'au shadowRoot grâce à bubbles + composed
        this.shadowRoot.addEventListener('player-play', () => {
            this._audio.play();
            this._setPlayingState(true);
        });

        this.shadowRoot.addEventListener('player-pause', () => {
            this._audio.pause();
            this._setPlayingState(false);
        });
    }

    // Met à jour l'attribut "playing" sur les composants enfants concernés
    _setPlayingState(isPlaying) {
        const controls = this.shadowRoot.querySelector('player-controls');
        const track = this.shadowRoot.querySelector('player-track');

        if (isPlaying) {
            controls?.setAttribute('playing', '');
            track?.setAttribute('playing', '');
        } else {
            controls?.removeAttribute('playing');
            track?.removeAttribute('playing');
        }
    }
}

customElements.define('smart-player', SmartPlayer);
