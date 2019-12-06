const personal = document.querySelector('#btnPersonal');
const shared = document.querySelector('#btnShared');
const carpetaIcon = document.querySelector('#crearCarpeta');
const documentoIcon = document.querySelector('#crearArchivo');
const notificacionIcon = document.querySelector('#notification');
const perfilIcon = document.querySelector('#perfil');
const runIcon = document.querySelector('#correr');
const downIcon = document.querySelector('#descargar');

personal.addEventListener("click",showPersonal);
shared.addEventListener("click",showShared);
carpetaIcon.addEventListener("click", crearCarpeta);
documentoIcon.addEventListener("click", crearArchivo);
notificacionIcon.addEventListener("click", notificaciones);
perfilIcon.addEventListener("click", perfil);
runIcon.addEventListener("click", enviar);
downIcon.addEventListener("click", descargar);

var loc = window.location
var wsStart = 'ws://'; 
if (loc.protocol == 'https:') {
    wsStart = 'wss://';
}

var endpoint = wsStart + loc.host + loc.pathname;
var socket = new WebSocket(endpoint);

socket.onmessage = function(e){
    console.log("message", e);
}
socket.onopen = function(e){
    console.log("open", e);
}
socket.onerror = function(e){
    console.log("error", e);
}
socket.onclose = function(e){
    console.log("close", e);
}


function showShared() {
	document.querySelector('#myFiles').style.display = "none";
	document.querySelector('#sharedFiles').style.display = "block";
	personal.style.background = "#2d3436";
	shared.style.background = "#1e272e";

}
function showPersonal() {
	document.querySelector('#myFiles').style.display = "block";
	document.querySelector('#sharedFiles').style.display = "none";
	shared.style.background = "#2d3436";
	personal.style.background = "#1e272e";
}


function crearCarpeta(){
    alert("Crear carpeta");
}

function crearArchivo(){
    alert("Crear archivo");
}

function notificaciones(){
    alert("Notificaciones");
}

function perfil(){
    alert("Perfil");
}

//------------------------------------------------------------------------------------------------------

var keywords = [
    "ASSERT",
    "AND",
    "BREAK",
    "CASE",
    "CLASS",
    "CATCH",
    "CONST",
    "CONTINUE",
    "CONSOLE",
    "DEBUGGER",
    "DEF",
    "DEL",
    "DEFAULT",
    "DELETE",
    "DO",
    "ELIF",
    "ELSE",
    "EXPORT",
    "EXTENDS",
    "EXEC",
    "EXCEPT",
    "FINALLY",
    "FOR",
    "FROM",
    "FUNCTION",
    "GLOBAL",
    "IF",
    "IMPORT",
    "IN",
    "INSTANCEOF",
    "INPUT",
    "IS",
    "LAMBDA",
    "LET",
    "LOG",
    "NEW",
    "NOT",
    "OR",
    "PRINT",
    "RAISE",
    "RANGE",
    "RETURN",
    "SUPER",
    "SWITCH",
    "THIS",
    "THROW",
    "TRY",
    "TYPEOF",
    "VAR",
    "VOID",
    "WHILE",
    "WITH",
    "YIELD"
    ];
    // Keyup event
    var posicion = 0;
    var elemento = 0;
    var simbolo = false;
    var linea = 0;
    
    $("#editor").on("keyup", function(e){
        getLinea();
        getPuntero();
        console.log(linea);
        if((e.keyCode>47 && e.keyCode<58) || (e.keyCode>64 && e.keyCode<91)){
            if(this.children.length == 0){
                this.textContent = "";
                div = document.createElement("div");
                div.dataset.linea = 0;
                span = document.createElement("span");
                span.appendChild(document.createTextNode(e.key));
                span.dataset.id = 0;
                div.appendChild(span);
                this.appendChild(div);
                setPuntero(this,0);
            }
            procesamiento(this);
            if(simbolo){
                nuevoSpan(this,e.key);
                simbolo = false;
            }
            console.log(this.children[linea].children[elemento]);
            var encontrado = false
            caracteres = ["",".","("," ",":"];
            for(var j = 0;j<caracteres.length;j++){
    
                for(var i = 0;i<keywords.length;i++){
                    if(this.children[linea].children[elemento].textContent.toUpperCase() == keywords[i]+caracteres[j]){
                        this.children[linea].children[elemento].style.color = "#ff3f34";
                        encontrado = true
                    }
                }
            }
                    if(!encontrado){
                        this.children[linea].children[elemento].style.color = "white";
                    }
        }
        else if(e.keyCode==13){ // Enter
            ordenar_divs(this);
            elemento = 0;
        }
        else if(e.keyCode==8){ //borrar
            ordenar_divs(this);
            if(!encontrado){
                this.children[linea].children[elemento].style.color = "white";
            }
        }
        else if (e.keyCode == 32){ // espacio
            nuevoSpan(this, "\u00a0");
            simbolo = true;
        }
    
        if(e.key == '('){ // ( es el mismo que el 8
            // noSpan(this,e);
            // nuevoSpan(this, "(");
            simbolo = true;
        }
        else if(e.key == ")"){// ) es el mismo que el 9
            noSpan(this,e);
            // nuevoSpan(this, ")");
            simbolo = true;
        }
        else if(e.key == "."){ //punto es el mismo que :
            noSpan(this,e);
            nuevoSpan(this, ".");
            simbolo = true;
        }    
        else if(e.key == ","){//coma el mismo que ;
            noSpan(this,e);
            nuevoSpan(this, ",");
            simbolo = true;
        }
        else if(e.key == '"'){//comillas dobles es el mismo que el 2 (bug :'v)
            // noSpan(this,e);
            // nuevoSpan(this,'"');
            // simbolo = true;
        }
        else if(e.key == "$"){// $ es el mismo que el 3
            noSpan(this,e);
            nuevoSpan(this, "$");
            simbolo = true;
        }
        else if(e.key == "#"){// # es el mismo que el 3
            noSpan(this,e);
            nuevoSpan(this, "#");
            simbolo = true;
        }
        else if(e.key == ":"){// : es el mismo que el .
            noSpan(this,e);
            nuevoSpan(this, ":");
            simbolo = true;
        }
        else if(e.key == ";"){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, ";");
            simbolo = true;
        }
        else if(e.key == "{"){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, "{");
            simbolo = true;
        }
        else if(e.key == "}"){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, "}");
            simbolo = true;
        }
        else if(e.key == "["){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, "[");
            simbolo = true;
        }
        else if(e.key == "]"){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, "]");
            simbolo = true;
        }
        else if(e.key == "="){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, "=");
            simbolo = true;
        }
        else if(e.key == "!"){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, "!");
            simbolo = true;
        }
        else if(e.key == "+"){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, "+");
            simbolo = true;
        }
        else if(e.key == "-"){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, "-");
            simbolo = true;
        }
        else if(e.key == "*"){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, "*");
            simbolo = true;
        }
        else if(e.key == "|"){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, "|");
            simbolo = true;
        }
        else if(e.key == "&"){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, "&");
            simbolo = true;
        }
        else if(e.key == "%"){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, "%");
            simbolo = true;
        }
        else if(e.key == "/"){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, "/");
            simbolo = true;
        }
        else if(e.key == "<"){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, "<");
            simbolo = true;
        }
        else if(e.key == ">"){// ; es el mismo que el ,
            noSpan(this,e);
            nuevoSpan(this, ">");
            simbolo = true;
        }
    });
    $("#editor").on("keydown", function(e){
        if (e.keyCode === 9) { // tab key
            e.preventDefault();  // this will prevent us from tabbing out of the editor
    
            // now insert four non-breaking spaces for the tab key
            var editor = document.getElementById("editor");
            var doc = editor.ownerDocument.defaultView;
            var sel = doc.getSelection();
            var range = sel.getRangeAt(0);
    
            var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
            range.insertNode(tabNode);
            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode); 
            sel.removeAllRanges();
            sel.addRange(range);
        }
    });
    function getLinea() {
        posicion = window.getSelection();
        // console.log(posicion.getRangeAt(0).commonAncestorContainer.parentElement.parentElement.getAttribute("data-linea"));
        linea = parseInt(posicion.getRangeAt(0).commonAncestorContainer.parentElement.parentElement.getAttribute("data-linea"));
    }
    function procesamiento(thiss){
        objeto = thiss.children[linea];
        // noSpan(objeto);
    }
    function ordenar_divs(thiss) {
        for(var i = 0; i<thiss.children.length;i++){
            thiss.children[i].dataset.linea = i;
            for(var j = 0 ; j < thiss.children[i].children.length ; j++){
                thiss.children[i].children[j].dataset.id = j;
            }
        }
    }
    function getEstado(objeto){
        posicion = window.getSelection().focusOffset;
        console.log("objeto "+objeto.getAttribute("data-id")+" en la posicion "+posicion);
        elemento = parseInt(objeto.getAttribute("data-id"));
    };
    function getPuntero(){
        posicion = window.getSelection();
        console.log("objeto "+posicion.getRangeAt(0).commonAncestorContainer.parentElement.getAttribute("data-id")+" en la posicion "+posicion.focusOffset);
        elemento = parseInt(posicion.getRangeAt(0).commonAncestorContainer.parentElement.getAttribute("data-id"));
    }
    function setPuntero(thiss,numero){
            var sel = window.getSelection();
            var child = $(thiss).children();
            var range = document.createRange();
            range.setStart(child[numero],1);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            thiss.focus();
    }
    function nuevoSpan(thiss,caracter){
       
            $(thiss).children()[linea].children[elemento].textContent = $(thiss).children()[linea].children[elemento].textContent.slice(0, -1);
        
        temp = document.createElement("span");
        temp.dataset.id = elemento + 1;
        temp.appendChild(document.createTextNode(caracter));
        thiss.children[linea].insertBefore(temp,$(thiss).children()[linea].children[elemento+1]);
        if(elemento < $(thiss).children()[linea].children.length-2){
                for(let i = elemento + 2; i<$(thiss).children()[linea].children.length;i++){
                    // console.log($(thiss).children()[i]);
                    $(thiss).children()[linea].children[i].dataset.id = i; 
                    // console.log(i);
                }
        }
        setPuntero(thiss.children[linea ],elemento+1);
    }
    
    function noSpan(thiss){
        if($(thiss).children().length == 0){
            console.log(thiss);
            // $(thiss).html() = "";
            span = document.createElement("span");
            span.dataset.id = 0;
            // span.appendChild(document.createTextNode($(thiss).text()));
            thiss.appendChild(span);
            setPuntero(thiss,0);
        }
    }
    
    var xd =document.getElementById("editor");
    function enviar(){
        console.log("enviar");
        contenido = "";
        for(var i = 0; i < $("#editor").children().length;i++){
            contenido += $("#editor").children()[i].textContent.replace("    ","\t");
            contenido += "\n"; 
        }
        $.ajax({
            type:'POST',
            url:'codigo',
            data:{
                codigo: contenido,
                // csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val(),
                action: 'post'
            },
            success:function(data){
                document.getElementById("consola").textContent = data
            },
        });
    }
    function descargar(){
        window.open("descargar")
    }
    