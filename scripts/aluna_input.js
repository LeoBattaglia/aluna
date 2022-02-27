//Imports
import * as main from "../aluna.js";

//Class
export class Input{
    //Declarations
    pressedCtrl;

    //Constructor
    constructor(){
        this.pressedCtrl = false;
    }

    //Methods
    keyDown(e){
        console.log("keyDown: " + e.key);
        if(e.key === "Control"){
            this.pressedCtrl = true;
        }else{

            //TODO: All

        }
    }

    keyUp(e){
        console.log("keyUp: " + e.key);
        if(e.key === "Control"){
            this.pressedCtrl = false;
        }else{

            //Catch Control-Keys (Ctrl-A, Ctrl-C, Ctrl-D, Ctrl-S, Ctrl-X, Ctrl-Y, Ctrl-Z)
            //TODO: All

        }
    }
}