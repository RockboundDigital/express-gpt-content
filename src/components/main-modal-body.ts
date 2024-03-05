
import { LitElement, html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";

import "@spectrum-web-components/button/sp-button.js";
import '@spectrum-web-components/button-group/sp-button-group.js';
import '@spectrum-web-components/field-label/sp-field-label.js';
import './prompt-input'
import './content-response'
import { Settings } from "./settings-accordion";


import { style } from "../App.css";

import OpenAI from 'openai';
import addOnUISdk, { ClientStorage, RuntimeType } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { editor } from "express-document-sdk";

@customElement("main-modal-body")
export default class MainModalBody extends LitElement {

    static get styles() {
        return [
            style,
            css `
                .modal-button {
                    --pending-delay: 0ms;
                }
            `
        
        ];
    }

    store: ClientStorage;
    sandboxProxy;
    openai: OpenAI;

    @state()
    private _isInvoking = false;

    @state()
    private _isInserting = false;

    @state()
    private _contentResponse = "";

    @state()
    private _promptValue = "";

    private setPromptValue() {
        const textValue = (this.shadowRoot?.querySelector('#prompt-input') as HTMLInputElement).value;
        if (textValue) {
            this._promptValue = textValue;
        }
    }

    private async _sendPrompt() {
        this._isInvoking = true;

        try {
            const chatCompletion = await this.openai.chat.completions.create({
                messages: [{ role: 'user', content: this._promptValue }],
                model: 'gpt-3.5-turbo',
            });
    
            this._contentResponse = chatCompletion.choices[0].message.content;
        } 
        finally {
            this._isInvoking = false;
        }        
    }

    private async _addToDoc() {
        this._isInserting = true;

        try {
            //TODO We can't do this here, we'll have to return the value to app on dialog close to insert

            addOnUISdk.instance.runtime.dialog.close({
                action: "insert",
                data: this._contentResponse
            });
        } 
        finally {
            this._isInserting = false; 

        } 
    }

    render() {
        console.log(this)

        addOnUISdk.ready.then(async () => {
            this.store = addOnUISdk.instance.clientStorage;

            //TODO use Settings
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
                            value=${this._contentResponse}
                        ></content-response>
                        <div class="self-end w-full">
                            <sp-field-label for="prompt-input" size="l">Prompt Input</sp-field-label>
                            <prompt-input 
                                class="w-full mb-2"
                                size="l"
                                id="prompt-input"
                                multiline
                                placeholder="Enter a prompt to generate content"
                                @input=${this.setPromptValue}
                            ></prompt-input>
                            <sp-button-group>
                                <sp-button size="m" class="modal-button" pending="${this._isInvoking || nothing}" @click=${this._sendPrompt}>${this._isInvoking ? 'Loading...' : 'Send Prompt' }</sp-button>
                                <sp-button size="m" class="modal-button" variant="secondary" pending="${this._isInserting|| nothing}" @click=${this._addToDoc}>${this._isInserting ? 'Loading...' : 'Add to Document' }</sp-button>
                            </sp-button-group>
                        </div>
                    </sp-theme>`;
    }

}
