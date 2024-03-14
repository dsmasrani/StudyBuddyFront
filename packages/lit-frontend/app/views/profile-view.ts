import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import * as App from "../app";
import "../components/user-profile"
import { Profile } from "../models/profile";
import { API } from "../components/api";
@customElement("profile-view")
class UserProfileView extends App.View {
    static styles = css``;

    @property({ type: Object })
    get profile(): Profile | undefined {
        return this.getFromModel<Profile>("profile");
    }
    
    connectedCallback(): void {
        super.connectedCallback();
        API.getUserID().then((id) => {
            this.dispatchMessage({ 
                type: "GetProfile", 
                userId: id ?? ""
            });
        });
    }
  render() {
    return html`
        <user-profile .profile=${this.profile}></user-profile>
    `;
  }
}