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
            this.pressed = true;
        }
    }

    clickUp(e){
        if(e.button === 0){
            this.mousePosUp = this.getMousePosition(e);
            let pos;
            if(main.getSelection().isSelection(this.mousePosDown, this.mousePosUp)){
                let positions = func.sortPos(this.mousePosDown, this.mousePosUp);
                pos = this.getCharPosition(positions.small, true, true);
            }else{
                pos = this.getCharPosition(this.mousePosUp, true, true);
            }
            let left = config.padding + (pos.x * main.getCharAtts().width);
            let top = config.padding + (pos.y * main.getCharAtts().lineHeight) + 5;
            main.getCaret().moveToPosition(new Position(left, top), pos.y);
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
        return new Position((e.clientX - main.getEditor().getFrameLeft()), (e.clientY - main.getEditor().getFrameTop()));
    }

    initListeners(){
        main.getEditor().getFrame().addEventListener("mousedown", (e) => {
            this.clickDown(e)
        });
        main.getEditor().getFrame().addEventListener("mouseup", (e) => {
            this.clickUp(e)
        });
    }
}