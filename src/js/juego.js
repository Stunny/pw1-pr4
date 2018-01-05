/* No tocar código */
var partida = {};
var vidaPlayer = 10;

/*
  Dimensió: 10x10
*/
var mapa = [];

var objetos = {
  piedra: {nombre: "piedra",ataque:1, defensa:0, hp:0},
  palo: {nombre: "palo",ataque:2, defensa:0, hp:0},
  daga: {nombre: "daga",ataque:5, defensa:0, hp:0},
  escudo: {nombre: "escudo",ataque:0, defensa:3, hp:0},
  casco: {nombre: "casco",ataque:0, defensa:2, hp:0},
  peto: {nombre: "peto",ataque:0, defensa:5, hp:0},
  pocion: {nombre: "pocion",ataque:0, defensa:0, hp:vidaPlayer/2},
  lembas: {nombre: "lembas",ataque:0, defensa:0, hp:vidaPlayer},
  vendas: {nombre: "vendas",ataque:0, defensa:0, hp:5},
  flor: {nombre: "flor",ataque:0, defensa:0, hp:0}
};

//IMPLEMENTAR XP Y OBJETOS DE LOS ENEMIGO DE FORMA QUE NO ESTEN OP
//***************************TIPOS DE ENEMIGO*********************************//
var goblin = {
  vida:5,
  ataque:2,
  defensa:0,
  xp:0,
  img:"",
  objetos:[]
};

var orco = {
  vida:7,
  ataque:4,
  defensa:2,
  xp:0,
  img:"",
  objetos:[]
};

var araña = {
  vida:10,
  ataque:7,
  defensa:6,
  xp:0,
  img:"",
  objetos:[]
};


//***************************TIPOS DE PERSONAJE*******************************//

var player = {
  nombre:"",
  vida: vidaPlayer,
  nivel:0,
  personaje:null,
  manoderecha:"",
  manoizquierda:"",
  estadoPartida: {
    x:0,
    y:0,
    nivel:-3,
    direccion:0, /* 0 Norte, 1 Sud, 2 Este, 3 Oeste*/
  }
};

var elfo = {
  ataque:0,
  defensa:0,
  xp:0,
  mochila:[objetos.lembas]
};

var humano = {
  ataque:0,
  defensa:0,
  xp:0,
  mochila:[objetos.palo]
};

var enano = {
  ataque:0,
  defensa:0,
  xp:0,
  mochila:[objetos.casco]
};

//***************************FUNCIONALIDADES DEL JUEGO************************//

/* Inicializacion de scripts y listeners */
$(document).ready (function () {
  GameData.gameStarted  = false;
  iniciarScripts();
  bindKeyCodes();
});

function loadRaceDialog(){
  var humanImg, elfImg, dwarfImg;

  humanImg = $("#select-human").find("img");
  elfImg = $("#select-elf").find("img");
  dwarfImg = $("#select-dwarf").find("img");

  //Cargar imagenes del dialog de selesccion de raza
  humanImg.attr('src', './img/race-human.png');
  elfImg.attr('src', './img/race-elf.png');
  dwarfImg.attr('src', './img/race-dwarf.png');

  //Asignar los handlers que se encargaran de ver que raza se escoge
  humanImg.click(()=>{
    selectChaaracter("human");
  });
  elfImg.click(()=>{
    selectChaaracter("elf");
  });
  dwarfImg.click(()=>{
    selectChaaracter("dwarf");
  });
}

/**
 * Lleva a cabo la creación del personaje
 */
function initPlayer(){
  if(confirm('Empecemos! ¿Listo?')){
    //Nombre y sexo
    player.nombre = prompt("Empecemos por conocerte un poco. ¿Cómo te llamas?", "");
    let sex = prompt("¿Eres un chico, una chica, o te consideras otra cosa y no aceptas la realidadd?", "");
    $("#namesex").text ( player.nombre + "/" +sex);

    //************************Seleccion Tipo de personaje****************************//
    confirm("Ahora escogeremos la raza con la que quieras jugar");

    loadRaceDialog();
    $("#race-dialog").dialog('open');
  }
}

function selectChaaracter(type){
  $("#race-dialog").dialog('close');

  switch(type){
    case 'human':
      player.personaje = humano;
      $("#img-avatar").attr('src', 'img/race-human.png');
    break;
    case 'elf':
      player.personaje = elfo;
      $("#img-avatar").attr('src', 'img/race-elf.png');
    break;
    case 'dwarf':
      player.personaje = enano;
      $("#img-avatar").attr('src', 'img/race-dwarf.png');
    break;
  }
  $("#img-avatar").css("display", "block");
  iniciarJuego();
}

/*  Pinta imagen en el visor */
function pintaImagen(src, x, y) {
  // Consigue el canvas
  var canvas = document.getElementById('visor');
  var context = canvas.getContext('2d');
  var base_image = new Image();
  base_image.src = "./img/"+src;
  base_image.onload = function () {
    // Pinta imagen en el canvas
    context.drawImage(this, x, y);
  };
}

/* Pinta al visor lo que el jugador tiene delante en el mapa */
/**
 * [pintaPosicion description]
 * @param  {[type]} x Coordenada x del jugador
 * @param  {[type]} y Coordenada y del jugador
 */
function pintaPosicion(x, y) {
  var pintarX = x, pintarY = y;
  switch(player.estadoPartida.direccion){
    case 0:
      pintarY--;
    break;
    case 1:
      pintarY++;
    break;
    case 2:
      pintarX++;
    break;
    case 3:
      pintarY--;
    break;
  }
  pintaImagen(mapaToImg(pintarX, pintarY), 0, 0);
}

/*Comprueba que al moverse no haya una pared */
/**
 * @return {boolean} true si la casilla NO es una pared
 */
function compruebaPared(x, y){
  if(mapa[y][x] == "P" || mapa[y][x] == "W"){
    return false;
  }
  return true;
}

/**
 * Mueve el personaje hacia arriba/de frente en el mapa
 * @return {boolean} true si se ha podido llevar a cabo el movimiento
 */
function moveUp() {
  console.log("up");
  switch (player.estadoPartida.direccion){
    case 0:
        if(player.estadoPartida.y - 1 <= 9 && player.estadoPartida.y - 1 >= 0 && compruebaPared(player.estadoPartida.x, player.estadoPartida.y - 1)){
          player.estadoPartida.y--;
          pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
          return true;
        }else{
          return false;
        }
      break;
    case 1:
      if(player.estadoPartida.y + 1 <= 9 && player.estadoPartida.y + 1 >= 0 && compruebaPared(player.estadoPartida.x, player.estadoPartida.y + 1)){
        player.estadoPartida.y++;
        pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
        return true;
      }else{
        return false;
      }
      break;
    case 2:
      if(player.estadoPartida.x + 1 <= 9 && player.estadoPartida.x + 1 >= 0 && compruebaPared(player.estadoPartida.x + 1, player.estadoPartida.y)){
        player.estadoPartida.x++;
        pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
        return true;
      }else{
        return false;
      }
      break;
    case 3:
      if(player.estadoPartida.x - 1 <= 9 && player.estadoPartida.x - 1 >= 0 && compruebaPared(player.estadoPartida.x - 1, player.estadoPartida.y)){
        player.estadoPartida.x--;
        pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
        return true;
      }else{
        return false;
      }
      break;
  }
}

/**
 * Mueve el personaje hacia abajo/atras en el mapa
 * @return {boolean} true si se ha podido llevar a cabo el movimiento
 */
function moveDown() {
  console.log("down");
  switch (player.estadoPartida.direccion){
    case 0:
        if(player.estadoPartida.y + 1 <= 9 && player.estadoPartida.y + 1 >= 0 && compruebaPared(player.estadoPartida.x, player.estadoPartida.y + 1)){
          player.estadoPartida.y++;
          pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
          return true;
        }else{
          return false;
        }
      break;
    case 1:
      if(player.estadoPartida.y - 1 <= 9 && player.estadoPartida.y - 1 >= 0 && compruebaPared(player.estadoPartida.x, player.estadoPartida.y - 1)){
        player.estadoPartida.y--;
        pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
        return true;
      }else{
        return false;
      }
      break;
    case 2:
      if(player.estadoPartida.x - 1 <= 9 && player.estadoPartida.x - 1 >= 0 && compruebaPared(player.estadoPartida.x - 1, player.estadoPartida.y)){
        player.estadoPartida.x--;
        pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
        return true;
      }else{
        return false;
      }
      break;
    case 3:
      if(player.estadoPartida.x + 1 <= 9 && player.estadoPartida.x + 1 >= 0 && compruebaPared(player.estadoPartida.x + 1, player.estadoPartida.y)){
        player.estadoPartida.x++;
        pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
        return true;
      }else{
        return false;
      }
      break;
  }
}

/**
 * Mueve el personaje hacia derecha en el mapa
 * @return {boolean} true si se ha podido llevar a cabo el movimiento
 */
function moveRight() {
  console.log("right");
  player.estadoPartida.direccion++;
  if(player.estadoPartida.direccion == 4){
    player.estadoPartida.direccion = 0;
  }
  pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
  return true;
}

/**
 * Mueve el personaje hacia izquierda en el mapa
 * @return {boolean} true si se ha podido llevar a cabo el movimiento
 */
function moveLeft() {
  console.log("left");
  player.estadoPartida.direccion--;
  if(player.estadoPartida.direccion == 0){
    player.estadoPartida.direccion = 3;
  }
  pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
  return true;
}
