export class SmartPlayer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        this.render();
    }

    render() {

        const title = this.getAttribute('title');
        const src = this.getAttribute('src');
        const artist = this.getAttribute('artist');

        this.shadowRoot.innerHTML = `
        <main>
            <audio src="${src}"></audio>
        </main>
        `
    }
}

customElements.define('smart-player', SmartPlayer);