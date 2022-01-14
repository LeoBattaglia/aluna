//Imports
import * as config from "./aluna_config.js";
import * as func from "./aluna_functions.js";

//Classes
export class Caret{
    //Declarations
    caret;
    caretPos;
    charAtts;
    editor;
    mousePos;
    mousePosDown;

    //Constructor
    constructor(charAtts, editor){
        this.charAtts = charAtts;
        this.editor = editor;
        this.init();
    }

    //Methods
    clickDown(e){
        this.mousePosDown = this.getMousePosition(e);
    }

    clickUp(e){
        this.mousePos = this.getMousePosition(e);
        //alert("CLICK: " + this.mousePos.x + "/" + this.mousePos.y + " || " + this.mousePosDown.x + "/" + this.mousePosDown.y);
        if(this.isSelection()){

            //TODO: Selection

        }else{

            //TODO: Click

        }
    }

    getMousePosition(e){
        return new Position((e.clientX - this.editor.offsetLeft), (e.clientY - this.editor.offsetTop));
    }

    init(){
        this.caretPos = new Position(0, 0);
        this.mousePos = new Position(0, 0);
        this.mousePosDown = new Position(0, 0);
        this.initCSS();
        this.initCaret();
        this.initListeners();
    }

    initCaret(){
        this.caret = document.createElement("textarea");
        this.caret.setAttribute("id", "aluna_caret");
        this.caret.setAttribute("class", "aluna_blinker");

        //alert("DDD: " + this.charAtts.width + "/" + this.charAtts.height);

        this.caret.style.background = config.fgEditor;
        //this.caret.style.background = "transparent";
        this.caret.style.border = "0px none #ffffff";
        //this.caret.style.caretColor = config.fgEditor;
        this.caret.style.color = "transparent";
        this.caret.style.height = this.charAtts.fontSize + "px";
        this.caret.style.margin = "0";
        this.caret.style.outline = "none";
        this.caret.style.padding = "0";
        this.caret.style.left = this.editor.offsetLeft + config.padding + "px";
        this.caret.style.position = "absolute";
        this.caret.style.resize = "none";
        this.caret.style.textAlign = "right";
        this.caret.style.top = (this.editor.offsetTop + config.padding + 5) + "px";
        this.caret.style.width = "1px";
        this.editor.appendChild(this.caret);

        //TODO: All

    }

    initCSS(){
        let css = ".aluna_blinker {animation: aluna_blinker 1s linear infinite;}\n";
        css += "@keyframes aluna_blinker {25% {opacity: 100;}30% {opacity: 0;}70% {opacity: 0;}75% {opacity: 100;}}";
        let style = document.createElement("style");
        style.innerHTML = css;
        document.head.appendChild(style);

        //TODO: All

    }

    initListeners(){
        this.editor.addEventListener("mousedown", (e) => {
            this.clickDown(e)
        });
        this.editor.addEventListener("mouseup", (e) => {
            this.clickUp(e)
        });
    }

    isSelection(){
        let pos = func.sortInts(this.mousePos.x, this.mousePosDown.x);
        if(pos.large - pos.small > this.charAtts.width / 2){
            pos = func.sortInts(this.mousePos.x, this.mousePosDown.x);
            if(pos.large - pos.small > this.charAtts.lineHeight / 2){
                return true;
            }
        }
        return false;
    }
}

export class Position{
    //Declarations
    x;
    y;

    //Constructor
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}