// src/user-profiles.ts
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Profile } from "./profile";
import { serverPath } from "./root";
import { API } from "./api";

@customElement("user-profile")
export class UserProfileElement extends LitElement {
  @property({reflect: true, type: String})
  path: string = "";

  @state()
  profile?: Profile;

  async getUserID() {
    return 0 }

  _fetchData(path: string) {
    API.getUserID().then((id) => {
      path = this.path + '/' + id;
      fetch(serverPath(path))
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          alert("No Keys Found, Please Enter some Keys");
        }
      })
      .then((json: unknown) => {
          if (json) this.profile = json as Profile;
      });
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
    return html`
    <div class="container">
        <div class="addkey-body">
            <h2>User Profile</h2>
            <div><p>
                <svg class="icon">
                    <use href="/icons/profile.svg#icon-person" />
                  </svg>
                  Id: ${this.profile.id}</p></div>
            <div><p>
                <svg class="icon">
                    <use href="/icons/profile.svg#icon-email" />
                  </svg>
                Email: ${this.profile.user_email}</p></div>
            <div><p>
                <svg class="icon">
                    <use href="/icons/profile.svg#icon-openapi" />
                  </svg>
                  OpenAPI Key: ${this.profile.openai_key}</p></span></div>
            <div><p>
                <svg class="icon">
                    <use href="/icons/profile.svg#icon-pineapi" />
                  </svg>
                  Pinecone API Key: ${this.profile.pinecone_key}</p></span></div>
            <div><p>
                <svg class="icon">
                    <use href="/icons/profile.svg#icon-pineenv" />
                  </svg>
                  Pinecone Environment: ${this.profile.pinecone_env} </p></span></div>
            <div><p>
                <svg class="icon">
                    <use href="/icons/profile.svg#icon-index" />
                  </svg>
                  Pinecone Index: ${this.profile.index_name}</p></span></div>
            <button class="addkey-body"><a href="addkey.html">Change Keys</a></button>
        </div>
    </div>`;
  }

  static styles = css`
  
.addkey p {
  text-align: left;
  font-family: var(--font-family-open-sans);
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 40px;
  padding-right: 40px;
}

.addkey-body {
  text-align: left;
  font-family: var(--font-family-open-sans);
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 40px;
  padding-right: 40px;
}

.addkey-body input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  box-shadow: var(--shadow-color);
  border-radius: 2px;
}

.addkey-body > a {
  text-decoration: none;
  color: var(--light-background-color);
  font-family: var(--font-family-roboto);

}

.addkey-body button {
  color: var(--light-background-color);
  margin-top: 30px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-family: var(--font-family-roboto);
  transition: background-color 0.3s ease;
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
  background-color: var(--button-color);
}
.addkey-body button:hover {
  background-color: var(--button-color-hover);
}

svg.icon {
  display: inline;
  height: 2.5em;
  width: 2.5em;
  vertical-align: text-top;
  fill: currentColor;
}
`;
}