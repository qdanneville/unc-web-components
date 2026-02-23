class Pokemon extends HTMLElement {
    static get observedAttributes() {
        return ['name', 'type', 'pv', 'image', 'color']
    }

    constructor() {
        super()
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {

        const name = this.getAttribute("name");
        const type = this.getAttribute("type");
        const pv = this.getAttribute("pv");
        const image = this.getAttribute("image");
        const color = this.getAttribute("color");

        this.shadowRoot.innerHTML = `
            <style>
                div {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    background: #222;
                    padding: 20px;
                    border-radius: 20px;

                    color: white;
                }

                header {

                    display:flex;
                    justify-content:space-between;
                    align-items:start;

                    width:100%;
                    min-height:300px;

                    background-size:cover;
                    background-position:center;
                    background-repeat:no-repeat;

                }

                article {
                    width:100%;
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                }

                .pv {
                    font-size:40px;
                    background:red;
                    padding:0;
                    margin:0;

                    background:white;
                    border-radius:10px;
                    color:#222;
                    font-weight:bold;
                }

                .name {
                    padding:0;
                    margin:0;

                    font-size:20px;
                    font-weight:bold;
                }

                .color {
                    display:block;
                    width:50px;
                    height:10px;
                }
            </style>

            <div>
                <header style="background-image:url('${image}')">
                    <p class="name"><strong>${name}</strong></p>
                    <p class="pv">${pv}</p>
                </header>
                <article>
                    <p><strong>${type}</strong></p>
                    <span class="color" style="background:${color}"></span>
                </article>
                <ui-pokeball
                    name=${name}
                    color=${color}
                    type=${type}
                    image=${image}
                    pv=${pv}
                >
                </ui-pokeball>
            </div>
        `
    }
}

class Pokeball extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const name = this.getAttribute("name");
        const type = this.getAttribute("type");
        const image = this.getAttribute("image");
        const pv = this.getAttribute("pv");
        const color = this.getAttribute("color");

        this.shadowRoot.innerHTML = `
            <style>
                button {
                    display:flex;
                    justify-content:center;
                    align-items:center;

                    background:red;
                    button-appearance:nonce;
                    border:2px solid white;;
                    padding:20px;
                    border-radius:50%;

                    cursor:pointer;
                    transition:all 0.15s ease;
                }

                button:hover {
                    background:blue;
                    transform:scale(1.5);
                }
            </style>

            <button></button>
        `

        const button = this.shadowRoot.querySelector('button');

        button.addEventListener('click', () => {
            const event = new CustomEvent("pokemonCaptured", {
                detail: {
                    name: name,
                    type: type,
                    image: image,
                    color: color,
                    pv: pv
                },
                bubbles: true,
                composed: true
            });

            console.log('event', event)

            this.dispatchEvent(event);
        });
    }
}

document.addEventListener('pokemonCaptured', (event) => {
    const pokemon = {
        name: event.detail.name,
        type: event.detail.type,
        image: event.detail.image,
        color: event.detail.color,
        pv: event.detail.pv
    }

    const pokemonCaptured = document.createElement('ui-pokemon')

    const entries = Object.entries(pokemon);

    entries.forEach(([key, value]) => {
        pokemonCaptured.setAttribute(key, value)
    })

    const container = document.querySelector('.pokemon-captured');

    container.removeChild(container.lastChild)
    container.appendChild(pokemonCaptured);
})

customElements.define("ui-pokemon", Pokemon);
customElements.define("ui-pokeball", Pokeball);