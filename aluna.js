//Imports
import * as caretObject from "./aluna_caret.js";
import * as framesObject from "./aluna_frames.js";
import * as func from "./aluna_functions.js";

//Class
class Editor{
    //Declarations
    caret;
    charAtts;
    frames;

    //Constructor
    constructor(){
        func.importFont();
        this.charAtts = func.getCharAtts();
        this.frames = new framesObject.Frames(this.charAtts);
        this.caret = new caretObject.Caret(this.charAtts, this.frames.frmEditor);
    }

    //Methods

    //TODO: All

}

//Start
let e;
e = new Editor();