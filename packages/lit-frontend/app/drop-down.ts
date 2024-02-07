import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

// const toggleSwitch = 
//     document.querySelector('.theme-slider input[type="checkbox"]'); 

function toggle() {
    const body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('dark_mode')) {
        body.classList.remove('dark_mode');
    } else {
        body.classList.add('dark_mode');
    }
}
    // toggleSwitch.addEventListener('change', toggle, false);

@customElement("drop-down")
class DropDownElement extends LitElement {
    @property({ reflect: true, type: Boolean })
    open: boolean = false;

    getLoggedInCookie() {
        let name = "loggedIn=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length) === 'true';
            }
        }
        return false; // Default to not logged in
    }
    
    setLoggedInCookie(loggedIn) {
        const d = new Date();
        d.setTime(d.getTime() + (7*24*60*60*1000)); // Expires in 7 days
        let expires = "expires="+ d.toUTCString();
        document.cookie = "loggedIn=" + loggedIn + ";" + expires + ";path=/";
    }
    loggedIn = this.getLoggedInCookie();

    render() {
        const dynamicName = "Dev Masrani"; // Replace "Dynamic Name" with your variable that holds the updated name
        let menuItems;
        if (this.loggedIn) {
            menuItems = html`
                <li name="box"><a href="profile.html">${dynamicName}</a></li>
                <li name="box"><a href="addkey.html">Change Keys</a></li>
                <li name="box" @click="${this.setLoggedInCookie(false)}"><a href="index.html">Log Out</a></li>
            `;
        } else {
            menuItems = html`
                <li name="box"><a href="chat.html">Log In</a></li>
            `;
        }
        const toggleMode = () => {
            this.mode = "hello";
            toggle();
        }
        return html`
            <input
                type="checkbox"
                id="is-shown"
                @change=${this._handleChange}
                .checked=${this.open}
            />
            <label for="is-shown">
                <slot>Profile</slot>
            </label>
            <slot name="menu">
                <ul>
                    ${menuItems}
                    <span class="theme-switch-container" @change=${toggleMode}>
                        <a name="box" style="padding-top: 20px">Dark Mode: &nbsp</a>
                        <label class="theme-slider" for="checkbox"> 
                            
                            <input type="checkbox" id="checkbox" />
                            <div class="round slider"></div> 
                        </label>
                    </span>
                </ul>
            </slot>
        `;
    }

    static styles = css`
        :host {
            display: flex;
            position: relative;
            font-family: var(--font-family-roboto);
            color: var(--secondary-color);
            margin-left: 20px;
            margin-right: 20px;
            margin-top: 20px;
        }

        #is-shown {
            display: none;
        }

        label {
            cursor: pointer;
            text-decoration: none;
            line-height: 1.0;
        }

        a {
            text-decoration: none;
            color: inherit;
        }

        slot[name="menu"] {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            border: 1px solid;
            background: var(--light-background-color);
            text-decoration: none;
        }

        li:hover{
            background: #C8C8C8;
        }
        li:hover,
        #is-shown:hover ~ slot[name="menu"] {
            display: block;
        }

        #is-shown:checked ~ slot[name="menu"] {
            display: block;
        }

        /* CSS for slotted elements and default slot content */

        ::slotted(ul[slot="menu"]),
        slot[name="menu"] > ul {
            margin: 0;
            padding: 0.25em;
            list-style: none;
            white-space: nowrap;
        }

        .theme-switch-container {
            display: flex;
            justify-content: center; 
            align-items: center;
            margin-top: -20px;
        } 
          
        .theme-slider {
            display: inline-block; 
            height: 34px; 
            position: relative; 
            width: 60px; 
            margin-top: 20px;
        } 
          
        .theme-slider input { 
            display: none; 
        } 
          
        .slider { 
            background-color: #ccc; 
            bottom: 0; 
            cursor: pointer; 
            left: 0; 
            position: absolute; 
            right: 0; 
            top: 0; 
            transition: .4s; 
        } 
          
        .slider:before { 
            background-color: #fff; 
            bottom: 4px; 
            content: ""; 
            height: 26px; 
            left: 4px; 
            position: absolute; 
            transition: .4s; 
            width: 26px; 
        } 
          
        input:checked+.slider { 
            background-color: #66bb6a; 
        } 
          
        input:checked+.slider:before { 
            transform: translateX(26px); 
        } 
          
        .slider.round { 
            border-radius: 34px; 
        } 
          
        .slider.round:before { 
            border-radius: 50%; 
        }
    `;

    _handleChange(ev: InputEvent) {
        const target = ev.target;
        this._toggle(target?.checked);
    }

    _toggle(open) {
        this.open = open;
        this._toggleClickAway(open);
    }

    _toggleClickAway(open) {
        const clickawayHandler = (ev) => {
            if (!ev.composedPath().includes(this)) {
                this._toggle(false);
            } else {
                ev.stopPropagation();
            }
        };

        if (open) {
            document.addEventListener("click", clickawayHandler);
        } else {
            document.removeEventListener("click", clickawayHandler);
        }
    }
}