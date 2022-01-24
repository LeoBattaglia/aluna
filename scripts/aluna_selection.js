//Imports
import * as func from "./aluna_functions.js";
import * as config from "./aluna_config.js";
import * as main from "../aluna.js";

//Class
export class Selection{
    //Constructor
    constructor(){}

    //Methods
    removeSelection(){
        let elements = document.getElementsByClassName("alunaSelection");
        while(elements[0]){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    setSelection(posDown, posUp){
        if(posUp.y > main.getEditor().getEditor().childElementCount - 1){
            posUp.y = main.getEditor().getEditor().childElementCount - 1;
        }
        let positions = func.sortPos(posDown, posUp);
        let left, top, width;
        //console.log("Selection: " + posDown.x + "/" + posDown.y + " || " + posUp.x + "/" + posUp.y);
        if(posDown.y === posUp.y){
            let line = main.getEditor().getEditor().children[posDown.y];
            left = line.offsetLeft + config.padding + (positions.small.x * main.getCharAtts().width);
            top = line.offsetTop + config.lineHeightOffset;
            width = (positions.large.x - positions.small.x) * main.getCharAtts().width;
            main.getEditor().getFrame().appendChild(func.createSelection(left, top, main.getCharAtts().height - 1, width));
        }else{
            for(let i = positions.small.y; i <= positions.large.y; i++){
                let line = main.getEditor().getEditor().children[i];
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
    }
}