import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor } from "express-document-sdk";

// Get the Authoring Sandbox.
const { runtime } = addOnSandboxSdk.instance;

function start() {
  // APIs to be exposed to the UI runtime
  runtime.exposeApi({

    addText(text: string) {

      const insertionParent = editor.context.insertionParent;

      const current = editor.context.selection[0]

      console.log("Add text", current);
      const textElement = editor.createText();
      textElement.text = text;
      //@ts-ignore
      textElement.translation = { x: insertionParent.width / 2 , y: insertionParent.height / 2 };
      textElement.textAlignment = 2;
      insertionParent.children.append(textElement);
    },
  });
}

start();