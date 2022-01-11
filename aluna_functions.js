let charsDefault = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ<>\\/*-+;,:._-$£€{}[]()!?\"ç%&='¦@#|¢§°äöüÄÖÜéèà¨^`";
let charsPreventDefault = [9, 13];

export function getColumnStartAndLength(colNr, colNr2){
    let start;
    let length;
    if(colNr < colNr2){
        start = colNr;
        length = colNr2 - colNr;
    }else{
        start = colNr2;
        length = colNr - colNr2;
    }
    return {
        start: start,
        length: length
    }
}

export function getEmptyCoordinates(){
    return {
        x: 0,
        y: 0
    };
}

export function getKeyContent(key){
    if(charsDefault.indexOf(key) > -1){
        return key;
    }else if(key === " "){
        return " ";
    }else if(key === "Tab"){
        return "    ";
    }

    //TODO: All

    return "";
}

export function getKeyCodePreventDefault(keyCode){
    for(let i = 0; i < charsPreventDefault.length; i++){
        if(charsPreventDefault[i] === keyCode){
            return true;
        }
    }
    return false;
}

export function getLeft(editor, row, coords, charWidth, padding){
    let left = coords.x + editor.offsetLeft - (coords.x % charWidth);
    if(left > (row.offsetLeft + row.offsetWidth)){
        left = row.offsetLeft + row.offsetWidth - padding;
    }
    return left;
}

export function initCaret(frameEditor, fgEditor, charHeight, padding){
    let caret = document.createElement("textarea");
    caret.setAttribute("id", "aluna_cursor");
    caret.style.background = "transparent";
    caret.style.border = "0px none #ffffff";
    caret.style.caretColor = fgEditor;
    caret.style.color = "transparent";
    caret.style.height = charHeight + "px";
    caret.style.margin = "0";
    caret.style.outline = "none";
    caret.style.padding = "0";
    caret.style.left = frameEditor.offsetLeft + "px";
    caret.style.position = "absolute";
    caret.style.resize = "none";
    caret.style.textAlign = "right";
    caret.style.top = (frameEditor.offsetTop + padding + 5) + "px";
    caret.style.width = (padding + 1) + "px";
    frameEditor.appendChild(caret);
    caret.focus();
    return caret;
}

export function initEditor(frameEditor, padding){
    let div = document.createElement("div");
    div.setAttribute("id", "aluna_editor");
    div.style.outline = "none";
    div.style.paddingTop = padding + "px";
    frameEditor.appendChild(div);
    return div;
}

export function initFrameEditor(frameEditorVertical, bgEditor){
    let div = document.createElement("div");
    div.setAttribute("id", "aluna_frame_editor");
    div.style.backgroundColor = bgEditor;
    div.style.cursor = "text";
    div.style.display = "flex";
    div.style.flexDirection = "column";
    //div.style.overflow = "auto";
    div.style.width = "100%";
    frameEditorVertical.appendChild(div);
    return div;
}

export function initFrameEditorHorizontal(frameMain, bgScrollbarOverflow){
    let div = document.createElement("div");
    div.setAttribute("id", "aluna_frame_editor_horizontal");
    div.style.backgroundColor = bgScrollbarOverflow;
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.width = "100%";
    frameMain.appendChild(div);
    return div;
}

export function initFrameEditorVertical(frameEditorHorizontal){
    let div = document.createElement("div");
    div.setAttribute("id", "aluna_frame_editor_vertical");
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.height = "100%";
    div.style.width = "100%";
    frameEditorHorizontal.appendChild(div);
    return div;
}

export function initFrameMain(fgEditor){
    let div = document.getElementById("aluna");
    div.style.color = fgEditor;
    div.style.display = "flex";
    div.style.flexDirection = "row";
    div.style.width = "100%";
    return div;
}

export function initFrameNumbers(frameMain, bgNumbers, fgNumbers){
    let div = document.createElement("div");
    div.setAttribute("id", "aluna_nrs_frame");
    div.style.backgroundColor = bgNumbers;
    div.style.color = fgNumbers;
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.overflow = "hidden";
    frameMain.appendChild(div);
    return div;
}

export function initLine(lineHeight, padding){
    let div = document.createElement("div");
    div.setAttribute("class", "aluna_editor_line");
    div.style.boxSizing = "border-box";
    div.style.height = lineHeight + "px";
    div.style.paddingLeft = padding + "px";
    div.style.paddingRight = padding + "px";
    div.style.whiteSpace = "pre";
    div.style.width = "100%";
    return div;
}

export function initNumbers(frameNumbers, padding){
    let div = document.createElement("div");
    div.setAttribute("id", "aluna_nrs");
    div.style.padding = padding + "px";
    div.style.textAlign = "right";
    div.style.userSelect = "none";
    div.innerHTML = "<span id=\"aluna_firstNumber\">1</span>";
    frameNumbers.appendChild(div);
    return div;
}

export function initScrollbarHorizontal(frameEditorHorizontal, bgScrollbar, bgScrollbarObject, scrollBarWidth){
    let div = document.createElement("div");
    div.setAttribute("id", "aluna_scrollbar_horizontal");
    div.style.backgroundColor = bgScrollbar;
    div.style.height = scrollBarWidth + "px";
    div.style.width = "calc(100% - " + scrollBarWidth + "px)";
    let object = document.createElement("div");
    object.setAttribute("id", "aluna_scrollbar_horizontal_object");
    object.style.backgroundColor = bgScrollbarObject;
    object.style.borderRadius = scrollBarWidth + "px";
    object.style.height = scrollBarWidth + "px";
    div.appendChild(object);
    frameEditorHorizontal.appendChild(div);
    return div;
}

export function initScrollbarVertical(frameEditorVertical, bgScrollbar, bgScrollbarObject, scrollBarWidth){
    let div = document.createElement("div");
    div.setAttribute("id", "aluna_scrollbar_vertical");
    div.style.backgroundColor = bgScrollbar;
    div.style.width = scrollBarWidth + "px";
    let object = document.createElement("div");
    object.setAttribute("id", "aluna_scrollbar_vertical_object");
    object.style.backgroundColor = bgScrollbarObject;
    object.style.borderRadius = scrollBarWidth + "px";
    object.style.width = scrollBarWidth + "px";
    div.appendChild(object);
    frameEditorVertical.appendChild(div);
    return div;
}

export function initVerticalLine(frameMain, bgLine, lineVerticalWidth){
    let div = document.createElement("div");
    div.setAttribute("id", "aluna_line");
    div.style.backgroundColor = bgLine;
    div.style.width = lineVerticalWidth + "px";
    frameMain.appendChild(div);
    return div;
}

export function isKeyExecutable(key){
    let check = false;

    //TODO: All

    return check;
}

export function isSelection(cursorPosition, coords, charWidth, lineHeight){
    let diffX = cursorPosition.x - coords.x;
    diffX < 0 ? diffX = diffX * -1 : undefined;
    let diffY = cursorPosition.y - coords.y;
    diffY < 0 ? diffY = diffY * -1 : undefined;
    if(diffX < Math.ceil(charWidth / 2) && diffY < Math.ceil(lineHeight / 2)){
        return true;
    }else{
        return false;
    }
}

export function showActiveRow(editor, rowNr, bgLineActive){
    for(let i = 0; i < editor.childElementCount; i++){
        if(i === rowNr){
            editor.children[i].style.backgroundColor = bgLineActive;
        }else{
            editor.children[i].style.backgroundColor = "transparent";
        }
    }
}