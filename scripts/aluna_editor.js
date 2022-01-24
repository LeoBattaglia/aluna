//Import
import * as config from "./aluna_config.js";
import * as func from "./aluna_functions.js";
import * as main from "../aluna.js";

//Classes
export class Editor{
    //Constructor
    constructor(){}

    //Methods
    addRow(content){
        let line = func.createLine(content);
        main.getFrames().editor.appendChild(line);
        this.resetRowNumbers();
    }

    getEditor(){
        return main.getFrames().editor;
    }

    getFrame(){
        return main.getFrames().frmEditor;
    }

    getPositionStartLeft(){
        return main.getFrames().editor.offsetLeft + config.padding;
    }

    getPositionStartTop(){
        return main.getFrames().editor.offsetTop + config.padding + 5
    }

    removeRowNumbers(){
        let elements = document.getElementsByClassName("alunaLineNumber");
        while(elements[0]){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    removeSelectedContent(){

        //TODO: Remove selected Content

    }

    resetRowNumbers(){
        this.removeRowNumbers();
        for(let i = 0; i < main.getFrames().editor.childElementCount; i++){
            main.getFrames().frmLineNumbers.appendChild(func.createLineNumber(i + 1));
        }
    }

    setActiveRow(rowNr){
        //console.log("FFF: " + rowNr)
        if(document.getElementById("aluna_row_active") !== null){
            document.getElementById("aluna_row_active").remove();
        }
        main.getFrames().frmEditor.appendChild(func.createActiveRow(main.getFrames().editor, rowNr, main.getCharAtts()));
    }
}