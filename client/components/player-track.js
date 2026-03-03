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

                position:relative;
                z-index:0;

                width:80px;
                height:80px;

                border-radius:50%;

                font-size:40px;

                animation: track-animation 1s linear paused infinite;
            }

            figure::before {
                position:absolute;
                content:'';

                left:0;
                top:0;

                width:100%;
                height:100%;

                z-index:-1;
                background:#fde3e3;
                border-radius:50%;
            }

            figure::after {
                position:absolute;
                content:'';

                left:0;
                top:0;

                width:100%;
                height:100%;

                z-index:-2;
                transform:scale(1.5);
                background:#fde3e3;
                border-radius:50%;
                opacity:0.5;
                animation: track-animation 1s linear paused infinite;
            }

            figure svg {
                animation: track-animation 1s linear paused infinite;
                color:#ffbaba;
            }

            :host([playing]) figure {
                animation-play-state: running;
                animation-delay:0.3s;
            }

            :host([playing]) figure::after{
                animation-play-state: running;
                animation-delay:0.6s;
            }

            :host([playing]) figure svg {
                animation-play-state: running;
                color:#803f3f;
            }

            .track-animate {
                animation: track-animation 1s ease forwards infinite;
            }

            @keyframes track-animation {
                0% {
                    transform:scale(1)
                }
                50%{
                    transform:scale(1.25) 
                }
                100% {
                    transform:scale(1)
                }
            }
            
        </style>

        <div>
            <figure><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-audio-lines-icon lucide-audio-lines"><path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/></svg></figure>
            <h1>${title}</h1>
            <p>${artist}</p>
        </div>
        `
    }
}

customElements.define('player-track', PlayerTrack);