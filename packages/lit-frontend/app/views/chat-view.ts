import {html, css } from "lit";
import { customElement } from "lit/decorators.js";
import * as App from "../app";
import "../components/chat"
@customElement("chat-view")
class ChatView extends App.View {
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
        <chat-gpt></chat-gpt>
    `;
  }
}