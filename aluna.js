//Imports
import * as caretObject from "./scripts/aluna_caret.js";
import * as editorObject from "./scripts/aluna_editor.js";
import * as framesObject from "./scripts/aluna_frames.js";
import * as func from "./scripts/aluna_functions.js";
import * as inputObject from "./scripts/aluna_input.js";
import * as mouseObject from "./scripts/aluna_mouse.js";
import * as scrollObject from "./scripts/aluna_scrollbars.js";
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
        this.editor = new editorObject.Editor(this.frames, this.charAtts);
        this.input = new inputObject.Input(this.editor);
        this.caret = new caretObject.Caret(this.editor, this.input);
        this.selection = new selectionObject.Selection(this.editor);
        this.mouse = new mouseObject.Mouse(this.editor, this.caret, this.selection);
        this.scroll = new scrollObject.ScrollBars(this.editor);
    }
}

//Start
let e = new Editor();
window.onload = () => {
    e.onLoad();
};