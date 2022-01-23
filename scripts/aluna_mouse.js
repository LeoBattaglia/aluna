//Imports
import {Position} from "./aluna_classes.js";
import * as func from "./aluna_functions.js";
import * as config from "./aluna_config.js";

//Class
export class Mouse{
    //Declarations
    caret;
    editor;
    mousePosDown;
    mousePosUp;
    selection;

    //Constructor
    constructor(editor, caret, selection){
        this.caret = caret;
        this.editor = editor;
        this.selection = selection;
        this.initListeners();
    }

    //Methods
    clickDown(e){
        if(e.button === 0){
            this.mousePosDown = this.getMousePosition(e);
            this.selection.removeSelection();
        }
    }

    clickUp(e){
        if(e.button === 0){
            this.mousePosUp = this.getMousePosition(e);
            //console.log("CLICK: " + charPos.x + "/" + charPos.y + " || " + this.mousePosDown.x + "/" + this.mousePosDown.y);
            if(this.isSelection()){
                this.selection.setSelection(this.getCharPosition(this.mousePosDown), this.getCharPosition(this.mousePosUp));
            }
            let pos = this.getCharPosition(this.mousePosUp, true, true);
            let left = config.padding + (pos.x * this.editor.charAtts.width);
            let top = config.padding + (pos.y * this.editor.charAtts.lineHeight) + 5;
            this.caret.moveToPosition(new Position(left, top), pos.y);
        }
    }

    getCharPosition(mousePosition, correctX, correctY){
        let charPosY;
        if(mousePosition.y <= config.padding){
            charPosY = 0;
        }else{
            charPosY = Math.floor((mousePosition.y - config.padding) / this.editor.charAtts.lineHeight);
        }
        if(correctY && charPosY > this.editor.getEditor().childElementCount - 1){
            charPosY = this.editor.getEditor().childElementCount - 1;
        }
        let charPosX;
        if(mousePosition.x <= config.padding){
            charPosX = 0;
        }else{
            charPosX = Math.round((mousePosition.x - config.padding) / this.editor.charAtts.width);
        }
        if(correctX && charPosX > this.editor.getEditor().children[charPosY].textContent.length){
            charPosX = this.editor.getEditor().children[charPosY].textContent.length;
        }
        return new Position(charPosX, charPosY);
    }

    getMousePosition(e){
        return new Position((e.clientX - this.editor.getFrame().offsetLeft), (e.clientY - this.editor.getFrame().offsetTop));
    }

    initListeners(){
        this.editor.getFrame().addEventListener("mousedown", (e) => {
            this.clickDown(e)
        });
        this.editor.getFrame().addEventListener("mouseup", (e) => {
            this.clickUp(e)
        });
    }

    isSelection(){
        let pos = func.sortInts(this.mousePosUp.x, this.mousePosDown.x);
        if(pos.large - pos.small < this.editor.charAtts.width / 2){
            pos = func.sortInts(this.mousePosUp.y, this.mousePosDown.y);
            if(pos.large - pos.small < this.editor.charAtts.lineHeight / 2){
                return false;
            }
        }
        return true;
    }
}