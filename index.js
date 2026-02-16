class UiCard extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" });
        this.firstname = this.getAttribute("firstname");
        this.lastname = this.getAttribute("lastname");
        this.email = this.getAttribute("email");

        console.log("firstname : ", this.firstname)
        console.log("lastname : ", this.lastname)
        console.log("email : ", this.email)
    }

    connectedCallback() {
        console.log('Ui card ready');
        this.render();
    }

    render() {
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

                img {
                    max-width:100%;
                }
            </style>

            <div>
                <header>
                    <img src="https://images4.fanpop.com/image/photos/17000000/Anakin-Skywalker-anakin-skywalker-17028586-992-960.jpg" />
                </header>
                <article>
                    <p>Prénom : <strong>${this.firstname}</strong></p>
                    <p>Nom : <strong>${this.lastname}</strong></p>
                    <p>Email : <strong>${this.email}</strong></p>
                </article>
            </div>
        `
    }
}

customElements.define("ui-card", UiCard);