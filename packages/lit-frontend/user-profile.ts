// src/user-profiles.ts
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Profile } from "./app/profile";
import { serverPath } from "./app/root";

@customElement("user-profile")
export class UserProfileElement extends LitElement {
  @property({reflect: true, type: String})
  path: string = "";

  @state()
  profile?: Profile;

  _fetchData(path: string) {
    fetch(serverPath(path))
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        return null;
      })
      .then((json: unknown) => {
          if (json) this.profile = json as Profile;
      });
  }

  // in class UserProfileElement
  connectedCallback() {
    if (this.path) {
      this._fetchData(this.path);
    }
    super.connectedCallback();
  }
  
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
) {
  if (name === "path" && oldValue !== newValue && oldValue) {
    this._fetchData(newValue);
  }
  super.attributeChangedCallback(name, oldValue, newValue);
}

  render() {
    // fill this in later
    return html`...`;
  }

  static styles = css`...`;
}