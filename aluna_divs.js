//Imports
import * as config from "./aluna_config.js";

//Class
export class Divs{
    //Declarations
    frmMain;
    frmLineNumbers;

    //Constructor
    constructor(){
        this.init();
    }

    //Methods
    createDiv(id){
        let div = document.createElement("div");
        div.setAttribute("id", id);
        return div;
    }

    init(){
        this.initFrameMain();
        this.initFrameLineNumbers();

        //TODO: Initialize all Divs

    }

    initFrameLineNumbers(){
        let div = this.createDiv("alunaFrameLineNumbers");
        div.style.backgroundColor = config.bgLineNumbers;
        div.style.width = "100%";
        this.frmMain.appendChild(div);
    }

    initFrameMain(){
        let div = document.getElementById("aluna");
        div.style.display = "flex";
        div.style.flexDirection = "row";
        div.style.width = "100%";
        this.frmMain = div;
    }
}