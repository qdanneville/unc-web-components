export class UserList extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
    }

    set users(value) {
        console.log('values', value)
        this._users = value
        this.render()
    }

    render() {

        console.log('users', this._users);

        this.shadowRoot.innerHTML = `
            <p>Nombre d'utilisateurs: ${this._users?.length}</p>
        `;


        this._users.forEach(user => {
            const card = document.createElement("user-card");
            card.setAttribute('name', user.name)
            card.setAttribute('email', user.email)
            this.shadowRoot.appendChild(card);
        });
    }
}

customElements.define("user-list", UserList);