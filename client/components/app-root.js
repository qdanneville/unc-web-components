// import './user-list.js'
import './user-form.js'
import './user-selected.js'


const users = [
    {
        name: 'jean',
        email: "jean@gmail.com"
    },
    {
        name: 'jeanne',
        email: "jeanne@gmail.com"
    },
]

class AppRoot extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    width: 100vw;
                    height: 100vh;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            </style>
            <main>
                <user-form></user-form>
                <user-selected></user-selected>
            </main>
        `
    }
}

customElements.define("app-root", AppRoot);