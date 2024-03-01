
import { css } from "lit";
import { customElement } from "lit/decorators.js";

import '@spectrum-web-components/textfield/sp-textfield.js';
import '@spectrum-web-components/field-label/sp-field-label.js';

import { Textfield } from '@spectrum-web-components/textfield';

@customElement("prompt-input")
export class PromptInput extends Textfield {
    //https://lit.dev/docs/components/styles/
    static get styles() {
        return [
            Textfield.styles,
            css `
                textarea.input { height: 10rem; }
            `
        ]
    } 

    render() {
        return super.render();
    }
}
