//Declaración de constantes.
const MAX_INTENTOS = 10;
const MAX_COMBI_COLORES = 4;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const WHITE = "white";
const BLACK = "black";


//Declaración de variables globales.
var master = [];
var userCombi = [];
var intento = 1;
var aciertos = 0;

function init() {
    let result = document.querySelector('#result');

    //1. Genera el código random del master
    master = randomCombo();
    console.log(master)
    //2. Crea todas las filas según el número de intentos.
    for (let i = 0; i < MAX_INTENTOS; i++) 
        result.insertAdjacentHTML('beforeend', ROW_RESULT);
}

function randomCombo(){
    let combo= [];
    for(let i=0; i<MAX_COMBI_COLORES; i++){
      let aleatorio= COLORS[Math.floor(Math.random() * COLORS.length)];
        combo.push(aleatorio);
    }

    return combo
}

/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha
introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function Comprobar() {
    if (userCombi.length<4 || intento>MAX_INTENTOS) return;

    userCombi.forEach(function(color, index) {
        const circle= document.querySelector(`#result .rowResult:nth-child(${intento}) .rowCercleResult div:nth-child(${index+1}) .cercleResult`);
        if(color == master[index]){
            /**poner la bolita en negro */
            circle.classList.add("blackColor");
            aciertos++;
        }else{
            if(master.some(masterColor => masterColor == color)){
                /**pintar a blanco si está pero no en la posición*/
                circle.classList.add("whiteColor");
            }
        }
    });

    if(aciertos==4){
        document.getElementById("info").innerHTML="Has ganado!!";
       let cubeMaster = document.querySelectorAll("#master div div div");
       cubeMaster.forEach(function (element, index){
        element.classList.add(master[index])
       });
    }else{
        intento++;

        if(intento> MAX_INTENTOS){
            document.getElementById("info").innerHTML="Intentalo otra vez";
            let cubeMaster = document.querySelectorAll("#master div div div");
            cubeMaster.forEach(function (element, index){
             element.classList.add(master[index])
            });
        }

        aciertos = 0;
        userCombi = [];
    } 
}

/** Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores permitidos en la combinación. */
function añadeColor(color) {
    if (userCombi.length >= 4) return;

    userCombi.push(color);
    const column = userCombi.length;
    let cube = document.querySelector(`#result .rowResult:nth-child(${intento}) .rowUserCombi div:nth-child(${column}) .celUserCombi`);

    if (cube == null) return; /**daba nulo en algun momento, aseguramos k si es null se salga */
    cube.classList.add(color);
}


/** Template con el código HTML que corresponde a cada fila de juego/intento. */
const ROW_RESULT = `<div class="rowResult w100 flex wrap">
    <div class="rowUserCombi w75 flex wrap">
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
       <div class="w25">
           <div class="celUserCombi flex"></div>
       </div>
    </div>
    <div class="rowCercleResult w25 flex wrap center">
       <div class="w40 h40">
            <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
       <div class="w40 h40">
           <div class="cercleResult flex"></div>
       </div>
    <div>
</div>`;