//Imports
import * as config from "./aluna_config.js";
import * as func from "./aluna_functions.js";

//Classes
export class Caret{
    //Declarations
    caret;
    caretPos;
    charAtts;
    frames;
    mousePos;
    mousePosDown;

    //Constructor
    constructor(charAtts, frames){
        this.charAtts = charAtts;
        this.frames = frames;
        this.init();
    }

    //Methods
    clickDown(e){
        if(e.button === 0){
            this.removeSelection();
            this.mousePosDown = this.getMousePosition(e);
        }
    }

    clickUp(e){
        if(e.button === 0){
            //this.removeSelection();
            this.mousePos = this.getMousePosition(e);
            //console.log("CLICK: " + charPos.x + "/" + charPos.y + " || " + this.mousePosDown.x + "/" + this.mousePosDown.y);
            if(this.isSelection()){
                this.setSelection();
            }
            this.moveToPosition();
        }
    }

    getCharPosition(mousePosition){
        let charPosX;
        if(mousePosition.x <= config.padding){
            charPosX = 0;
        }else{
            charPosX = Math.round((mousePosition.x - config.padding) / this.charAtts.width);
        }
        let charPosY;
        if(mousePosition.y <= config.padding){
            charPosY = 0;
        }else{
            charPosY = Math.floor((mousePosition.y - config.padding) / this.charAtts.lineHeight);
        }
        return new Position(charPosX, charPosY);
    }

    getMousePosition(e){
        return new Position((e.clientX - this.frames.frmEditor.offsetLeft), (e.clientY - this.frames.frmEditor.offsetTop));
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
        this.caret.style.background = config.bgCaret;
        this.caret.style.border = "0px none #ffffff";
        this.caret.style.caretColor = "transparent";
        this.caret.style.color = "transparent";
        this.caret.style.height = this.charAtts.fontSize + "px";
        this.caret.style.margin = "0";
        this.caret.style.outline = "none";
        this.caret.style.padding = "0";
        this.caret.style.left = this.frames.editor.offsetLeft + config.padding + "px";
        this.caret.style.overflow = "hidden";
        this.caret.style.position = "absolute";
        this.caret.style.resize = "none";
        this.caret.style.top = (this.frames.editor.offsetTop + config.padding + 5) + "px";
        this.caret.style.width = config.caretWidth + "px";
        this.caret.style.zIndex = "3";
        this.frames.frmEditor.appendChild(this.caret);
        this.caret.focus();
        this.setActiveRow(0);
    }

    initCSS(){
        let css = ".aluna_blinker {animation: aluna_blinker 1s linear infinite;}\n";
        css += "@keyframes aluna_blinker {25% {opacity: 100;}30% {opacity: 0;}70% {opacity: 0;}75% {opacity: 100;}}\n";
        css += ".alunaLine::selection{background-color:" + config.bgSelection + ";}\n";
        //css += ".alunaLine::moz-selection{background-color:" + config.bgSelection + ";}\n";

            //::selection {
            //   color: red;
            //   background: yellow;
            // }
        //css += ".aluna_selection{background-color: " + config.bgSelection + ";}\n";
        document.getElementById("aluna_style").innerHTML += css;
    }

    initListeners(){
        this.frames.editor.addEventListener("mousedown", (e) => {
            this.clickDown(e)
        });
        this.frames.editor.addEventListener("mouseup", (e) => {
            this.clickUp(e)
        });
        this.caret.addEventListener("keydown", (e) => {
            this.keyDown(e)
        });
        this.caret.addEventListener("keyup", (e) => {
            this.keyUp(e)
        });
    }

    isSelection(){
        let pos = func.sortInts(this.mousePos.x, this.mousePosDown.x);
        if(pos.large - pos.small < this.charAtts.width / 2){
            pos = func.sortInts(this.mousePos.y, this.mousePosDown.y);
            if(pos.large - pos.small < this.charAtts.lineHeight / 2){
                return false;
            }
        }
        return true;
    }

    keyDown(e){
        console.log("keyDown: " + e.key);

        //TODO: All

    }

    keyUp(e){
        console.log("keyUp: " + e.key);

        //TODO: All

    }

    moveToPosition(){
        let charPos = this.getCharPosition(this.mousePos);
        if(charPos.y > this.frames.editor.childElementCount - 1){
            charPos.y = this.frames.editor.childElementCount - 1;
        }
        let top = config.padding + (charPos.y * this.charAtts.lineHeight) + 5;
        if(charPos.x > this.frames.editor.children[charPos.y].textContent.length){
            charPos.x = this.frames.editor.children[charPos.y].textContent.length;
        }
        let left = config.padding + (charPos.x * this.charAtts.width);
        this.caret.style.left = left + "px";
        this.caret.style.top = top + "px";
        this.caret.focus();
        this.caretPos = new Position(left, top);
        this.setActiveRow(charPos.y);
    }

    removeSelectedContent(){

        //TODO: Remove selected Content

    }

    removeSelection(){
        let elements = document.getElementsByClassName("alunaSelection");
        while(elements[0]){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    setActiveRow(rowNr){
        if(document.getElementById("aluna_row_active") !== null){
            document.getElementById("aluna_row_active").remove();
        }
        this.frames.frmEditor.appendChild(func.createActiveRow(this.frames.editor, rowNr, this.charAtts));
    }

    setSelection(){
        let posDown = this.getCharPosition(this.mousePosDown);
        let posUp = this.getCharPosition(this.mousePos);
        if(posUp.y > this.frames.editor.childElementCount - 1){
            posUp.y = this.frames.editor.childElementCount - 1;
        }
        let positions = func.sortPos(posDown, posUp);
        let left, top, width;
        console.log("CCC: " + posDown.x + "/" + posDown.y + " || " + posUp.x + "/" + posUp.y);
        if(posDown.y === posUp.y){
            let line = this.frames.editor.children[posDown.y];
            left = line.offsetLeft + config.padding + (positions.small.x * this.charAtts.width);
            top = line.offsetTop + config.lineHeightOffset;
            width = (positions.large.x - positions.small.x) * this.charAtts.width;
            this.frames.frmEditor.appendChild(func.createSelection(left, top, this.charAtts.height - 1, width));
        }else{
            for(let i = positions.small.y; i <= positions.large.y; i++){
                let line = this.frames.editor.children[i];
                if(i === positions.small.y){
                    left = line.offsetLeft + config.padding + (positions.small.x * this.charAtts.width);
                    top = line.offsetTop + config.lineHeightOffset;
                    width = (line.textContent.length - positions.small.x) * this.charAtts.width;
                }else if(i === positions.large.y){
                    left = line.offsetLeft + config.padding;
                    top = line.offsetTop + config.lineHeightOffset;
                    width = positions.large.x * this.charAtts.width;
                }else{
                    left = line.offsetLeft + config.padding;
                    top = line.offsetTop + (i * config.lineHeightOffset);
                    width = line.textContent.length * this.charAtts.width;
                }
                this.frames.frmEditor.appendChild(func.createSelection(left, top, this.charAtts.height - 1, width));
            }
        }
    }
}

/*export class Functions{
    //Declarations
    click;
    keyDown;
    keyUp;
    select;

    //Constructor
    constructor(click, keyDown, keyUp, select){
        this.click = click;
        this.keyDown = keyDown;
        this.keyUp = keyUp;
        this.select = select;
    }
}*/

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