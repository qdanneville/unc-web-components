class UserForm extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
        <form>
            <input type="text" name="name" id="name" />
            <input type="email" name="email" id="email" />
            <button type="submit">Ajouter</button>
        </form>
        `

        const form = this.shadowRoot.querySelector('form');

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = new FormData(form)

            const user = {
                name: formData.get("name"),
                email: formData.get("email")
            };

            const selectedUser = new CustomEvent("userSelected", {
                detail: {
                    user: user
                },
                bubbles: true,
                composed: true
            });

            this.dispatchEvent(selectedUser);
        })
    }
}

customElements.define("user-form", UserForm);