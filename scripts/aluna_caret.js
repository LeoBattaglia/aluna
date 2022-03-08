//Imports
import {Position} from "./aluna_classes.js";
import * as config from "./aluna_config.js";
import * as main from "../aluna.js";

//Classes
export class Caret{
    //Declarations
    caret;
    caretPos;

    //Constructor
    constructor(){
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
        this.caret.setAttribute("id", "alunaCaret");
        this.caret.setAttribute("class", "alunaBlinker");
        this.caret.style.background = config.bgCaret;
        this.caret.style.border = "0px none #ffffff";
        this.caret.style.caretColor = "transparent";
        this.caret.style.color = "transparent";
        this.caret.style.height = main.getCharAtts().fontSize + "px";
        this.caret.style.margin = "0";
        this.caret.style.outline = "none";
        this.caret.style.padding = "0";
        this.caret.style.left = main.getEditor().getPositionStartLeft() + "px";
        this.caret.style.overflow = "hidden";
        this.caret.style.position = "absolute";
        this.caret.style.resize = "none";
        this.caret.style.top = main.getEditor().getPositionStartTop() + "px";
        this.caret.style.width = config.caretWidth + "px";
        this.caret.style.zIndex = "3";
        main.getEditor().getFrame().appendChild(this.caret);
        this.caret.focus();
        main.getEditor().setActiveRow(0);
    }

    initCSS(){
        let css = ".alunaBlinker {animation: alunaBlinker 1s linear infinite;}\n";
        css += "@keyframes alunaBlinker {25% {opacity: 100;}30% {opacity: 0;}70% {opacity: 0;}75% {opacity: 100;}}\n";
        css += ".alunaLine::selection{background-color:" + config.bgSelection + ";}\n";
        document.getElementById("alunaStyle").innerHTML += css;
    }

    initListeners(){
        this.caret.addEventListener("keydown", (e) => {
            main.getInput().keyDown(e);
        });
        this.caret.addEventListener("keyup", (e) => {
            main.getInput().keyUp(e);
        });
    }

    moveToPosition(pos, rowNr){
        main.getScroll().scrollCaret(pos);
        if(this.caret !== null){
            this.caret.remove();
        }
        main.getFrames().editor.children[rowNr].appendChild(this.caret);
        this.caret.style.left = pos.x + "px";
        this.caret.style.top = pos.y + "px";
        this.caret.focus();
        this.caretPos = pos;
        main.getEditor().setActiveRow(rowNr);
    }
}