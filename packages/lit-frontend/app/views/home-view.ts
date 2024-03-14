import {html, css } from "lit";
import { customElement } from "lit/decorators.js";
import * as App from "../app";
import "../components/google-sso"
@customElement("home-view")
class HomeView extends App.View {

    static styles = css`
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
    
    .center-image {
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 4%;
        justify-content: center;
        align-items: center;
    }
    
    .logo-text {
        color: var(--text-color-black);
        font-weight: 400;
        font-family: var(--font-family-open-sans);
        line-height: 1;
        text-decoration: none;
        text-align: center;
    }
    
    .logo-text-subtitle {
        color: var(--text-color-grey);
        font-size: 16px;
        font-weight: 400;
        font-family: var(--font-family-roboto);
        line-height: 1;
        text-decoration: none;
        text-align: center;
    }
    
    .body {
        background-color: var(--dark-background-color);
        margin: 0;
        color: var(--text-color-black);
    }
    
    .body h1 {
        font-family: var(--font-family-open-sans);
    }
    
    .center-text {
        text-align: center;
        padding-top: 20px;
    }
    
    .google-login-button {
        background-color: var(--google-blue);
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 2px;
        font-weight: bold;
        font-family: var(--font-family-roboto);
        font-size: 16px;
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        cursor: pointer;
        text-transform: uppercase;
        text-decoration: none;
        box-shadow: var(--shadow-color);
        transition: var(--transition-bg-color);
    }
    
    .google-login-button:hover {
        background-color: var(--google-blue-hover);
    }
    
    .google-login-button img {
        margin-right: 10px;
    }
    
    .gbutton-container {
        display: flex;
        text-decoration: none;
        justify-content: center;
    }
    `;
  render() {
    return html`
        <img class="center-image" src="/assets/img/logo_no_text.png" alt="Study Buddy Logo">
            <h1 class="logo-text">StudyBuddy</h1>
            <h3 class="logo-text-subtitle">Add .pdf support for any PDF to ChatGPT with information citing</h3>
            <div class="center-text">
            <p>Get Started</p>
            <div class="gbutton-container">
                <google-sso>
                </google-sso>
            </div>
        </div>
    `;
  }
}