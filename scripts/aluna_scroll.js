//Imports
import {Position} from "./aluna_classes.js";
import * as config from "./aluna_config.js";
import * as func from "./aluna_functions.js";
import * as main from "../aluna.js";

//Class
export class ScrollBars{
    //Declarations
    //mousePos;
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
        //this.mousePos = new Position(e.clientX, e.clientY);
        this.offset = e.clientX - document.getElementById("alunaScrollbarHorizontal").offsetLeft;
        this.selectedHorizontal = true;
    }

    mouseDownScrollbarVertical(e){
        this.offset = e.clientY - document.getElementById("alunaScrollbarVertical").offsetTop;
        this.selectedVertical = true;
    }

    mouseUpHorizontal(e){
        if(document.getElementById("alunaScrollbarHorizontal") !== null && this.selectedHorizontal){
            console.log("mouseUpHorizontal: " + e);

            //TODO: All

        }
        this.selectedHorizontal = false;
    }

    mouseUpVertical(e){
        if(document.getElementById("alunaScrollbarVertical") !== null && this.selectedVertical){
            console.log("mouseUpVertical: " + e);

            //TODO: All

        }
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

            //TODO: Move Editor

        }
    }

    resetScrollBars(){
        this.pos = new Position(0, 0);
        let heightTotal = config.padding + (main.getCharAtts().lineHeight * main.getEditor().getRowCount());
        if(heightTotal > main.getEditor().getFrameHeight()){
            let percent = ((main.getEditor().getFrameHeight() * 100) / heightTotal) / 100;
            let height = main.getFrames().frmScrollbarHorizontal.offsetHeight * percent;
            let scrollBar = func.createScrollbar("alunaScrollbarVertical");
            scrollBar.style.height = height + "px";
            scrollBar.style.width = main.getFrames().frmScrollbarHorizontal.offsetWidth + "px";
            scrollBar.addEventListener("mousedown", (e) => {
                this.mouseDownScrollbarVertical(e);
            });
            main.getFrames().frmScrollbarVertical.appendChild(scrollBar);
        }else{
            func.removeElement("alunaScrollbarVertical");
        }
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
        }else{
            func.removeElement("alunaScrollbarHorizontal");
        }
    }

    scrollHorizontal(frame, scrollBar, left){
        let widthFull = frame.offsetWidth - scrollBar.offsetWidth;
        let percent = ((left * 100) / widthFull) / 100;
        let offset = (main.getFrames().editor.offsetWidth - main.getFrames().frmEditor.offsetWidth) * percent;
        main.getFrames().editor.style.left = "-" + offset + "px";
    }
}