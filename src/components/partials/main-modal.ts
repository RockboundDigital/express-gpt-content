
import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { css } from "lit";
import { until } from "lit/directives/until.js";


import addOnUISdk from "https://new.express.adobe.com/static/add-on-sdk/sdk.js";
import { InputDialogOptions } from "@adobe/ccweb-add-on-sdk-types/iframe-ui";

  
  @customElement("main-modal")
  export default class MainModal extends LitElement {

    @state()
    private _isAddOnUISdkReady = addOnUISdk.ready;

    render() {
      return html`
          ${until(
              this._isAddOnUISdkReady.then(() => {
                console.log("ready");
                (async function showConfirmDialog() {
                  try {
                      // Confirmation Dialog Example
                      let dialogOptions = {
                          variant: "confirmation",
                          title: "Enable smart Filters",
                          description: "Smart filters are nondestructive and will preserve your original images.",
                          buttonLabels: { primary: "Enable", cancel: "Cancel" },
                      };    
                      const result = await addOnUISdk.app.showModalDialog(dialogOptions as InputDialogOptions);
                      console.log("Button type clicked " + result.buttonType); 
                  } catch (error) {
                      console.log("Error showing modal dialog:", error);
                  }
                }())
              })
          )}
      `;
  }

}