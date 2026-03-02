export class PlayerTrack extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        console.log('qkjlsd');
        this.render();
    }

    render() {

        const title = this.getAttribute('title');
        const artist = this.getAttribute('artist');

        this.shadowRoot.innerHTML = `

        <style>
            div {
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                gap:5px;
            }

            h1, p {
                margin:0;
                padding:0;
            }

            figure {

                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;

                width:100px;
                height:100px;
                background:#ffedcc;
                border-radius:50%;

                font-size:40px;
            }
        </style>

        <div>
            <figure>🔊</figure>
            <h1>${title}</h1>
            <p>${artist}</p>
        </div>
        `
    }
}

customElements.define('player-track', PlayerTrack);