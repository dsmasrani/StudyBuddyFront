// src/edit-profiles.ts
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Profile } from "./profile";
import { serverPath } from "./root";

@customElement("user-profile-edit")
export class UserProfileEditElement extends LitElement {
    @property({reflect: true, type: String})
    path: string = "";

    @state()
    profile?: Profile;

    success: string = "";
    render() {
    return html`
    <div class="addkey-body">
      <form @submit=${this._handleSubmit}>
        <label for="openapikey">OpenAPI Key:</label>
        <input type="text" id="openai_key" name="openai_key"><br><br>
        <label for="lname">Pinecone API Key:</label>
        <input type="text" id="pinecone_key" name="pinecone_key"><br><br>
        <label for="lname">Pinecone environment:</label>
        <input type="text" id="pinecone_env" name="pinecone_env"><br><br>
        <label for="lname">Pinecone Index:</label>
        <input type="text" id="index_name" name="index_name"><br><br>
        <button type="submit">Submit</button>
        ${this.success !== "" ? html`<p class="success">${this.success}</p>` : ''}
      </form> 
    </div>`;
    }

  static styles = css`
  .success{
    background-color: #dff0d8;
    color: #3c763d;
    border: 1px solid #d6e9c6;
    padding: 10px;
    border-radius: 5px;
    background-color: green;
    color: white;
  }
  
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

`;

  _handleSubmit(ev: Event) {
    ev.preventDefault(); // prevent browser from submitting form data itself

    const target = ev.target as HTMLFormElement;
    const formdata = new FormData(target);
    const entries = Array.from(formdata.entries())
      .map(([k, v]) => (v === "" ? [k] : [k, v]))
    const json = Object.fromEntries(entries);
    console.log(json)
    this._putData(json);
  }

  _putData(json: Profile) {
    console.log(serverPath(this.path))
    fetch(serverPath(this.path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201){
          this.success="Values updated successfully";
          return response.json();
        } else {
          return null;
        }
      })
      .then((json: unknown) => {
        if (json) this.profile = json as Profile;
      })
      .catch((err) =>
        console.log("Failed to PUT form data", err)
      );
  }
}