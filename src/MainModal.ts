
import { LitElement, html } from "lit";
import { customElement, state } from "lit/decorators.js";
import { until } from "lit/directives/until.js";

import addOnUISdk, { CustomDialogOptions, Variant } from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";

import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/field-label/sp-field-label.js';

import { style } from "./App.css";

import './components/main-modal-body'

@customElement("main-modal")
export default class MainModal extends LitElement {

  @state()
  private _isAddOnUISdkReady = addOnUISdk.ready;

  static get styles() {
    return style;
  }

  render() {
    return html`
          ${until(
      this._isAddOnUISdkReady.then(() => {
        console.log("ready");
        (async function showCustomDialog() {
          try {
            const dialogResult = await addOnUISdk.app.showModalDialog({
              variant: Variant.custom,
              title: "Content Generation",
              src: "main-modal.html",
              size: {
                //TODO CORS issues accessing parent
                // width: window.parent.innerWidth,
                // height: window.parent.innerHeight
                width: 1800,
                height: 1600
              },

            });

            // // Use data received from the custom dialog
            useCustomDialogResult(dialogResult.result);

          } catch (error) {
            console.log("Error showing modal dialog:", error);
          }
        }())
      })
    )}
      `;
  }

}

function useCustomDialogResult(result: unknown) {
  console.log(result);
}

