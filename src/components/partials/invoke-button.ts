import "@spectrum-web-components/button/sp-button.js";

import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";


import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";


@customElement("invoke-button")
export class InvokeButton extends LitElement {
    @property({ type: Object })
    addOnUISdk!: AddOnSDKAPI;

    @state()
    private _buttonLabel = "Send Prompt";

    private _handleClick() {
        this._buttonLabel = "Loading...";
    }

    render() {
        // Please note that the below "<sp-theme>" component does not react to theme changes in Express.
        // You may use "this.addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        console.log(this)
        return html`<sp-button size="m" @click=${this._handleClick}>${this._buttonLabel}</sp-button>`;
    }
}