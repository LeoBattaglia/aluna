//Import
import * as caretObject from "./aluna_caret.js";
import * as func from "./aluna_functions.js";

//Classes
export class Editor{
    //Declarations
    caret;
    charAtts;
    frames;

    //Constructor
    constructor(frames){
        this.charAtts = frames.charAtts;
        this.frames = frames;
        this.caret = new caretObject.Caret(frames.charAtts, frames);
        this.addLine("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        this.addLine("ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        this.addLine("ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    }

    //Methods
    addLine(content){
        let line = func.createLine(content);
        this.frames.editor.appendChild(line);
    }
}