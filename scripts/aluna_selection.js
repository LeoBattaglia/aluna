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
    getTextWidth(row){
        return config.padding + (row.textContent.length * main.getCharAtts().width);
    }

    initListeners(){
        document.addEventListener("mousemove", (e) => {
            let diff_x = main.getEditor().getFrameLeft() - main.getEditor().getEditor().offsetLeft;
            let diff_y = main.getEditor().getFrameTop() - main.getEditor().getEditor().offsetTop;
            let x = e.clientX - main.getEditor().getFrameLeft() + diff_x;
            let y = e.clientY - main.getEditor().getFrameTop() + diff_y - config.padding;
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

    setMaxPosY(pos){
        if(pos.y > main.getEditor().getRowCount() - 1){
            pos.y = main.getEditor().getRowCount()- 1;
        }
        return pos;
    }

    setSelection(posDown, posUp){
        this.removeSelection();
        posDown = this.setMaxPosY(posDown);
        posUp = this.setMaxPosY(posUp);
        let positions = func.sortPos(posDown, posUp);
        let left, row, textWidth, top, width;
        if(posDown.y === posUp.y){
            row = main.getEditor().getRow(posDown.y);
            left = row.offsetLeft + config.padding + (positions.small.x * main.getCharAtts().width);
            textWidth = this.getTextWidth(row);
            if(left <= textWidth){
                top = row.offsetTop + config.lineHeightOffset;
                width = (positions.large.x - positions.small.x) * main.getCharAtts().width;
                width + left > textWidth ? width = textWidth - left : undefined;
                addSelection(row, left, top, width);
            }
        }else{
            for(let i = positions.small.y; i <= positions.large.y; i++){
                row = main.getEditor().getRow(i);
                textWidth = this.getTextWidth(row);
                top = row.offsetTop + config.lineHeightOffset;
                if(i === positions.small.y){
                    left = row.offsetLeft + config.padding + (positions.small.x * main.getCharAtts().width);
                    if(left <= textWidth){
                        width = (row.textContent.length - positions.small.x) * main.getCharAtts().width;
                        width + left > textWidth ? width = textWidth - left : undefined;
                        addSelection(row, left, top, width);
                    }
                }else if(i === positions.large.y){
                    left = row.offsetLeft + config.padding;
                    if(left <= textWidth){
                        width = positions.large.x * main.getCharAtts().width;
                        width + left > textWidth ? width = textWidth - left : undefined;
                        addSelection(row, left, top, width);
                    }
                }else{
                    left = row.offsetLeft + config.padding;
                    if(left <= textWidth){
                        width = row.textContent.length * main.getCharAtts().width;
                        width + left > textWidth ? width = textWidth - left : undefined;
                        addSelection(row, left, top, width);
                    }
                }
            }
        }
        let selections = document.getElementsByClassName("alunaSelection");
        if(selections.length > 0){
            left = selections[0].offsetLeft;
            top = selections[0].offsetTop + 3;
            let pos = main.getMouse().getCharPosition(new Position(left, top), false, false);
            main.getCaret().moveToPosition(new Position(left, top), pos.y);
        }

        //Sub-Functions
        function addSelection(row, left, top, width){
            if(width > 0){
                row.appendChild(func.createSelection(left, top, main.getCharAtts().height - 1, width));
            }
        }
    }
}