import './user-card.js'

class UserSelected extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        document.addEventListener('userSelected', (event) => {
            console.log('user selected', event);
            this.setAttribute('name',event.detail.user.name)
            this.setAttribute('email',event.detail.user.email)
            this.render();
        })
    }

    render() {
        const name = this.getAttribute('name');
        const email = this.getAttribute('email');

        this.shadowRoot.innerHTML = `
        <user-card
            name=${name}
            email=${email}>
        </user-card>
        `
    }
}

customElements.define("user-selected", UserSelected);