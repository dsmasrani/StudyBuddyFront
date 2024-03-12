import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createClient } from '@supabase/supabase-js'
import { Oauth, updateOauth } from "./global";
const supabaseUrl = 'https://jazhnnpcpkklxhxdlprw.supabase.co'
const supabseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphemhubnBjcGtrbHhoeGRscHJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwOTUwMjcsImV4cCI6MjAxMjY3MTAyN30.0yYa_VFJoouSTex7uot0jL4xWuBLV6c99WBFk2J7zN4'

@customElement("google-sso")
class GoogleSSO extends LitElement {
    constructor() {
        super();
        this.loginWithGoogle = this.loginWithGoogle.bind(this);
    }
    
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('click', this.loginWithGoogle);
    }
    
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('click', this.loginWithGoogle);
    }
    
    supabase = createClient(supabaseUrl, supabseKey)

    setLoggedInCookie(loggedIn) {
        const d = new Date();
        d.setTime(d.getTime() + (7*24*60*60*1000)); // Expires in 7 days
        let expires = "expires="+ d.toUTCString();
        document.cookie = "loggedIn=" + loggedIn + ";" + expires + ";path=/";
    }

    async loginWithGoogle() {
        console.log('loginWithGoogle')
        updateOauth(true);
        console.log('Oauth', Oauth);
        const { data, error } = await this.supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:5173/app/chat.html'
            }
        });
        console.log(data);
        // Make data a global variable
        this.setLoggedInCookie(true)
    }
    async logout() {
        const { error } = await this.supabase.auth.signOut()
    }
    
    render() {
        return html`        
        <button class="google-login-button">
            <img src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" alt="Google logo" />
        Login with Google
        </button>
        `;
    }

    static styles = css`
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
    `;
}