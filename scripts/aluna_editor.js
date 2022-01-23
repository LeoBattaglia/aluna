//Import
import * as config from "./aluna_config.js";
import * as func from "./aluna_functions.js";

//Classes
export class Editor{
    //Declarations
    charAtts;
    frames;

    //Constructor
    constructor(frames, charAtts){
        this.frames = frames;
        this.charAtts = charAtts;
        this.addRow("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        this.addRow("ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        this.addRow("ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-ABCDEFGHIJKLMNOPQRSTUVWXYZ-1");
    }

    //Methods
    addRow(content){
        let line = func.createLine(content);
        this.frames.editor.appendChild(line);
        this.resetRowNumbers();
    }

    getEditor(){
        return this.frames.editor;
    }

    getFrame(){
        return this.frames.frmEditor;
    }

    getPositionStartLeft(){
        return this.frames.editor.offsetLeft + config.padding;
    }

    getPositionStartTop(){
        return this.frames.editor.offsetTop + config.padding + 5
    }

    removeSelectedContent(){

        //TODO: Remove selected Content

    }

    resetRowNumbers(){

        //TODO: All

    }

    setActiveRow(rowNr){
        //console.log("FFF: " + rowNr)
        if(document.getElementById("aluna_row_active") !== null){
            document.getElementById("aluna_row_active").remove();
        }
        this.frames.frmEditor.appendChild(func.createActiveRow(this.frames.editor, rowNr, this.charAtts));
    }
}