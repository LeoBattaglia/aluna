//Imports
import * as config from "./aluna_config.js";

//Class
export class Frames{
    //Declarations
    charAtts;
    frmEditor;
    frmHorizontal;
    frmMain;
    frmLineNumbers;
    frmScrollbarHorizontal;
    frmScrollbarHorizontalOut;
    frmScrollbarVertical;
    frmVertical;
    verticalSpacer;

    //Constructor
    constructor(charAtts){
        this.charAtts = charAtts;
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
        this.initHorizontalSpacer();
        this.initFrameVertical();
        this.initFrameHorizontal();
        this.initFrameScrollbarHorizontalOut();
        this.initFrameScrollbarHorizontal();
        this.initFrameScrollbarSpacer();
        this.initFrameEditor();
        this.initFrameScrollbarVertical();
    }

    initFrameEditor(){
        let div = this.createDiv("alunaFrameEditor");
        div.style.backgroundColor = config.bgEditor;
        div.style.color = config.fgEditor;
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.height = "100%";
        div.style.width = "100%";
        this.frmEditor = div;
        this.frmHorizontal.appendChild(div);
    }

    initFrameHorizontal(){
        let div = this.createDiv("alunaFrameHorizontal");
        div.style.display = "flex";
        div.style.flexDirection = "row";
        div.style.height = "100%";
        div.style.width = "100%";
        this.frmHorizontal = div;
        this.frmVertical.appendChild(div);
    }

    initFrameLineNumbers(){
        let div = this.createDiv("alunaFrameLineNumbers");
        div.style.backgroundColor = config.bgLineNumbers;
        let width = (2 * config.padding) + (config.lineNumbersChars * this.charAtts.width);
        div = this.setAllWidths(div, width);
        this.frmLineNumbers = div;
        this.frmMain.appendChild(div);
    }

    initFrameMain(){
        let div = document.getElementById("aluna");
        div.style.display = "flex";
        div.style.flexDirection = "row";
        div.style.fontFamily = "Aluna";
        div.style.width = "100%";
        this.frmMain = div;
    }

    initFrameScrollbarHorizontal(){
        let div = this.createDiv("alunaFrameScrollbarHorizontal");
        div.style.height = "100%";
        div.style.width = "100%";
        this.frmScrollbarHorizontal = div;
        this.frmScrollbarHorizontalOut.appendChild(div);
    }

    initFrameScrollbarHorizontalOut(){
        let div = this.createDiv("alunaFrameScrollbarHorizontalOut");
        div.style.backgroundColor = config.bgFrameScrollbar;
        div.style.display = "flex";
        div.style.flexDirection = "row";
        div = this.setAllHeights(div, config.scrollbarWidth);
        div.style.width = "100%";
        this.frmScrollbarHorizontalOut = div;
        this.frmVertical.appendChild(div);
    }

    initFrameScrollbarSpacer(){
        let div = this.createDiv("alunaScrollbarSpacer");
        div.style.backgroundColor = config.bgScrollbarSpacer;
        div.style.height = "100%";
        div = this.setAllWidths(div, config.scrollbarWidth);
        this.frmScrollbarHorizontal = div;
        this.frmScrollbarHorizontalOut.appendChild(div);
    }

    initFrameScrollbarVertical(){
        let div = this.createDiv("alunaFrameScrollbarVertical");
        div.style.backgroundColor = config.bgFrameScrollbar;
        div.style.height = "100%";
        div = this.setAllWidths(div, config.scrollbarWidth);
        this.frmScrollbarVertical = div;
        this.frmHorizontal.appendChild(div);
    }

    initFrameVertical(){
        let div = this.createDiv("alunaFrameVertical");
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.width = "100%";
        this.frmVertical = div;
        this.frmMain.appendChild(div);
    }

    initHorizontalSpacer(){
        let div = this.createDiv("alunaVerticalSpacer");
        div.style.backgroundColor = config.bgHorizontalSpacer;
        div = this.setAllWidths(div, config.horizontalSpacerWidth);
        this.verticalSpacer = div;
        this.frmMain.appendChild(div);
    }

    setAllHeights(element, height){
        element.style.height = height + "px";
        element.style.maxHeight = height + "px";
        element.style.minHeight = height + "px";
        return element;
    }

    setAllWidths(element, width){
        element.style.maxWidth = width + "px";
        element.style.minWidth = width + "px";
        element.style.width = width + "px";
        return element;
    }
}