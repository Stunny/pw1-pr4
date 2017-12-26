/* No tocar código */
var partida = {};

/*
  Dimensió: 10x10
*/
var mapa = [];

var objetos = {
  piedra: {ataque:1, defensa:0, vida:0},
  palo: {ataque:2, defensa:0, vida:0},
  daga: {ataque:5, defensa:0, vida:0},
  escudo: {ataque:0, defensa:3, vida:0},
  casco: {ataque:0, defensa:2, vida:0},
  peto: {ataque:0, defensa:5, vida:0},
  pocion: {ataque:0, defensa:0, vida:vidaTotal/2},
  lembas: {ataque:0, defensa:0, vida:vidaTotal},
  vendas: {ataque:0, defensa:0, vida:5},
  flor: {ataque:0, defensa:0, vida:0}
};

//TODO: IMPLEMENTAR XP Y OBJETOS DE LOS ENEMIGO DE FORMA QUE NO ESTEN OP
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

var player = {
  nombre:"",
  vida:10,
  nivel:0,
  personaje:null,
  manoderecha:"",
  manoizquierda:"",
  estadoPartida: {
    x:4,
    y:1,
    nivel:-3,
    direccion:0, /* 0 Norte, 1 Sud, 2 Este, 3 Oeste*/
  }
};

var elfo = {
  ataque:4,
  defensa:4,
  xp:0,
  img:"",
  mochila:[lembas]
};

var humano = {
  ataque:5,
  defensa:3,
  xp:0,
  img:"",
mochila:[palo]
};

var enano = {
  ataque:6,
  defensa:2,
  xp:0,
  img:"",
  mochila:[casco]
};

/* Se llama al cargar todos los elementos de la página */
window.onload = function () {
  iniciarJuego();
};

/*  Pinta imagen en el visor */
function pintaImagen(src, x, y) {
  // Consigue el canvas
  var canvas = document.getElementById('visor');
  var context = canvas.getContext('2d');
  var base_image = new Image();
  base_image.src = "./media/images/"+src;
  base_image.onload = function () {
    // Pinta imagen en el canvas
    context.drawImage(this, x, y);
  };
}

/* Pinta al visor lo que hay en el mapa */
function pintaPosicion(x, y) {
  pintaImagen(mapaToImg(x, y), 0, 0);
}

/**
 * Mueve el personaje hacia arriba/de frente en el mapa
 * @return {boolean} true si se ha podido llevar a cabo el movimiento
 */
function moveUp() {

}

/**
 * Mueve el personaje hacia abajo/atras en el mapa
 * @return {boolean} true si se ha podido llevar a cabo el movimiento
 */
function moveDown() {

}

/**
 * Mueve el personaje hacia derecha en el mapa
 * @return {boolean} true si se ha podido llevar a cabo el movimiento
 */
function moveRight() {

}

/**
 * Mueve el personaje hacia izquierda en el mapa
 * @return {boolean} true si se ha podido llevar a cabo el movimiento
 */
function moveUp() {

}
