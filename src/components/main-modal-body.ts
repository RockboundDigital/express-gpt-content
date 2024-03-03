
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

import "@spectrum-web-components/button/sp-button.js";
import '@spectrum-web-components/field-label/sp-field-label.js';
import './prompt-input'
import './content-response'

import { style } from "../App.css";

import OpenAI from 'openai';
import addOnUISdk, { ClientStorage } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

@customElement("main-modal-body")
export default class MainModalBody extends LitElement {

    static get styles() {
        return [
            style,
            css `
                .prompt-button{
                    width: 10%;
                }
            `
        
        ];
    }

    store: ClientStorage;
    openai: OpenAI;

    @state()
    private _buttonLabel = "Send Prompt";

    private async _handleClick() {
        this._buttonLabel = "Loading...";

        const chatCompletion = await this.openai.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'gpt-3.5-turbo',
        });

        console.log(chatCompletion.choices[0].message.content);
    }

    render() {
        console.log(this)

        addOnUISdk.ready.then(async () => {
            this.store = addOnUISdk.instance.clientStorage;

            this.store.getItem('apiKey').then((result) => {
                if (result) {
                    this.openai = new OpenAI({
                        apiKey: result as string,
                        dangerouslyAllowBrowser: true
                    })
                } else {
                    console.error('No API key found. Please enter one in the settings.');
                }
            })
        })

        return html`<sp-theme theme="express" color="light" scale="medium" class="flex flex-wrap">
                        <sp-field-label for="content-reponse" size="l">Generated Content</sp-field-label>
                        <content-response
                            class="w-full mb-2"
                            size="l"
                            id="content-reponse"
                            multiline
                            disabled
                        ></content-response>
                        <div class="self-end w-full">
                            <sp-field-label for="prompt-input" size="l">Prompt Input</sp-field-label>
                            <prompt-input 
                                class="w-full mb-2"
                                size="l"
                                id="prompt-input"
                                multiline
                                placeholder="Enter a prompt to generate content"
                            ></prompt-input>
                            <sp-button size="m" class="prompt-button" @click=${this._handleClick}>${this._buttonLabel}</sp-button>
                        </div>
                    </sp-theme>`;
    }

}
