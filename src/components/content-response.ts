
import { css } from "lit";
import { customElement } from "lit/decorators.js";

import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/field-label/sp-field-label.js';

import { Textfield } from '@spectrum-web-components/textfield';

@customElement("content-response")
export class PromptInput extends Textfield {
    //https://lit.dev/docs/components/styles/
    static get styles() {
        return [
            Textfield.styles,
            css `
                #textfield > textarea.input { 
                    height: 20rem;
                    border: none;
                    resize: none;

                }
            `
                    // background-color: var(--spectrum-disabled-content-color);

        ]
    } 

    render() {
        return super.render();
    }
}
