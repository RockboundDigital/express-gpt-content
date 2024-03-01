
import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

import "@spectrum-web-components/button/sp-button.js";
import '@spectrum-web-components/field-label/sp-field-label.js';
import './prompt-input'

import { style } from "../App.css";


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

    @state()
    private _buttonLabel = "Send Prompt";

    private _handleClick() {
        this._buttonLabel = "Loading...";
    }

    render() {
        console.log(this)

        return html`<sp-theme theme="express" color="light" scale="medium" class="app">
                    <sp-field-label for="story-0-m" size="l">Prompt Input</sp-field-label>
                    <prompt-input 
                        class="w-full h-50 mb-2"
                        size="l"
                        id="story-0-m"
                        multiline
                        placeholder="Enter a prompt to generate content"
                    ></prompt-input>
                    <sp-button size="m" class="prompt-button" @click=${this._handleClick}>${this._buttonLabel}</sp-button>
                </sp-theme>`;
    }

}
