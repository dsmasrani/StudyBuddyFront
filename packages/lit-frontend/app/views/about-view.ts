import { css, html } from "lit";
import { customElement } from "lit/decorators.js";
import * as App from "../app";
import "../components/card"
@customElement("about-view")
class AboutView extends App.View {
    static styles = css`
    body {
        background-color: var(--dark-background-color);
        margin: 0;
        color: var(--text-color-black);
    }
    .about-text {
        text-align: left;
        font-family: var(--font-family-open-sans);
        padding-top: 20px;
        padding-bottom: 20px;
        padding-left: 40px;
        padding-right: 40px;
    }
    `

    titles = ['Dev Masrani', 'Rohit Bathula'];
    subtitles = ["@dmasrani", '@rotih'];
    profileImages = [
        './../assets/img/devpfp.png',
        './../assets/img/rohitpfp.png'
    ];
    description = [
        'Jr. SDE @ Amazon',
        'SWE @ Consipire Commerce'
    ];


    connectedCallback(): void {
        super.connectedCallback();
    }

    render() {
        return html`
        <div class="about-text">
            <h1> About Us!</h1>
            <card-element .titles=${this.titles} .subtitles=${this.subtitles} .profileImages=${this.profileImages} .description=${this.description}></card-element>
            <h3> Studybuddy is out senior project while seniors @ Cal Poly SLO. It's goal was to add support for all unstructured data to chatGPT and have a working backend. Add additional data..... </h3>
        </div>`
    }
}