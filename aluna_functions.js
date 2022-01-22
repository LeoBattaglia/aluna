//Imports
import * as config from "./aluna_config.js";

//Functions
export function createActiveRow(editor, rowNr, charAtts){
    let div = createDiv("aluna_row_active");
    div.style.backgroundColor = config.bgRowActive;
    div.style.height = charAtts.lineHeight + "px";
    div.style.left = editor.offsetLeft + "px";
    div.style.position = "absolute";
    div.style.top = (config.padding + (rowNr * charAtts.lineHeight)) + "px";
    div.style.maxWidth = editor.offsetWidth + "px";
    div.style.width = "100%";
    //div.style.width = editor.offsetWidth + "px";
    div.style.zIndex = "0";
    return div;
}

export function createDiv(id){
    let div = document.createElement("div");
    div.setAttribute("id", id);
    return div;
}

export function createLine(content){
    let div = document.createElement("div");
    div.setAttribute("class", "alunaLine");
    //div.style.backgroundColor = config.bgLineActive;
    div.style.paddingLeft = config.padding + "px";
    div.style.paddingRight = config.padding + "px";
    div.style.whiteSpace = "pre";
    div.style.zIndex = "2";
    /*if(content === undefined || content === null || content === ""){
        content = " ";
    }*/
    div.innerHTML = content;
    return div;
}

export function createLineNumber(nr){
    let div = document.createElement("div");
    div.setAttribute("class", "alunaLineNumber");
    //div.style.backgroundColor = "pink";
    div.style.marginLeft = config.padding + "px";
    div.style.marginRight = config.padding + "px";
    div.style.textAlign = "right";
    div.innerHTML = nr;
    return div;
}

export function createSelection(left, top, height, width){
    let div = document.createElement("div");
    div.setAttribute("class", "alunaSelection");
    div.style.backgroundColor = config.bgSelection;
    div.style.height = height + "px";
    div.style.left = left + "px";
    div.style.position = "absolute";
    div.style.top = top + "px";
    div.style.width = width + "px";
    div.style.zIndex = "1";
    return div;
}

export function getCharAtts(){
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    context.font = "normal " + config.fontSize + "px Aluna";
    let {width} = context.measureText("A");
    let atts = {
        height: config.fontSize + 5,
        fontSize: config.fontSize,
        lineHeight: (config.fontSize + 5 + config.lineHeightOffset),
        width: width
    };
    return atts;
}

function getCssStyle(element, att) {
    return window.getComputedStyle(element, null).getPropertyValue(att);
}

export function initCSS(){
    let style = document.createElement("style");
    style.setAttribute("id", "aluna_style");
    style.innerHTML = "@font-face{font-family: \"Aluna\"; src: url(\"SourceCodePro-Regular.ttf\");}\n";
    document.head.appendChild(style);
}

export function initListeners(frames){
    window.addEventListener("resize", () => {frames.resetSizes()});
}

export function setAllHeights(element, height){
    element.style.height = height + "px";
    element.style.maxHeight = height + "px";
    element.style.minHeight = height + "px";
    return element;
}

export function setAllWidths(element, width){
    element.style.maxWidth = width + "px";
    element.style.minWidth = width + "px";
    element.style.width = width + "px";
    return element;
}

export function sortInts(val1, val2){
    if(val1 < val2){
        return {
            small: val1,
            large: val2
        }
    }else{
        return {
            small: val2,
            large: val1
        }
    }
}

export function sortPos(pos1, pos2){
    if(pos1.y < pos2.y){
        return {
            small: pos1,
            large: pos2
        }
    }else{
        if(pos1.y > pos2.y){
            return {
                small: pos2,
                large: pos1
            }
        }else{
            if(pos1.x < pos2.x){
                return {
                    small: pos1,
                    large: pos2
                }
            }else{
                return {
                    small: pos2,
                    large: pos1
                }
            }
        }
    }
}