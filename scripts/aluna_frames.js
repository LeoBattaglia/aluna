//Imports
import * as config from "./aluna_config.js";
import * as func from "./aluna_functions.js";

//Class
export class Frames{
    //Declarations
    charAtts;
    editor;
    frmEditor;
    frmHorizontal;
    frmMain;
    frmLineNumbers;
    frmScrollbarHorizontal;
    frmScrollbarHorizontalOut;
    frmScrollbarVertical;
    frmVertical;
    scrollbarSpacer;
    verticalSpacer;

    //Constructor
    constructor(charAtts){
        this.charAtts = charAtts;
        this.init();
    }

    //Methods
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
        this.initEditor();
        this.initFrameScrollbarVertical();
    }

    initEditor(){
        let div = func.createDiv("alunaEditor");
        //div.style.backgroundColor = config.bgEditor;
        //div.style.color = config.fgEditor;
        div.style.cursor = "text";
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.height = "fit-content";
        //div.style.minHeight = "100%";
        div.style.minHeight = "calc(100% - " + config.padding + "px)";
        div.style.minWidth = "100%";
        //div.style.overflow = "hidden";
        div.style.paddingTop = config.padding + "px";
        div.style.position = "relative";
        div.style.userSelect = "none";
        div.style.width = "fit-content";
        this.editor = div;
        this.frmEditor.appendChild(div);
    }

    initFrameEditor(){
        let div = func.createDiv("alunaFrameEditor");
        div.style.backgroundColor = config.bgEditor;
        div.style.color = config.fgEditor;
        //div.style.display = "flex";
        //div.style.flexDirection = "column";
        div.style.height = "100%";
        div.style.minHeight = "100%";
        div.style.overflow = "hidden";
        //div.style.paddingTop = config.padding + "px";
        div.style.position = "relative";
        div.style.width = "100%";
        this.frmEditor = div;
        this.frmHorizontal.appendChild(div);
    }

    initFrameHorizontal(){
        let div = func.createDiv("alunaFrameHorizontal");
        div.style.display = "flex";
        div.style.flexDirection = "row";
        div.style.height = "100%";
        div.style.width = "100%";
        this.frmHorizontal = div;
        this.frmVertical.appendChild(div);
    }

    initFrameLineNumbers(){
        let div = func.createDiv("alunaFrameLineNumbers");
        div.style.backgroundColor = config.bgLineNumbers;
        div.style.color = config.fgLineNumbers;
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.paddingTop = config.padding + "px";
        div.style.userSelect = "none";
        let line = func.createLineNumber(1);
        div.appendChild(line);
        this.frmLineNumbers = div;
        this.frmMain.appendChild(div);
    }

    initFrameMain(){
        let div = document.getElementById("aluna");
        div.style.display = "flex";
        div.style.flexDirection = "row";
        div.style.fontFamily = "Aluna";
        div.style.fontSize = config.fontSize + "px";
        div.style.width = "100%";
        this.frmMain = div;
    }

    initFrameScrollbarHorizontal(){
        let div = func.createDiv("alunaFrameScrollbarHorizontal");
        div.style.height = "100%";
        div.style.width = "100%";
        this.frmScrollbarHorizontal = div;
        this.frmScrollbarHorizontalOut.appendChild(div);
    }

    initFrameScrollbarHorizontalOut(){
        let div = func.createDiv("alunaFrameScrollbarHorizontalOut");
        div.style.backgroundColor = config.bgFrameScrollbar;
        div.style.display = "flex";
        div.style.flexDirection = "row";
        div = func.setAllHeights(div, config.scrollbarSize);
        div.style.width = "100%";
        this.frmScrollbarHorizontalOut = div;
        this.frmVertical.appendChild(div);
    }

    initFrameScrollbarSpacer(){
        let div = func.createDiv("alunaScrollbarSpacer");
        div.style.backgroundColor = config.bgScrollbarSpacer;
        div.style.height = "100%";
        div = func.setAllWidths(div, config.scrollbarSize);
        this.scrollbarSpacer = div;
        this.frmScrollbarHorizontalOut.appendChild(div);
    }

    initFrameScrollbarVertical(){
        let div = func.createDiv("alunaFrameScrollbarVertical");
        div.style.backgroundColor = config.bgFrameScrollbar;
        div.style.height = "100%";
        div = func.setAllWidths(div, config.scrollbarSize);
        this.frmScrollbarVertical = div;
        this.frmHorizontal.appendChild(div);
    }

    initFrameVertical(){
        let div = func.createDiv("alunaFrameVertical");
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.width = "100%";
        this.frmVertical = div;
        this.frmMain.appendChild(div);
    }

    initHorizontalSpacer(){
        let div = func.createDiv("alunaVerticalSpacer");
        div.style.backgroundColor = config.bgHorizontalSpacer;
        div = func.setAllWidths(div, config.horizontalSpacerWidth);
        this.verticalSpacer = div;
        this.frmMain.appendChild(div);
    }

    resetData(charAtts){
        this.charAtts = charAtts;
        let width = (2 * config.padding) + (config.lineNumbersChars * this.charAtts.width);
        this.frmLineNumbers = func.setAllWidths(this.frmLineNumbers, width);
        this.frmLineNumbers.style.lineHeight = this.charAtts.lineHeight + "px";
        this.frmEditor.style.lineHeight = this.charAtts.lineHeight + "px";
        this.resetSizes();
    }

    resetSizes(){
        this.frmEditor.style.height = this.frmHorizontal.offsetHeight + "px";
        this.frmEditor.style.maxHeight = this.frmHorizontal.offsetHeight + "px";
        this.frmEditor.style.width = (this.frmHorizontal.offsetWidth - config.scrollbarSize) + "px";
        this.frmEditor.style.maxWidth = (this.frmHorizontal.offsetWidth - config.scrollbarSize) + "px";
    }
}