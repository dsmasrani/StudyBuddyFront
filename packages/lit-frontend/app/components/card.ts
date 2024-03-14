import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("card-element")
class CardElement extends LitElement {
    // Properties to accept arrays of titles, subtitles, and profile images
    @property({ reflect: true, type: Array })
    titles = [];

    @property({ reflect: true, type: Array })
    subtitles = [];

    @property({ reflect: true, type: Array })
    profileImages = [];

    // Property to track view mode
    @property({ reflect: true, type: String })
    viewMode = "card"; // Default view mode

    @property({ reflect: true, type: String })
    description = "lorem ipsum dolor"; // Default view mode

    render() {
        // Conditional rendering based on viewMode
        return html`
            <button @click="${this.listView}"><i class="fa-solid fa-bars"></i>List</button>
            <button @click="${this.cardView}"><i class="fa-solid fa-large"></i>Grid</button>
            <div class="container">
                ${this.viewMode === "card" ? this.renderCardsView() : this.renderListView()}
            </div>
            <!-- <button @click="${this.toggleView}">Toggle View</button> -->
        `;
    }

    listView(){
        this.viewMode = "list";
    }
    cardView(){
        this.viewMode = "card";
    }
    toggleView() {
        this.viewMode = this.viewMode === "card" ? "list" : "card";
    }

    // Render cards view
    renderCardsView() {
        return html`${this.titles.map((title, index) => html`
            <div class="card">
                <div class="profile-image">
                    <img src="${this.profileImages[index]}" alt="Profile Image">
                </div>
                <div class="text-content">
                    <h2>${title}</h2>
                    <h3>${this.subtitles[index]}</h3>
                    <p>${this.description[index]}</p>
                </div>
            </div>
        `)}`;
    }

    // Render list view
    renderListView() {
        return html`${this.titles.map((title, index) => html`
            <div class="list">
                <img src="${this.profileImages[index]}" alt="Profile Image" class="list-image">
                <div>
                    <h2>${title}</h2>
                    <h3>${this.subtitles[index]}</h3>
                    <p>${this.description[index]}</p>
                </div>
            </div>
        `)}`;
    }

    static styles = css`
        .container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            background-color: transparent;
        }
        .card, .list {
            background-color: var(--light-background-color); /* No background */
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin: 20px;
        }
        .profile-image img, .list-image {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            margin-right: 20px;
        }
        .text-content {
            display: flex;
            flex-direction: column;
        }
        .list {
            flex-direction: column;
            align-items: center;
            width: 200px;
        }
        .list-image {
            margin-bottom: 20px;
        }

        .p .h3 {
            color: var(--text-color-black);
        }
        .card{
            align-items: center;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 400px;
        }
        button {
            cursor: pointer;
            padding: 10px 20px;
            margin: 0 5px;
            border: none;
            border-radius: 5px;
            background-color: var(--button-color); /* Bootstrap primary color */
            color: var(--light-background-color);
            font-family: var(--font-family-roboto);
            font-size: 16px;
            transition: background-color 0.3s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 5px; /* Space between icon and text */
        }
    
        button:hover {
            background-color: var(--button-color-hover); /* A darker shade for hover effect */
        }
    
        /* Style for Font Awesome icons */
        .fa {
            margin-right: 8px;
        }
    `;
}
