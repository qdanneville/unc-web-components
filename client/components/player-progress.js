class PlayerProgress extends HTMLElement {
    static get observedAttributes() {
        return ['current-time', 'duration'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.updateDisplay();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateDisplay();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    width: 100%;
                }

                .progress-wrapper {
                    width: 100%;
                    height: 5px;
                    background: rgba(255, 255, 255, 0.15);
                    border-radius: 3px;
                    overflow: hidden;
                    cursor: pointer;
                }

                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #a78bfa, #60a5fa);
                    border-radius: 3px;
                    width: 0%;
                    transition: width 0.4s linear;
                }

                .time-display {
                    font-family: 'Courier New', monospace;
                    font-size: 13px;
                    color: rgba(255, 255, 255, 0.6);
                    text-align: right;
                    letter-spacing: 0.05em;
                }
            </style>

            <div class="progress-wrapper">
                <div class="progress-fill"></div>
            </div>
            <span class="time-display">00:00 / 00:00</span>
        `;
    }

    formatTime(seconds) {
        const s = Math.floor(seconds || 0);
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    updateDisplay() {
        const currentTime = parseFloat(this.getAttribute('current-time') || 0);
        const duration = parseFloat(this.getAttribute('duration') || 0);

        const fill = this.shadowRoot?.querySelector('.progress-fill');
        const timeDisplay = this.shadowRoot?.querySelector('.time-display');

        if (fill) {
            fill.style.width = duration > 0
                ? `${(currentTime / duration) * 100}%`
                : '0%';
        }

        if (timeDisplay) {
            timeDisplay.textContent = `${this.formatTime(currentTime)} / ${this.formatTime(duration)}`;
        }
    }
}

customElements.define('player-progress', PlayerProgress);
