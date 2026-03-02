class PlayerTrack extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
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
                text-align:center;
                gap:10px;
                
                padding:20px;
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

                width:80px;
                height:80px;

                border-radius:50%;
                background:#fde3e3;

                font-size:40px;

                animation: track-animation 1s ease forwards infinite;
            }

            @keyframes track-animation {
                0% {
                    transform:scale(1)
                }
                50%{
                    transform:scale(2)
                }
                100% {
                    transform:scale(1)
                }
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