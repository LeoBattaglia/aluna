//Imports
import * as config from "./aluna_config.js";

//Functions
export function createActiveRow(editor, rowNr, charAtts, addToMain){
    let div = createDiv("alunaRowActive");
    div.style.backgroundColor = config.bgRowActive;
    div.style.height = charAtts.lineHeight + "px";
    if(addToMain){
        div.style.left = editor.offsetLeft + "px";
    }else{
        div.style.left = "0px";
    }
    div.style.position = "absolute";
    div.style.top = (config.padding + (rowNr * charAtts.lineHeight)) + "px";
    div.style.maxWidth = editor.offsetWidth + "px";
    div.style.width = "100%";
    //div.style.width = editor.offsetWidth + "px";
    div.style.zIndex = "0";
    return div;
}

export function createContent(content, rowHeight){
    let div = document.createElement("div");
    div.setAttribute("class", "alunaContent");
    div.style.height = rowHeight + "px";
    div.style.position = "relative";
    div.style.zIndex = "2";
    div.innerHTML = content;
    return div;
}

export function createDiv(id){
    let div = document.createElement("div");
    div.setAttribute("id", id);
    return div;
}

export function createRow(content, rowHeight){
    let div = document.createElement("div");
    div.setAttribute("class", "alunaRow");
    div.style.paddingLeft = config.padding + "px";
    div.style.paddingRight = config.padding + "px";
    div.style.whiteSpace = "pre";
    div.appendChild(createContent(content, rowHeight));
    return div;
}

export function createRowNumber(nr){
    let div = document.createElement("div");
    div.setAttribute("class", "alunaRowNumber");
    div.style.marginLeft = config.padding + "px";
    div.style.marginRight = config.padding + "px";
    div.style.textAlign = "right";
    div.innerHTML = nr;
    return div;
}

export function createScrollbar(id){
    let div = createDiv(id);
    div.style.backgroundColor = config.bgScrollbar;
    div.style.borderRadius = config.scrollbarSize + "px";
    div.style.cursor = "pointer";
    div.style.position = "relative";
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
    return {
        height: config.fontSize + 5,
        fontSize: config.fontSize,
        lineHeight: (config.fontSize + 5 + config.lineHeightOffset),
        width: width
    };
}

/*function getCssStyle(element, att) {
    return window.getComputedStyle(element, null).getPropertyValue(att);
}*/

/*export function getLongestRowLength(rows){
    let max = 0;
    for(let i = 0; i < rows.length; i++){
        //console.log("VVV: " + rows[i].textContent + " :: " + rows[i].textContent.length);
        if(rows[i].textContent.length > max){
            max = rows[i].textContent.length;
        }
    }
    return max;
}*/

export function initCSS(){
    let style = document.createElement("style");
    style.setAttribute("id", "alunaStyle");
    style.innerHTML = "@font-face{font-family: \"Aluna\"; src: url(\"SourceCodePro-Regular.ttf\");}\n";
    document.head.appendChild(style);
}

export function initListeners(frames){
    window.addEventListener("resize", () => {frames.resetSizes()});
}

/*export function maxNumber(nr, max){
    if(nr > max){
        nr = max;
    }
    return nr;
}*/

export function maxMinNumber(nr, min, max){
    if(nr < min){
        nr = min;
    }
    if(nr > max){
        nr = max;
    }
    return nr;
}

/*export function minNumber(nr, min){
    if(nr < min){
        nr = min;
    }
    return nr;
}*/

export function removeElement(id){
    if(document.getElementById(id) !== null){
        document.getElementById(id).remove();
    }
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

export function setSizes(element, height, width){
    element.style.height = height + "px";
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
            large: pos2,
            forward: true
        }
    }else{
        if(pos1.y > pos2.y){
            return {
                small: pos2,
                large: pos1,
                forward: false
            }
        }else{
            if(pos1.x < pos2.x){
                return {
                    small: pos1,
                    large: pos2,
                    forward: true
                }
            }else{
                return {
                    small: pos2,
                    large: pos1,
                    forward: false
                }
            }
        }
    }
}