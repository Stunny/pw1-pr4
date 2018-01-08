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
  nombre: "Goblin",
  vida:5,
  ataque:2,
  defensa:0,
  xp:10,
  img:"goblin.gif",
  objetos:[]
};

var orco = {
  nombre: "Orco",
  vida:12,
  ataque:4,
  defensa:2,
  xp:20,
  img:"orc.gif",
  objetos:[]
};

var araña = {
  nombre: "Araña",
  vida:15,
  ataque:10,
  defensa:8,
  xp:30,
  img:"spider.gif",
  objetos:[]
};

var enemigos = {
  araña, orco, goblin
};

//***************************TIPOS DE PERSONAJE*******************************//

var player = {
  nombre:"",
  vida: vidaPlayer,
  nivel:1,
  personaje:null,
  manoderecha:null,
  manoizquierda:null,
  estadoPartida: {
    x:0,
    y:0,
    nivel:-3,
    direccion:0, /* 0 Norte, 1 Este, 2 Sur, 3 Oeste*/
  }
};

var elfo = {
  ataque:0,
  defensa:0,
  xp:0,
  mochila:[objetos.lembas],
  img: "race-elf.png"
};

var humano = {
  ataque:0,
  defensa:0,
  xp:0,
  mochila:[objetos.palo],
  img: "race-human.png"
};

var enano = {
  ataque:0,
  defensa:0,
  xp:0,
  mochila:[objetos.casco],
  img:"race-dwarf.png"
};

//***************************FUNCIONALIDADES DEL JUEGO************************//

/* Inicializacion de scripts y listeners */
$(document).ready (function () {
  GameData.gameStarted  = false;
  iniciarScripts();
  bindKeyCodes();
});



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
      pintarX++;
    break;
    case 2:
      pintarY++;
    break;
    case 3:
      pintarX--;
    break;
  }
  pintaImagen(mapaToImg(pintarX, pintarY), 0, 0);
}
