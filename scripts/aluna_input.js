//Imports
import * as main from "../aluna.js";

//Class
export class Input{
    //Declarations
    pressedCtrl;
    pressedShift;

    //Constructor
    constructor(){
        this.pressedCtrl = false;
        this.pressedShift = false;
    }

    //Methods
    isPressKey(key){
        if(key === "Control"){
            return true;
        }else if(key === "Shift"){
            return true;
        }
        return false;
    }

    keyDown(e){
        console.log("keyDown: " + e.key);
        if(this.isPressKey(e.key)){
            this.pressKey(e.key, true);
        }else{

            //TODO: All

        }
    }

    keyUp(e){
        console.log("keyUp: " + e.key);
        if(this.isPressKey(e.key)){
            this.pressKey(e.key, false);
        }else{

            //Catch Control-Keys (Ctrl-A, Ctrl-C, Ctrl-D, Ctrl-S, Ctrl-V, Ctrl-X, Ctrl-Z)
            //TODO: All

        }
    }

    pressKey(key, value){
        if(key === "Control"){
            this.pressedCtrl = value;
        }else if(key === "Shift"){
            this.pressedShift = value;
        }
    }
}