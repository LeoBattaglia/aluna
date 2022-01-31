//Imports
import * as caretObject from "./scripts/aluna_caret.js";
import * as editorObject from "./scripts/aluna_editor.js";
import * as framesObject from "./scripts/aluna_frames.js";
import * as func from "./scripts/aluna_functions.js";
import * as inputObject from "./scripts/aluna_input.js";
import * as mouseObject from "./scripts/aluna_mouse.js";
import * as scrollObject from "./scripts/aluna_scroll.js";
import * as selectionObject from "./scripts/aluna_selection.js";

//Class
class Editor{
    //Declarations
    caret;
    charAtts;
    editor;
    frames;
    input;
    mouse;
    scroll;
    selection;

    //Constructor
    constructor(){
        func.initCSS();
        this.charAtts = func.getCharAtts();
        this.frames = new framesObject.Frames(this.charAtts);
        func.initListeners(this.frames);
    }

    //Methods
    onLoad(){
        this.charAtts = func.getCharAtts();
        this.frames.resetData(this.charAtts);
        this.editor = new editorObject.Editor();
        this.input = new inputObject.Input();
        this.caret = new caretObject.Caret();
        this.selection = new selectionObject.Selection();
        this.mouse = new mouseObject.Mouse();
        this.scroll = new scrollObject.ScrollBars();


        this.editor.addRow("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        this.editor.addRow("ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        this.editor.addRow("ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-1");
    }
}

//Start
let e = new Editor();
window.onload = () => {
    e.onLoad();
};

//Functions
export function getCaret(){
    return e.caret;
}

export function getCharAtts(){
    return e.charAtts;
}

export function getEditor(){
    return e.editor;
}

export function getFrames(){
    return e.frames;
}

export function getInput(){
    return e.input;
}

export function getMouse(){
    return e.mouse;
}

export function getScroll(){
    return e.scroll;
}

export function getSelection(){
    return e.selection;
}