//Imports
import {Position} from "./aluna_classes.js";
import * as config from "./aluna_config.js";
import * as func from "./aluna_functions.js";
import * as main from "../aluna.js";

//Class
export class ScrollBars{
    //Declarations
    offset;
    pos;
    selectedHorizontal = false;
    selectedVertical = false;

    //Constructor
    constructor(){
        this.pos = new Position(0, 0);
        this.initListeners();
    }

    //Methods
    initListeners(){
        document.addEventListener("mousemove", (e) => {
            this.moveHorizontal(e);
            this.moveVertical(e);
        });
        document.addEventListener("mouseup", (e) => {
            this.mouseUpHorizontal(e);
            this.mouseUpVertical(e);
        });
    }

    mouseDownScrollbarHorizontal(e){
        this.offset = e.clientX - document.getElementById("alunaScrollbarHorizontal").offsetLeft;
        this.selectedHorizontal = true;
    }

    mouseDownScrollbarVertical(e){
        this.offset = e.clientY - document.getElementById("alunaScrollbarVertical").offsetTop;
        this.selectedVertical = true;
    }

    mouseUpHorizontal(e){
        /*if(document.getElementById("alunaScrollbarHorizontal") !== null && this.selectedHorizontal){
            console.log("mouseUpHorizontal: " + e);

            //TODO: All

        }*/
        this.selectedHorizontal = false;
    }

    mouseUpVertical(e){
        /*if(document.getElementById("alunaScrollbarVertical") !== null && this.selectedVertical){
            console.log("mouseUpVertical: " + e);

            //TODO: All

        }*/
        this.selectedVertical = false;
    }

    moveHorizontal(e){
        if(this.selectedHorizontal){
            let frame = main.getFrames().frmScrollbarHorizontal;
            let scrollbar = document.getElementById("alunaScrollbarHorizontal");
            let left = e.clientX - frame.offsetLeft - this.offset;
            if(left < 0){
                left = 0;
            }
            if(left > frame.offsetWidth - scrollbar.offsetWidth){
                left = frame.offsetWidth - scrollbar.offsetWidth;
            }
            scrollbar.style.left = left + "px";
            this.scrollHorizontal(frame, scrollbar, left);
        }
    }

    moveVertical(e){
        if(this.selectedVertical){
            let frame = main.getFrames().frmScrollbarVertical;
            let scrollbar = document.getElementById("alunaScrollbarVertical");
            let top = e.clientY - frame.offsetTop - this.offset;
            if(top < 0){
                top = 0;
            }
            if(top > frame.offsetHeight - scrollbar.offsetHeight){
                top = frame.offsetHeight - scrollbar.offsetHeight;
            }
            scrollbar.style.top = top + "px";
            this.scrollVertical(frame, scrollbar, top);
        }
    }

    resetScrollBars(){
        this.pos = new Position(0, 0);
        func.removeElement("alunaScrollbarVertical");
        let heightTotal = config.padding + (main.getCharAtts().lineHeight * main.getEditor().getRowCount());
        if(heightTotal > main.getEditor().getFrameHeight()){
            let percent = ((main.getEditor().getFrameHeight() * 100) / heightTotal) / 100;
            let height = main.getFrames().frmScrollbarVertical.offsetHeight * percent;
            let scrollBar = func.createScrollbar("alunaScrollbarVertical");
            scrollBar.style.height = height + "px";
            scrollBar.style.width = main.getFrames().frmScrollbarVertical.offsetWidth + "px";
            scrollBar.addEventListener("mousedown", (e) => {
                this.mouseDownScrollbarVertical(e);
            });
            main.getFrames().frmScrollbarVertical.appendChild(scrollBar);
        }
        func.removeElement("alunaScrollbarHorizontal");
        let length = func.getLongestRowLength(main.getEditor().getChildren());
        let widthTotal = config.padding + (length * main.getCharAtts().width);
        if(widthTotal > main.getEditor().getFrameWidth()){
            let percent = ((main.getEditor().getFrameWidth() * 100) / widthTotal) / 100;
            let width = main.getFrames().frmScrollbarHorizontal.offsetWidth * percent;
            let scrollBar = func.createScrollbar("alunaScrollbarHorizontal");
            scrollBar.style.height = main.getFrames().frmScrollbarHorizontal.offsetHeight + "px";
            scrollBar.style.width = width + "px";
            scrollBar.addEventListener("mousedown", (e) => {
                this.mouseDownScrollbarHorizontal(e);
            });
            main.getFrames().frmScrollbarHorizontal.appendChild(scrollBar);
        }
    }

    scrollCaret(pos){
        let diff = main.getEditor().getFrameLeft() - main.getEditor().getEditor().offsetLeft;
        let frameMax = main.getEditor().getFrameWidth() - (main.getCharAtts().width * config.scrollOffsetX);
        if(pos.x - diff > frameMax){
            let frame = main.getFrames().frmScrollbarHorizontal;
            let scrollbar = document.getElementById("alunaScrollbarHorizontal");
            let lengthMax = main.getEditor().getEditor().offsetWidth;
            let lengthScrollArea = frame.offsetWidth - scrollbar.offsetWidth;
            let percent = (lengthScrollArea * 100) / lengthMax;
            let divisor = 100 / percent;
            let overflow = config.scrollOffsetX * main.getCharAtts().width;
            let value = overflow / divisor;
            let left = scrollbar.offsetLeft - frame.offsetLeft + value;
            if(left < 0){
                left = 0;
            }
            if(left > frame.offsetWidth - scrollbar.offsetWidth){
                left = frame.offsetWidth - scrollbar.offsetWidth;
            }
            scrollbar.style.left = left + "px";
            this.scrollHorizontal(frame, scrollbar, left);

            //TODO: All

        }else if(pos.x - diff < main.getCharAtts().width * config.scrollOffsetX){
            console.log("X: " + (pos.x - diff));

        }
        diff = main.getEditor().getFrameTop() - main.getEditor().getEditor().offsetTop;
        frameMax = main.getEditor().getFrameHeight() - (main.getCharAtts().lineHeight * config.scrollOffsetY);
        if(pos.y - diff > frameMax){
            console.log("scrollCaretY: " + pos.y);

            //TODO: All

        }
    }

    scrollHorizontal(frame, scrollBar, left){
        let widthFull = frame.offsetWidth - scrollBar.offsetWidth;
        let percent = ((left * 100) / widthFull) / 100;
        let offset = (main.getFrames().editor.offsetWidth - main.getFrames().frmEditor.offsetWidth) * percent;
        main.getFrames().editor.style.left = "-" + offset + "px";
    }

    scrollVertical(frame, scrollBar, top){
        let heightFull = frame.offsetHeight - scrollBar.offsetHeight;
        let percent = ((top * 100) / heightFull) / 100;
        let offset = (main.getFrames().editor.offsetHeight - main.getFrames().frmEditor.offsetHeight) * percent;
        main.getFrames().editor.style.top = "-" + offset + "px";
        main.getFrames().rowNumbers.style.top = "-" + offset + "px";
    }
}