//Imports
import {Position} from "./aluna_classes.js";
import * as config from "./aluna_config.js";
import * as func from "./aluna_functions.js";
import * as main from "../aluna.js";

//Class
export class Selection{
    //Constructor
    constructor(){
        this.initListeners();
    }

    //Methods
    initListeners(){
        document.addEventListener("mousemove", (e) => {
            let x = e.clientX - main.getEditor().getFrame().offsetLeft;
            let y = e.clientY - main.getEditor().getFrame().offsetTop - config.padding;
            //console.log("SSS: " + x + "/" + y)
            let pos = new Position(x, y);
            if(main.getMouse().pressed && this.isSelection(main.getMouse().mousePosDown, pos)){
                //console.log("FFF: " + main.getMouse().mousePosDown.x + "/" + main.getMouse().mousePosDown.y + " || " + pos.x + "/" + pos.y)
                this.setSelection(main.getMouse().getCharPosition(main.getMouse().mousePosDown), main.getMouse().getCharPosition(pos));
            }
        });
    }

    isSelection(mousePosDown, mousePosUp){
        if(mousePosDown === undefined){
            return false
        }
        let pos = func.sortInts(mousePosUp.x, mousePosDown.x);
        if(pos.large - pos.small < main.getCharAtts().width / 2){
            pos = func.sortInts(mousePosUp.y, mousePosDown.y);
            if(pos.large - pos.small < main.getCharAtts().lineHeight / 2){
                return false;
            }
        }
        return true;
    }

    removeSelection(){
        let elements = document.getElementsByClassName("alunaSelection");
        while(elements[0]){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    setSelection(posDown, posUp){
        //this.removeSelection();
        if(posDown.y > main.getEditor().getRowCount() - 1){
            posDown.y = main.getEditor().getRowCount()- 1;
        }
        if(posUp.y > main.getEditor().getRowCount() - 1){
            posUp.y = main.getEditor().getRowCount()- 1;
        }
        let positions = func.sortPos(posDown, posUp);
        let left, top, width;
        //console.log("Selection: " + posDown.x + "/" + posDown.y + " || " + posUp.x + "/" + posUp.y);
        if(posDown.y === posUp.y){
            let line = main.getEditor().getChildren()[posDown.y];
            left = line.offsetLeft + config.padding + (positions.small.x * main.getCharAtts().width);
            top = line.offsetTop + config.lineHeightOffset;
            width = (positions.large.x - positions.small.x) * main.getCharAtts().width;
            main.getEditor().getFrame().appendChild(func.createSelection(left, top, main.getCharAtts().height - 1, width));
        }else{
            for(let i = positions.small.y; i <= positions.large.y; i++){
                //console.log("BBB: " + i + "/" + positions.small.y + "/" + positions.large.y + "/" + posUp.y)
                let line = main.getEditor().getChildren()[i];
                if(i === positions.small.y){
                    left = line.offsetLeft + config.padding + (positions.small.x * main.getCharAtts().width);
                    top = line.offsetTop + config.lineHeightOffset;
                    width = (line.textContent.length - positions.small.x) * main.getCharAtts().width;
                }else if(i === positions.large.y){
                    left = line.offsetLeft + config.padding;
                    top = line.offsetTop + config.lineHeightOffset;
                    width = positions.large.x * main.getCharAtts().width;
                }else{
                    left = line.offsetLeft + config.padding;
                    top = line.offsetTop + (i * config.lineHeightOffset);
                    width = line.textContent.length * main.getCharAtts().width;
                }
                main.getEditor().getFrame().appendChild(func.createSelection(left, top, main.getCharAtts().height - 1, width));
            }
        }
        //main.getCaret().moveToPosition(positions.small, positions.small.y);
    }
}