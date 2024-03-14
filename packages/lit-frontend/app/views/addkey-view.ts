import {html, css } from "lit";
import * as App from "../app";
import { customElement } from "lit/decorators.js";
import "../components/edit-profile"
@customElement("addkey-view")
class AddKeyView extends App.View {
    static styles = css`
    body {
        background-color: var(--dark-background-color);
        margin: 0;
        color: var(--text-color-black);
    }
    
    body h1 {
        font-family: var(--font-family-open-sans);
    }
    `;
  render() {
    return html`
        <h1> Please Update your API Keys!</h1>
        <user-profile-edit path="/updateProfile/dsmasrani@gmail.com/4"></user-profile-edit>
        </div>
    `;
  }
}