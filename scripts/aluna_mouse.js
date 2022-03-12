//Imports
import {Position} from "./aluna_classes.js";
import * as func from "./aluna_functions.js";
import * as config from "./aluna_config.js";
import * as main from "../aluna.js";

//Class
export class Mouse{
    //Declarations
    mousePosDown;
    mousePosUp;
    pressed = false;

    //Constructor
    constructor(){
        this.initListeners();
    }

    //Methods
    clickDown(e){
        if(e.button === 0){
            this.mousePosDown = this.getMousePosition(e);
            main.getSelection().removeSelection();
            //console.log("CCC: " + this.mousePosDown.x + "/" + this.mousePosDown.y)
            let pos = this.getCharPosition(this.mousePosDown, true, true);
            let left = config.padding + (pos.x * main.getCharAtts().width);
            let top = config.padding + (pos.y * main.getCharAtts().lineHeight) + 5;
            //console.log("FFF: " + pos.x + "/" + pos.y + "/" + left + "/" + top)
            main.getCaret().moveToPosition(new Position(left, top), pos.y);
            this.pressed = true;
        }
    }

    clickUp(e){
        if(e.button === 0 && this.pressed){
            this.mousePosUp = this.getMousePosition(e);
            if(!main.getSelection().isSelection(this.mousePosDown, this.mousePosUp)){
                main.getCaret().focus();
            }
            /*if(!main.getSelection().isSelection(this.mousePosDown, this.mousePosUp)){
                let pos = this.getCharPosition(this.mousePosUp, true, true);
                let left = config.padding + (pos.x * main.getCharAtts().width);
                let top = config.padding + (pos.y * main.getCharAtts().lineHeight) + 5;
                main.getCaret().moveToPosition(new Position(left, top), pos.y);
                //main.getScroll().scrollCaret(this.mousePosUp);
            }*/
            this.pressed = false;
        }
    }

    getCharPosition(mousePosition, correctX, correctY){
        let charPosY;
        if(mousePosition.y <= config.padding){
            charPosY = 0;
        }else{
            charPosY = Math.floor((mousePosition.y - config.padding) / main.getCharAtts().lineHeight);
        }
        if(correctY && charPosY > main.getEditor().getRowCount() - 1){
            charPosY = main.getEditor().getRowCount() - 1;
        }
        let charPosX;
        if(mousePosition.x <= config.padding){
            charPosX = 0;
        }else{
            charPosX = Math.round((mousePosition.x - config.padding) / main.getCharAtts().width);
        }
        if(correctX && charPosX > main.getEditor().getChildren()[charPosY].textContent.length){
            charPosX = main.getEditor().getChildren()[charPosY].textContent.length;
        }
        return new Position(charPosX, charPosY);
    }

    getMousePosition(e){
        let diff_x = main.getEditor().getFrameLeft() - main.getEditor().getEditor().offsetLeft;
        let diff_y = main.getEditor().getFrameTop() - main.getEditor().getEditor().offsetTop;
        let x = e.clientX - main.getEditor().getFrameLeft() + diff_x;
        let y = e.clientY - main.getEditor().getFrameTop() + diff_y;
        return new Position(x, y);
    }

    initListeners(){
        main.getEditor().getFrame().addEventListener("mousedown", (e) => {
            this.clickDown(e)
        });
        main.getEditor().getFrame().addEventListener("mouseleave", (e) => {
            this.clickUp(e)
        });
        main.getEditor().getFrame().addEventListener("mouseup", (e) => {
            this.clickUp(e)
        });
        /*document.addEventListener("mouseup", (e) => {
            this.clickUp(e)
        });*/
    }
}