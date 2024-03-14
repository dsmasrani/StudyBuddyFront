import { html, css } from "lit";
import { customElement } from "lit/decorators.js";
import * as App from "../app";
import "./../components/nav-bar";
import update from "../update";
import routes from "../routes";
import "./../components/vaadin-router"
@customElement("studybuddy-app")
class StudyBuddyApp extends App.Main {
  constructor() {
    super(update);
  }
  static styles = css`
    :host {
      display: block;
      padding: 24px;
      color: var(--lit-studybuddy-text-color, #000);
    }

    nav-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }
    .body {
      margin-top: 60px;
    }
  `;

  render() {
    return html`
        <nav-bar></nav-bar>
        <div class="body">
          <vaadin-router .routes=${routes}></vaadin-router>
        </div>
    `;
  }
}