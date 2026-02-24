export class UserCard extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {

        const name = this.getAttribute('name');
        const email = this.getAttribute('email');

        this.shadowRoot.innerHTML = `
        <div>
            <p>name : ${name}</p>
            <p>email : ${email}</p>
        </div>
        `
    }
}

customElements.define("user-card", UserCard);