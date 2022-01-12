/*Imports*/
import * as config from "./aluna_config.js";
import * as func from "./aluna_functions.js";

/*Editor-Class*/
class Editor{
    caret;
    caretPosition;
    charHeight;
    charWidth;
    cursorPosition;
    editor;
    firstNumber;
    frameLine;
    frameMain;
    frameEditor;
    frameEditorH;
    frameEditorV;
    frameNumbers;
    lineHeight;
    numbers;
    scrollBarH;
    scrollBarV;
    selection;

    constructor(){
        this.init();
    }

    addLine(content){
        let div = func.initLine(this.lineHeight);
        let subDiv = document.createElement("div");
        subDiv.setAttribute("class", "aluna_editor_line_content");
        subDiv.style.width = "fit-content";

        //TODO: Remove Word-Wrapping

        subDiv.innerHTML = content;
        div.appendChild(subDiv);
        this.editor.appendChild(div);
    }

    getMouseCoordinates(e){
        let x = e.clientX;
        x -= this.editor.offsetLeft;
        let y = e.clientY;
        y -= this.editor.offsetTop;
        return {
            x: x,
            y: y
        }
    }

    init(){
        this.frameMain = func.initFrameMain();
        this.frameNumbers = func.initFrameNumbers(this.frameMain);
        this.numbers = func.initNumbers(this.frameNumbers);
        this.firstNumber = document.getElementById("aluna_firstNumber");
        this.frameLine = func.initVerticalLine(this.frameMain);
        this.frameEditorH = func.initFrameEditorHorizontal(this.frameMain);
        this.frameEditorV = func.initFrameEditorVertical(this.frameEditorH);
        this.scrollBarH = func.initScrollbarHorizontal(this.frameEditorH);
        this.frameEditor = func.initFrameEditor(this.frameEditorV);
        this.scrollBarV = func.initScrollbarVertical(this.frameEditorV);
        this.editor = func.initEditor(this.frameEditor);
        this.initDefaultSizes();
        this.setDefaultSizes();
        this.caret = func.initCaret(this.frameEditor, this.charHeight);
        this.initListeners();
        this.addLine("ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ");
        this.addLine("01234567890123456789");
        this.addLine("<>/*-+()[]{}");
        this.setCaret(undefined);
    }

    initDefaultSizes(){
        this.charHeight = this.firstNumber.offsetHeight;
        this.charWidth = this.firstNumber.offsetWidth;
        this.lineHeight = this.charHeight + config.lineHeightPlus;
    }

    initListeners(){
        window.addEventListener("resize", () => {this.resetHeights()});
        this.frameEditor.addEventListener("mousedown", (e) => {this.mouseDown(e)});
        this.frameEditor.addEventListener("mouseup", (e) => {this.mouseUp(e)});
        this.caret.addEventListener("keydown", (e) => {this.inputDown(e)});
        this.caret.addEventListener("keyup", (e) => {this.inputUp(e)});
    }

    inputDown(e){
        //console.log("keyCode: " + e.keyCode);
        if(func.getKeyCodePreventDefault(e.keyCode)){
            e.preventDefault()
        }

        //TODO: Insert Keys while pressed

    }

    inputUp(e){

        //TODO: Check for Selection


        this.selection = undefined;
        //alert("Input: " + e.key);
        this.caret.value = "";
        if(func.isKeyExecutable(e.key)){

            //TODO: Execute some Keys

            //TODO: If Enter, scroll to End of Rows

        }else{
            let row = this.editor.children[this.caretPosition.row].children[0];
            let begin = row.textContent.substring(0, this.caretPosition.col);
            let end = row.textContent.substring(this.caretPosition.col, row.textContent.length);
            let content = func.getKeyContent(e.key);
            row.textContent = begin + content + end;
            this.caretPosition.col += content.length ;
            this.caret.style.left = (this.caret.offsetLeft + (content.length * this.charWidth)) + "px";
            this.setScrollbars();
        }
    }

    mouseDown(e){
        this.cursorPosition = this.getMouseCoordinates(e);
    }

    mouseUp(e){
        this.setCaret(e);
    }

    resetHeights(){
        this.frameNumbers.style.maxHeight = this.frameLine.offsetHeight + "px";
        this.frameEditor.style.maxHeight = this.frameLine.offsetHeight + "px";
    }

    resetNumbers(row){
        this.numbers.innerHTML = "";
        for(let i = 0; i < this.editor.childElementCount; i++){
            let div = document.createElement("div");
            if(i === 0){
                div.setAttribute("id", "aluna_firstNumber");
            }
            div.setAttribute("class", "aluna_number");
            div.innerHTML = (i + 1) + "";
            if(i === row){
                div.style.color = config.fgNumbersActive;
                div.innerHTML = "<b>" + div.innerHTML + "</b>";
            }else{
                div.style.color = config.fgNumbers;
            }
            this.numbers.appendChild(div);
        }
    }

    setCaret(e){
        let coords;
        if(e === undefined){
            coords = func.getEmptyCoordinates();
            this.cursorPosition = func.getEmptyCoordinates();
        }else{
            coords = this.getMouseCoordinates(e);
        }

        //TODO: Insert Scrollbars into Calculations

        let top = coords.y + this.frameEditor.offsetTop - (coords.y % this.lineHeight) + config.padding + 5;
        if(top > this.editor.offsetHeight){
            top = this.editor.offsetTop + config.padding + this.editor.offsetHeight - this.lineHeight;
        }
        this.caret.style.top = top + "px";
        let rowNr = Math.floor((top - this.editor.offsetTop - config.padding) / this.lineHeight);
        let row = this.editor.children[rowNr].children[0];
        let left = func.getLeft(this.editor, row, coords, this.charWidth, config.padding);
        this.caret.style.left = left + "px";
        let colNr = Math.floor((left - this.editor.offsetLeft) / this.charWidth);
        this.caretPosition = {
            col: colNr,
            row: rowNr
        }
        if(func.isSelection(this.cursorPosition, coords, this.charWidth, this.lineHeight)){
            this.caret.focus();
        }else{
            let left2 = func.getLeft(this.editor, row, this.cursorPosition, this.charWidth, config.padding);
            let colNr2 = Math.floor((left2 - this.editor.offsetLeft) / this.charWidth);
            let startAndLength = func.getColumnStartAndLength(colNr, colNr2);
            this.selection = {
                row: rowNr,
                start: startAndLength.start,
                length: startAndLength.length
            };
        }
        this.cursorPosition = undefined;
        func.showActiveRow(this.editor, rowNr, config.bgLineActive);
        this.resetNumbers(rowNr);
    }

    setDefaultSizes(){
        this.frameNumbers.style.maxHeight = this.frameNumbers.offsetHeight + "px";
        let width = (config.numbersLength * this.firstNumber.offsetWidth) + (2 * config.padding);
        this.frameNumbers.style.maxWidth = width + "px";
        this.frameNumbers.style.minWidth = width + "px";
        this.frameNumbers.style.width = width + "px";
        this.numbers.style.lineHeight = this.lineHeight + "px";
        this.frameEditor.style.maxHeight = this.frameEditor.offsetHeight + "px";
        this.frameEditor.style.maxWidth = this.frameEditor.offsetWidth + "px";
        this.editor.style.lineHeight = this.lineHeight + "px";
    }

    setScrollbars(){
        let width = 0;
        for(let i = 0; i < this.editor.childElementCount; i++){
            if(this.editor.children[i].children[0].offsetWidth > width){
                width = this.editor.children[i].children[0].offsetWidth + config.padding;
            }
        }
        if(width < this.frameEditor.offsetWidth){
            width = this.frameEditor.offsetWidth;
        }
        for(let i = 0; i < this.editor.childElementCount; i++){
            this.editor.children[i].style.width = width + "px";
        }
        let widthScrollbar = this.scrollBarH;
        if(width > this.frameEditor.offsetWidth){
            let diff = width - this.frameEditor.offsetWidth;
            let percent = 100 - ((diff * 100) / this.frameEditor.offsetWidth);
            widthScrollbar = (this.frameEditor.offsetWidth / 100) * percent;
            //this.scrollBarH.children[0].style.left = (this.frameEditor.offsetLeft + this.frameEditor.offsetWidth - widthScrollbar) + "px";
            this.scrollBarH.children[0].style.width = widthScrollbar + "px";

            //TODO: Scroll to End

            //TODO: Align Scrollbar-Object right

        }
    }
}

/*Declare and load Editor*/
let e;
e = new Editor();