import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

// const toggleSwitch = 
//     document.querySelector('.theme-slider input[type="checkbox"]'); 

function toggle() {
    const body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('dark_mode')) {
        body.classList.remove('dark_mode');
    } else {
        body.classList.add('dark_mode');
    }
}
    // toggleSwitch.addEventListener('change', toggle, false);

@customElement("nav-bar")
class NavBarElement extends LitElement {

    render() {
        return html`
        <nav class="nav">
        <a href="index.html" class="nav_text">Home</a>
        <a href="about.html" class="nav_text">About</a>
        <a href="about.html" class="nav_text">Repo</a>
        <drop-down></drop-down>
        </nav>
        `;
    }

static styles= css`
    .nav {
        background-color: var(--light-background-color);
        border-bottom: 1px solid var(--border-color-light);
        box-shadow: 0 1px 0 var(--shadow-color);
        height: 60px;
        line-height: 60px;
        padding: 0 20px;
        position: relative;
        display: flex;
    }

    .nav_text {
        color: var(--secondary-color);
        font-size: 16px;
        font-weight: 400;
        line-height: 1;
        text-decoration: none;
        font-family: var(--font-family-roboto);
        position: relative;
        margin-left: 20px;
        margin-top: 20px;
        margin-right: 20px;
    }

    .nav_text:hover {
        color: var(--primary-color);
    }

`
}