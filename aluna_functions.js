//Imports
import * as config from "./aluna_config.js";

//Functions
export function getCharAtts(){
    let div = document.getElementById("aluna");
    div.innerHTML = "<span>A</span>";
    let atts = {
        height: div.children[0].offsetHeight,
        fontSize: (div.children[0].offsetHeight - 5),
        lineHeight: (div.children[0].offsetHeight + config.lineHeightOffset),
        width: div.children[0].offsetWidth
    };
    //alert("DDD: " + atts.height + "/" + atts.fontSize + "/" + atts.lineHeight + "/" + atts.width);
    div.innerHTML = "";
    return atts;
}

export function importFont(){
    let style = document.createElement("style");
    style.innerHTML = "@font-face{font-family: \"Aluna\"; src: url(\"SourceCodePro-Regular.ttf\");}";
    document.head.appendChild(style);
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