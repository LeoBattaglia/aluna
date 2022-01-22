//Imports
import * as EditorObject from "./aluna_editor.js";
import * as framesObject from "./aluna_frames.js";
import * as func from "./aluna_functions.js";

//Class
class Editor{
    //Declarations
    charAtts;
    editor;
    frames;

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
        this.editor = new EditorObject.Editor(this.frames);
    }
}

//Start
let e = new Editor();
window.onload = () => {
    e.onLoad();
};