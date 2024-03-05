import "@spectrum-web-components/theme/express/scale-medium.js";
import "@spectrum-web-components/theme/express/theme-light.js";
import "@spectrum-web-components/theme/scale-medium.js";
import "@spectrum-web-components/theme/theme-light.js";

import "@spectrum-web-components/button/sp-button.js";
import '@spectrum-web-components/divider/sp-divider.js';
import "@spectrum-web-components/theme/sp-theme.js";

import { LitElement, html } from "lit";
import { customElement, query, } from "lit/decorators.js";
import { style } from "./App.css";

import "./components/settings-accordion";
import "./components/invoke-button";
import "./MainModal";
import MainModal from "./MainModal";

@customElement("add-on-app")
export class App extends LitElement {
    static get styles() {
        return style;
    }

    @query("main-modal")
    _modal!: MainModal;

    private async _handleClick() {
        this._modal.showCustomDialog();
    }

    render() {
        console.log(this)

        return html` <sp-theme theme="express" color="light" scale="medium" class="app">
            <main-modal></main-modal>
            <div class="container mb-1">
                <h2 class="spectrum-Heading spectrum-Heading--sizeS">Generate Content</h2>
                <sp-divider size="s"></sp-divider>
                <p class="spectrum-Body spectrum-Body--sizeS w-full help-text">
                    Use this add-on to generate content for documents, social media posts, newsletters, etc. and easily insert it into your Express assets.
                </p>
                <sp-button size="m" @click=${this._handleClick}>Add Content</sp-button>
            </div>
            <div class="container bottom-0 absolute">
                <settings-accordion></settings-accordion>
            </div>
        </sp-theme>`;
    }
}