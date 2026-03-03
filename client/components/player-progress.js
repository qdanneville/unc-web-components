class PlayerProgress extends HTMLElement {

    static get observedAttributes() {
        return ['duration', 'current-time'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render()
    }

    render() {

        const duration = this.getAttribute('duration')
        const currentTime = this.getAttribute('current-time')

        console.log('duration', duration);
        console.log('currentTime', currentTime)

        this.shadowRoot.innerHTML = `
        <style>

            :host {
                padding:20px 0;
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                text-align:center;
                gap:10px;
            }

            .progress-wrapper {
                position:relative;
                width:100%;
                height:2px;
                background:#222;
            }

            .progress-bar {
                width:20%;
                height:100%;
                background:red;
            }
        </style>

        <div class="progress-wrapper">
                <div class="progress-bar" style="width:${currentTime / duration * 100}%">
                </div>
            </div>
        <span class="time-display">${currentTime}/ ${duration}</span>
        `
    }
}

customElements.define('player-progress', PlayerProgress);