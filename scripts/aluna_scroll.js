//Imports
//import {Position} from "./aluna_classes.js";
import * as config from "./aluna_config.js";
import * as func from "./aluna_functions.js";
import * as main from "../aluna.js";

//Class
export class ScrollBars{
    //Declarations
    offset;
    //pos;
    selectedHorizontal = false;
    selectedVertical = false;

    //Constructor
    constructor(){
        //this.pos = new Position(0, 0);
        this.initListeners();
    }

    //Methods
    getFrameHorizontal(){
        return main.getFrames().frmScrollbarHorizontal;
    }

    getFrameVertical(){
        return main.getFrames().frmScrollbarVertical;
    }

    getScrollbarHorizontal(){
        return document.getElementById("alunaScrollbarHorizontal");
    }

    getScrollbarVertical(){
        return document.getElementById("alunaScrollbarVertical");
    }

    initListeners(){
        document.addEventListener("mousemove", (e) => {
            this.moveHorizontal(e);
            this.moveVertical(e);
        });
        document.addEventListener("mouseup", (e) => {
            this.mouseUpHorizontal(e);
            this.mouseUpVertical(e);
        });
        this.getFrameHorizontal().addEventListener("mousedown", (e) => {
            this.jumpHorizontal(e);
        });
        this.getFrameVertical().addEventListener("mousedown", (e) => {
            this.jumpVertical(e);
        });
    }

    jumpHorizontal(e){
        let scrollbar = this.getScrollbarHorizontal();
        //console.log("FFF: " + e.clientX + "/" + scrollbar.offsetLeft + "/" + (scrollbar.offsetLeft + scrollbar.offsetWidth));
        if(scrollbar !== null){
            if(e.clientX < scrollbar.offsetLeft || e.clientX > (scrollbar.offsetLeft + scrollbar.offsetWidth)){
                console.log("Jump H");

                //TODO: All

            }
        }
    }

    jumpVertical(e){
        let scrollbar = this.getScrollbarVertical();
        //console.log("FFF: " + e.clientY + "/" + scrollbar.offsetTop + "/" + (scrollbar.offsetTop + scrollbar.offsetHeight));
        if(scrollbar !== null){
            if(e.clientY < scrollbar.offsetTop || e.clientY > (scrollbar.offsetTop + scrollbar.offsetHeight)){
                console.log("Jump V");

                //TODO: All

            }
        }
    }

    mouseDownScrollbarHorizontal(e){
        this.offset = e.clientX - this.getScrollbarHorizontal().offsetLeft;
        this.selectedHorizontal = true;
    }

    mouseDownScrollbarVertical(e){
        this.offset = e.clientY - this.getScrollbarVertical().offsetTop;
        this.selectedVertical = true;
    }

    mouseUpHorizontal(e){
        /*if(document.getElementById("alunaScrollbarHorizontal") !== null && this.selectedHorizontal){
            console.log("mouseUpHorizontal1: " + e);
        }else{
            console.log("mouseUpHorizontal2: " + e);
        }*/
        this.selectedHorizontal = false;
    }

    mouseUpVertical(e){
        /*if(document.getElementById("alunaScrollbarVertical") !== null && this.selectedVertical){
            console.log("mouseUpVertical1: " + e);
        }else{
            console.log("mouseUpVertical2: " + e);
        }*/
        this.selectedVertical = false;
    }

    moveHorizontal(e){
        if(this.selectedHorizontal){
            let frame = this.getFrameHorizontal();
            let scrollbar = this.getScrollbarHorizontal();
            let left = e.clientX - frame.offsetLeft - this.offset;
            left = func.maxMinNumber(left, 0, frame.offsetWidth - scrollbar.offsetWidth);
            scrollbar.style.left = left + "px";
            this.scrollHorizontal(frame, scrollbar, left);
        }
    }

    moveVertical(e){
        if(this.selectedVertical){
            let frame = this.getFrameVertical();
            let scrollbar = this.getScrollbarVertical();
            let top = e.clientY - frame.offsetTop - this.offset;
            top = func.maxMinNumber(top, 0, frame.offsetHeight - scrollbar.offsetHeight);
            scrollbar.style.top = top + "px";
            this.scrollVertical(frame, scrollbar, top);
        }
    }

    resetScrollBars(){

        //TODO: Set Editor-Position to 0,0 or save and set Scroll-Position

        //this.pos = new Position(0, 0);
        func.removeElement("alunaScrollbarVertical");
        let heightTotal = config.padding + (main.getCharAtts().lineHeight * main.getEditor().getRowCount());
        //let heightTotal = main.getEditor().getEditor().offsetHeight;
        if(heightTotal > main.getEditor().getFrameHeight()){
            let percent = ((main.getEditor().getFrameHeight() * 100) / heightTotal) / 100;
            let height = this.getFrameVertical().offsetHeight * percent;
            let scrollBar = func.createScrollbar("alunaScrollbarVertical");
            scrollBar = func.setSizes(scrollBar, height, this.getFrameVertical().offsetWidth);
            scrollBar.addEventListener("mousedown", (e) => {
                this.mouseDownScrollbarVertical(e);
            });
            main.getFrames().frmScrollbarVertical.appendChild(scrollBar);
        }
        func.removeElement("alunaScrollbarHorizontal");
        let widthTotal = main.getEditor().getEditor().offsetWidth;
        if(widthTotal > main.getEditor().getFrameWidth()){
            let percent = ((main.getEditor().getFrameWidth() * 100) / widthTotal) / 100;
            let width = this.getFrameHorizontal().offsetWidth * percent;
            let scrollBar = func.createScrollbar("alunaScrollbarHorizontal");
            scrollBar = func.setSizes(scrollBar, this.getFrameHorizontal().offsetHeight, width);
            scrollBar.addEventListener("mousedown", (e) => {
                this.mouseDownScrollbarHorizontal(e);
            });
            main.getFrames().frmScrollbarHorizontal.appendChild(scrollBar);
        }
    }

    scrollCaret(pos){
        if(this.getScrollbarHorizontal() !== null){
            let diff = main.getEditor().getFrameLeft() - main.getEditor().getEditor().offsetLeft;
            let frameMax = main.getEditor().getFrameWidth() - (main.getCharAtts().width * config.scrollOffsetX);
            let frame = this.getFrameHorizontal();
            let scrollbar = this.getScrollbarHorizontal();
            let widthTotal = main.getEditor().getEditor().offsetWidth;
            let widthScrollArea = frame.offsetWidth - scrollbar.offsetWidth;
            let percent = (widthScrollArea * 100) / widthTotal;
            let divisor = 100 / percent;
            let overflow = config.scrollOffsetX * main.getCharAtts().width;
            let value = overflow / divisor;
            let left;
            if(pos.x - diff > frameMax){
                left = scrollbar.offsetLeft - frame.offsetLeft + value;
                left = func.maxMinNumber(left, 0, frame.offsetWidth - scrollbar.offsetWidth);
                scrollbar.style.left = left + "px";
                this.scrollHorizontal(frame, scrollbar, left);
            }else if(pos.x - diff < main.getCharAtts().width * config.scrollOffsetX){
                left = scrollbar.offsetLeft - frame.offsetLeft - value;
                left = func.maxMinNumber(left, 0, frame.offsetWidth - scrollbar.offsetWidth);
                scrollbar.style.left = left + "px";
                this.scrollHorizontal(frame, scrollbar, left);
            }
        }
        /*diff = main.getEditor().getFrameTop() - main.getEditor().getEditor().offsetTop;
        frameMax = main.getEditor().getFrameHeight() - (main.getCharAtts().lineHeight * config.scrollOffsetY);
        if(pos.y - diff > frameMax){
            console.log("scrollCaretY: " + pos.y);

            //TODO: All

        }*/
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