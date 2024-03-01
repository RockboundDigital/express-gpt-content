
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { style } from "../App.css";

import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/field-label/sp-field-label.js';

import { FieldLabel } from '@spectrum-web-components/field-label';
import { Textfield } from '@spectrum-web-components/textfield';


@customElement("prompt-input")
export class PromptInput extends LitElement {
    // @property({ type: Object })
    // addOnUISdk!: AddOnSDKAPI;

    // @state()
    // private _buttonLabel = "Click me";

    // static get styles() {
    //     return style;
    // }

    // private _handleClick() {
    //     this._buttonLabel = "Clicked";
    // }

    render() {
        // Please note that the below "<sp-theme>" component does not react to theme changes in Express.
        // You may use "this.addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        return html`
            <sp-field-label for="story-0-m">Input</sp-field-label>
            <sp-textfield
                id="story-0-m"
                multiline
                placeholder="Enter a prompt to generate content"
            ></sp-textfield>
        `;
    }
}
