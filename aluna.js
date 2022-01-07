/*Editor-Class*/
class Editor{
    editor;
    frame_aluna;
    frame_editor;
    frame_lines;
    lines;

    constructor(){
        this.load();
    }

    load(){
        this.frame_aluna = document.getElementById("aluna");
        //alert("loadEditor: " + this.frame_aluna.offsetWidth + "/" + this.frame_aluna.offsetHeight);
        //this.frame_editor.style.backgroundColor = "#1b1b1b";
        this.frame_aluna.style.display = "flex";
        this.frame_aluna.style.flexDirection = "row";

        this.frame_lines = document.createElement("div");
        this.frame_lines.setAttribute("id", "lines_frame");
        this.frame_lines.style.backgroundColor = "#181818";
        this.frame_lines.style.display = "flex";
        this.frame_lines.style.flexDirection = "column";
        this.frame_lines.style.overflow = "hidden";
        this.frame_lines.style.width = "4em";
        this.frame_aluna.appendChild(this.frame_lines);

        this.lines = document.createElement("div");
        this.lines.setAttribute("id", "lines");
        this.lines.style.padding = "10px";
        this.lines.style.userSelect = "none";
        this.lines.style.width = "100%";
        this.frame_lines.appendChild(this.lines);

        let nr = document.createElement("div");
        this.lines.setAttribute("class", "nr");
        nr.innerHTML = "1";
        this.lines.appendChild(nr);

        this.frame_editor = document.createElement("div");
        this.frame_editor.setAttribute("id", "frame_editor");
        this.frame_editor.style.backgroundColor = "#1b1b1b";
        this.frame_editor.style.display = "flex";
        this.frame_editor.style.flexDirection = "column";
        this.frame_editor.style.overflow = "auto";
        this.frame_editor.style.width = "100%";
        this.frame_aluna.appendChild(this.frame_editor);

        this.editor = document.createElement("div");
        this.editor.setAttribute("id", "editor");
        //this.editor.style.height = "100%";
        this.editor.style.padding = "10px";
        //this.editor.style.width = "100%";
        this.frame_editor.appendChild(this.editor);

        let line = document.createElement("div");
        line.setAttribute("class", "editor_line");
        line.style.backgroundColor = "midnightblue";
        //line.style.height = "16px";
        //line.style.width = "100%";
        this.editor.appendChild(line);

        let code = document.createElement("span");
        code.setAttribute("class", "code");
        code.innerHTML = "1";
        line.appendChild(code);

        code = document.createElement("span");
        code.innerHTML = " ";
        line.appendChild(code);

        code = document.createElement("span");
        code.setAttribute("class", "code");
        code.innerHTML = "A";
        line.appendChild(code);

        code = document.createElement("span");
        code.innerHTML = " ";
        line.appendChild(code);

        code = document.createElement("span");
        code.setAttribute("class", "code");
        code.innerHTML = "g";
        line.appendChild(code);
    }
}

/*Declare and load Editor*/
let e = new Editor();