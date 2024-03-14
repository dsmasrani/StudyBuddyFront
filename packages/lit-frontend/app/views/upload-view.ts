import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";
import * as App from "../app";
import "./../components/upload"
@customElement("upload-view")
class Upload extends App.View {
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
        <h1> Please Upload your Files!</h1>
        <file-uploader></file-uploader>
    `;
  }
}