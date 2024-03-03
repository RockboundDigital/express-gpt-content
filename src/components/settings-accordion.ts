import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/field-label/sp-field-label.js';

import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { style } from "../App.css";

import addOnUISdk, { AddOnSDKAPI, ClientStorage } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

import { Accordion, AccordionItem } from '@spectrum-web-components/accordion';
import { AddOnUISdkTypes } from '@adobe/ccweb-add-on-sdk-types';

@customElement("settings-accordion")
export class Settings extends LitElement {

    store: ClientStorage;

    // @state()
    // private _buttonLabel = "Click me";

    // static get styles() {
    //     return style;
    // }

    // private _handleClick() {
    //     this._buttonLabel = "Clicked";
    // }

    private async _saveSettings() {
        const apiKey = (this.shadowRoot?.querySelector('#api-key') as HTMLInputElement).value;

        await this.store.setItem('apiKey', apiKey);
        console.log('Saved settings.');
    }

    render() {

        addOnUISdk.ready.then(async () => {
            this.store = addOnUISdk.instance.clientStorage;
        })

        // Please note that the below "<sp-theme>" component does not react to theme changes in Express.
        // You may use "this.addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        return html`<sp-accordion>
                        <sp-accordion-item label="Settings">
                            <sp-field-label size="m" for="api-key">OpenAI API Key</sp-field-label>
                            <sp-textfield
                                id="api-key"
                                size="m"
                                type="password"
                                placeholder="Enter your API Key"
                                @change=${this._saveSettings}
                            ></sp-textfield>
                        </sp-accordion-item>
                    </sp-accordion>`;
    }
}
