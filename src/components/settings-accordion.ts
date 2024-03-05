import '@spectrum-web-components/accordion/sp-accordion.js';
import '@spectrum-web-components/accordion/sp-accordion-item.js';
import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/field-label/sp-field-label.js';

import { LitElement, html, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";

import addOnUISdk, { ClientStorage } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";


@customElement("settings-accordion")
export class Settings extends LitElement {

    store: ClientStorage;

    @state()
    private _apiKey= "";

    private async _saveSettings() {
        this._apiKey = (this.shadowRoot?.querySelector('#api-key') as HTMLInputElement).value;

        await this.store.setItem('apiKey', this._apiKey);
        console.log('Saved settings.');
    }

    async getSetting(setting: string): Promise<string | null> {
        return await this.store.getItem(setting) as unknown as string ?? null;
    }

    render() {
        addOnUISdk.ready.then(async () => {
            this.store = addOnUISdk.instance.clientStorage;
            this._apiKey = await this.getSetting('apiKey') ?? "";
        })

        // Please note that the below "<sp-theme>" component does not react to theme changes in Express.
        // You may use "this.addOnUISdk.app.ui.theme" to get the current theme and react accordingly.
        return html`<sp-accordion>
                        <sp-accordion-item 
                            label="Settings"
                            open
                        >
                            <sp-field-label size="m" for="api-key">OpenAI API Key</sp-field-label>
                            <sp-textfield
                                id="api-key"
                                size="m"
                                type="password"
                                placeholder="Enter your API Key"
                                @change=${this._saveSettings}
                                value="${this._apiKey}"
                                invalid="${this._apiKey.length < 1 || nothing}"
                                valid="${this._apiKey.length > 1 || nothing}"
                            ></sp-textfield>
                        </sp-accordion-item>
                    </sp-accordion>`;
    }
}
