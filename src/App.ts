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

@customElement("add-on-app")
export class App extends LitElement {
    @property({ type: Object })
    addOnUISdk!: AddOnSDKAPI;

    static get styles() {
        return style;
    }

    render() {
        // Please note that the below "<sp-theme>" component does not react to theme changes in Express.
        // You may use "this.addOnUISdk.app.ui.theme" to get the current theme and react accordingly.

        //https://developer.adobe.com/express/add-ons/docs/guides/develop/use_cases/#modal-dialogs
        console.log(this)
        return html` <sp-theme theme="express" color="light" scale="medium" class="app">
            <main-modal></main-modal>
            <div class="container">
                <invoke-button class="w-full"></invoke-button>
            </div>
            <div class="container bottom-0 absolute">
                <settings-accordion></settings-accordion>
            </div>
        </sp-theme>`;
    }
}