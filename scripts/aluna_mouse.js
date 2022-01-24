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

    //Constructor
    constructor(){
        this.initListeners();
    }

    //Methods
    clickDown(e){
        if(e.button === 0){
            this.mousePosDown = this.getMousePosition(e);
            main.getSelection().removeSelection();
        }
    }

    clickUp(e){
        if(e.button === 0){
            this.mousePosUp = this.getMousePosition(e);
            //console.log("CLICK: " + charPos.x + "/" + charPos.y + " || " + this.mousePosDown.x + "/" + this.mousePosDown.y);
            if(this.isSelection()){
                main.getSelection().setSelection(this.getCharPosition(this.mousePosDown), this.getCharPosition(this.mousePosUp));
            }
            let pos = this.getCharPosition(this.mousePosUp, true, true);
            let left = config.padding + (pos.x * main.getCharAtts().width);
            let top = config.padding + (pos.y * main.getCharAtts().lineHeight) + 5;
            main.getCaret().moveToPosition(new Position(left, top), pos.y);
        }
    }

    getCharPosition(mousePosition, correctX, correctY){
        let charPosY;
        if(mousePosition.y <= config.padding){
            charPosY = 0;
        }else{
            charPosY = Math.floor((mousePosition.y - config.padding) / main.getCharAtts().lineHeight);
        }
        if(correctY && charPosY > main.getEditor().getEditor().childElementCount - 1){
            charPosY = main.getEditor().getEditor().childElementCount - 1;
        }
        let charPosX;
        if(mousePosition.x <= config.padding){
            charPosX = 0;
        }else{
            charPosX = Math.round((mousePosition.x - config.padding) / main.getCharAtts().width);
        }
        if(correctX && charPosX > main.getEditor().getEditor().children[charPosY].textContent.length){
            charPosX = main.getEditor().getEditor().children[charPosY].textContent.length;
        }
        return new Position(charPosX, charPosY);
    }

    getMousePosition(e){
        return new Position((e.clientX - main.getEditor().getFrame().offsetLeft), (e.clientY - main.getEditor().getFrame().offsetTop));
    }

    initListeners(){
        main.getEditor().getFrame().addEventListener("mousedown", (e) => {
            this.clickDown(e)
        });
        main.getEditor().getFrame().addEventListener("mouseup", (e) => {
            this.clickUp(e)
        });
    }

    isSelection(){
        let pos = func.sortInts(this.mousePosUp.x, this.mousePosDown.x);
        if(pos.large - pos.small < main.getCharAtts().width / 2){
            pos = func.sortInts(this.mousePosUp.y, this.mousePosDown.y);
            if(pos.large - pos.small < main.getCharAtts().lineHeight / 2){
                return false;
            }
        }
        return true;
    }
}