class UiCard extends HTMLElement {

    static get observedAttributes() {
        return ['firstname', 'lastname', 'email', 'color']
    }

    constructor() {
        super()
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        const firstname = this.getAttribute("firstname");
        const lastname = this.getAttribute("lastname");
        const email = this.getAttribute("email");
        const color = this.getAttribute("color");

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    width: calc(33.333% - 14px);
                }

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
                    width:200px;
                    height:200px;
                    border-radius:50%;
                }
            </style>

            <div>
                <header style="background:${color}">
                </header>
                <article>
                    <p>Prénom : <strong>${firstname}</strong></p>
                    <p>Nom : <strong>${lastname}</strong></p>
                    <p>Email : <strong>${email}</strong></p>
                    <button>Voir le profil</button>
                    <button id="duplicate">Dupliquer</button>
                </article>
            </div>
        `

        const button = this.shadowRoot.querySelector('button');

        button.addEventListener('click', () => {
            const event = new CustomEvent("userSelected", {
                detail: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    color: color
                },
                bubbles: true
            });

            this.dispatchEvent(event);
        });

        const duplicateButton = this.shadowRoot.getElementById('duplicate');

        duplicateButton.addEventListener('click', () => {
            const duplicateUserEvent = new CustomEvent("duplicateUser", {
                detail: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    color: color
                },
                bubbles: true
            })

            this.dispatchEvent(duplicateUserEvent);
        })
    }
}

customElements.define("ui-card", UiCard);

document.addEventListener('userSelected', (event) => {
})

document.addEventListener('duplicateUser', (event) => {
    const user = {
        firstname: event.detail.firstname,
        lastname: event.detail.lastname,
        email: event.detail.email,
        color: event.detail.color
    }

    const newUICard = document.createElement('ui-card')

    const entries = Object.entries(user);

    entries.forEach(([key, value]) => {
        newUICard.setAttribute(key, value)
    })

    const main = document.querySelector('main');

    main.appendChild(newUICard);
})