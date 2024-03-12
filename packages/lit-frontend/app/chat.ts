// src/user-profiles.ts
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Profile } from "./profile";
import { serverPath } from "./root";
import { API } from "./api";
@customElement("chat-gpt")
export class ChatGPT extends LitElement {
    @property({ type: Array })
    messages: string[] = [];

    @property({ type: Boolean})
    isPending = false;

    @property({ type: String })
    prompt = "";

    @property({ type: Number})
    dots = 0;

    async getSession(){
        var { data, error } = await supabase.auth.getSession()
        return data
    }
    render() {
        // fill this in later
        return html`
            <div class="chat-box">
            <div class="chat-context" id="chat-data">
            ${
                this.messages.map((message, ind) => {
                    return html`<p class="chat-msg ${ind%2 === 0? 'user-msg': 'api-msg'}">${message}</p>`;
                })
            }
            ${
                this.isPending ? html`<p class="chat-msg api-msg">Loading ${'.'.repeat(this.dots)}</p>` : ''
            }
            </div>
            <div class="chat-input">
            <input type="text" id="textInput" name="textInput" class="msg-input" .value=${this.prompt} @input=${this.updatePrompt}/>
            <button type="button" class="msg-send" ?disabled="${this.isPending}" @click=${this.query}>Send</button>
            </div>
            </div>
            `;
    }

    dotHandler() {
        if (this.isPending) {
            this.dots = (this.dots + 1) % 3;
            setTimeout(() => this.dotHandler(), 1000);
        } else {
            this.dots = 0;
        }
    }

    query(e) {
        
        e.preventDefault();
        this.messages = [...this.messages, this.prompt];
        
        this.isPending = true;
        this.dotHandler();
        API.chat(this.prompt, (response) => this.handleResponse(response))
        this.prompt = '';
    }

    handleResponse(response) {
        console.log(response);
        this.isPending = false;
        this.messages = [...this.messages, response.answer + "Sources: " + response.sources];
        var objDiv = this.shadowRoot.getElementById("chat-data") as HTMLElement;
        objDiv.scrollTo(0, objDiv.scrollHeight);
    }

    updatePrompt(e) {
        this.prompt = e.target.value;
    }

    handleSubmit(e) {
        e.preventDefault();
        const input = ''
    }

    static styles = css`
        .user-msg {
            background-color: blue;
            align-self: flex-end;
        }
        .api-msg {
            background-color: green;
            align-self: flex-start;
        }
        .chat-box {
            padding: 20px;
            margin: 20px;
            border: 1px solid #f1f1f1;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .msg-input {
            width: 80%;
            height: 32px;;
            border-radius: 10px;
        }
        .msg-send {
            width: 20%;
            height: 32px;
            padding: 0;
            margin: 0;
            border-radius: 10px;
        }
        .chat-msg {
            max-width: 80%;
            width: fit-content;
            border-radius: 10px;
            padding: 10px;
            color: white;
        }
        .chat-context {
            height: 80vh;
            width: 90vw;
            overflow-y: scroll;
            display: flex;
            flex-direction: column;
        }
        .chat-input {
            width: 90vw;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    `;
}