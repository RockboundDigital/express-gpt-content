
import {
    LitElement,
    html,
    customElement,
    TemplateResult,
    property,
    query,
    PropertyValues,
  } from "lit-element";
  import "@spectrum-web-components/dialog/sp-dialog.js";
  import '@spectrum-web-components/dialog/sp-dialog-wrapper.js';
  import "@spectrum-web-components/button/sp-button.js";
  import "@spectrum-web-components/overlay/overlay-trigger.js";
  import { Dialog } from "@spectrum-web-components/dialog";
  
  @customElement("main-modal")
  export default class MainModal extends LitElement {
    @property({ type: Boolean })
    open = false;
  
    @query("sp-dialog-wrapper", true)
    dialog!: Dialog;

  
    handleOverlayClosed() {
      this.open = false;
      console.log('closed');
    }
  
    protected render(): TemplateResult {
      return html`
        <overlay-trigger type="modal">
            <sp-dialog-wrapper
                slot="click-content"
                headline="Dialog title"
                mode="fullscreen"
                confirm-label="Keep Both"
                secondary-label="Replace"
                cancel-label="Cancel"
                footer="Content for footer"
            >
                Content of the dialog
            </sp-dialog-wrapper>
            <sp-button 
                slot="trigger"
            >
                Toggle
            </sp-button>
        </overlay-trigger>
        
      `;
    }
    updated(changed: PropertyValues) {
      super.updated(changed);
      if (changed.has("open")) {
        if (this.open) {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              this.open = true;
            });
          });
        } else {
          this.open = false;
        }
      }
    }
  }
  


//   <sp-dialog
//               size="medium"
//               dismissable
//               @close=${this.handleOverlayClosed}
//             >
//               <h2 slot="heading">Disclaimer</h2>
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               <sp-button @click=${(_)=> {
//                 this.dialog.dispatchEvent(new Event('close', {bubbles: true, composed: true, cancelable: true}))
//               }}>Close</sp-button>
//             </sp-dialog>