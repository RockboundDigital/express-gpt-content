// To support: theme="express" scale="medium" color="light"
// import these spectrum web components modules:
import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/scale-medium.js";
import "@spectrum-web-components/theme/theme-light.js";

// To learn more about using "spectrum web components" visit:
// https://opensource.adobe.com/spectrum-web-components/
import "@spectrum-web-components/button/sp-button.js";
import "@spectrum-web-components/theme/sp-theme.js";

import { LitElement, html, adoptStyles, CSSResultOrNative } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { style } from "./App.css";

import { AddOnSDKAPI } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

import "./components/settings-accordion";
// import "./components/prompt-input";
import "./components/invoke-button";
import "./MainModal";
import MainModal from "./MainModal";

@customElement("add-on-app")
export class App extends LitElement {
    @property({ type: Object })
    addOnUISdk!: AddOnSDKAPI;

    static get styles() {
        return style;
    }

    @query("main-modal")
    _modal!: MainModal;

    @state()
    private _buttonLabel = "Insert Content";

    private _handleClick() {
        this._modal.showCustomDialog();
    }

    render() {
        console.log(this)
        return html` <sp-theme theme="express" color="light" scale="medium" class="app">
            <main-modal></main-modal>
            <div class="container">
                <sp-button size="m" @click=${this._handleClick}>${this._buttonLabel}</sp-button>
            </div>
            <div class="container bottom-0 absolute">
                <settings-accordion></settings-accordion>
            </div>
        </sp-theme>`;
    }
}