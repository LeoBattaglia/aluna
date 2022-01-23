//Imports
import * as config from "./aluna_config.js";
import {Position} from "./aluna_classes.js";

//Classes
export class Caret{
    //Declarations
    caret;
    caretPos;
    editor;
    input;

    //Constructor
    constructor(editor, input){
        this.editor = editor;
        this.input = input;
        this.init();
    }

    //Methods
    init(){
        this.caretPos = new Position(0, 0);
        this.initCSS();
        this.initCaret();
        this.initListeners();
    }

    initCaret(){
        this.caret = document.createElement("textarea");
        this.caret.setAttribute("id", "aluna_caret");
        this.caret.setAttribute("class", "aluna_blinker");
        this.caret.style.background = config.bgCaret;
        this.caret.style.border = "0px none #ffffff";
        this.caret.style.caretColor = "transparent";
        this.caret.style.color = "transparent";
        this.caret.style.height = this.editor.charAtts.fontSize + "px";
        this.caret.style.margin = "0";
        this.caret.style.outline = "none";
        this.caret.style.padding = "0";
        this.caret.style.left = this.editor.getPositionStartLeft() + "px";
        this.caret.style.overflow = "hidden";
        this.caret.style.position = "absolute";
        this.caret.style.resize = "none";
        this.caret.style.top = this.editor.getPositionStartTop() + "px";
        this.caret.style.width = config.caretWidth + "px";
        this.caret.style.zIndex = "3";
        this.editor.getFrame().appendChild(this.caret);
        this.caret.focus();
        this.editor.setActiveRow(0);
    }

    initCSS(){
        let css = ".aluna_blinker {animation: aluna_blinker 1s linear infinite;}\n";
        css += "@keyframes aluna_blinker {25% {opacity: 100;}30% {opacity: 0;}70% {opacity: 0;}75% {opacity: 100;}}\n";
        css += ".alunaLine::selection{background-color:" + config.bgSelection + ";}\n";
        document.getElementById("aluna_style").innerHTML += css;
    }

    initListeners(){
        this.caret.addEventListener("keydown", (e) => {
            this.input.keyDown(e)
        });
        this.caret.addEventListener("keyup", (e) => {
            this.input.keyUp(e)
        });
    }

    moveToPosition(pos, rowNr){
        /*charPos = this.getCharPosition(this.mousePos);
        if(charPos.y > this.editor.getEditor().childElementCount - 1){
            charPos.y = this.editor.getEditor().childElementCount - 1;
        }
        let top = config.padding + (charPos.y * this.editor.charAtts.lineHeight) + 5;
        if(charPos.x > this.editor.getEditor().children[charPos.y].textContent.length){
            charPos.x = this.editor.getEditor().children[charPos.y].textContent.length;
        }
        let left = config.padding + (charPos.x * this.editor.charAtts.width);*/
        //this.caret.style.left = left + "px";
        //this.caret.style.top = top + "px";
        console.log("CCC: " + pos.x + "/" + pos.y);
        this.caret.style.left = pos.x + "px";
        this.caret.style.top = pos.y + "px";
        this.caret.focus();
        this.caretPos = pos;
        this.editor.setActiveRow(rowNr);
    }
}