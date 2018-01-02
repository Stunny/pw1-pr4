/**
 * Asocia los diferentes scripts controladores asociados a botones
 * del documento HTML
 */
function iniciarScripts(){
  $("#movesquerra").click((e)=>{
    moveLeft();
  })
  $("#movdreta").click((e)=>{
    moveRight();
  })
  $("#movendavant").click((e)=>{
    moveUp();
  })
  $("#movendarrere").click((e)=>{
    moveDown();
  })
}


/* No tocar código */
var partida = {};
var vidaPlayer = 10;

/*
  Dimensió: 10x10
*/
var mapa = [];

var objetos = {
  piedra: {ataque:1, defensa:0, hp:0},
  palo: {ataque:2, defensa:0, hp:0},
  daga: {ataque:5, defensa:0, hp:0},
  escudo: {ataque:0, defensa:3, hp:0},
  casco: {ataque:0, defensa:2, hp:0},
  peto: {ataque:0, defensa:5, hp:0},
  pocion: {ataque:0, defensa:0, hp:vidaPlayer/2},
  lembas: {ataque:0, defensa:0, hp:vidaPlayer},
  vendas: {ataque:0, defensa:0, hp:5},
  flor: {ataque:0, defensa:0, hp:0}
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
  vida: vidaPlayer,
  nivel:0,
  personaje:null,
  manoderecha:"",
  manoizquierda:"",
  estadoPartida: {
    x:4,
    y:1,
    nivel:-3,
    direccion:1, /* 0 Norte, 1 Sud, 2 Este, 3 Oeste*/
  }
};

var elfo = {
  ataque:4,
  defensa:4,
  xp:0,
  img:"",
  mochila:[objetos.lembas]
};

var humano = {
  ataque:5,
  defensa:3,
  xp:0,
  img:"",
mochila:[objetos.palo]
};

var enano = {
  ataque:6,
  defensa:2,
  xp:0,
  img:"",
  mochila:[objetos.casco]
};

/* Se llama al cargar todos los elementos de la página */
window.onload = function () {
  iniciarScripts();
  bindKeyCodes();
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

/*Comprueba que al moverse no haya una pared */
function compruebaPared(x, y){

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
          return true;
        }else{
          return false;
        }
      break;
    case 1:
      if(player.estadoPartida.y + 1 <= 9 && player.estadoPartida.y + 1 >= 0 && compruebaPared(player.estadoPartida.x, player.estadoPartida.y + 1)){
        player.estadoPartida.y++;
        return true;
      }else{
        return false;
      }
      break;
    case 2:
      if(player.estadoPartida.x + 1 <= 9 && player.estadoPartida.x + 1 >= 0 && compruebaPared(player.estadoPartida.x + 1, player.estadoPartida.y)){
        player.estadoPartida.x++;
        return true;
      }else{
        return false;
      }
      break;
    case 3:
      if(player.estadoPartida.x - 1 <= 9 && player.estadoPartida.x - 1 >= 0 && compruebaPared(player.estadoPartida.x - 1, player.estadoPartida.y)){
        player.estadoPartida.x--;
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
          return true;
        }else{
          return false;
        }
      break;
    case 1:
      if(player.estadoPartida.y - 1 <= 9 && player.estadoPartida.y - 1 >= 0 && compruebaPared(player.estadoPartida.x, player.estadoPartida.y - 1)){
        player.estadoPartida.y--;
        return true;
      }else{
        return false;
      }
      break;
    case 2:
      if(player.estadoPartida.x - 1 <= 9 && player.estadoPartida.x - 1 >= 0 && compruebaPared(player.estadoPartida.x - 1, player.estadoPartida.y)){
        player.estadoPartida.x--;
        return true;
      }else{
        return false;
      }
      break;
    case 3:
      if(player.estadoPartida.x + 1 <= 9 && player.estadoPartida.x + 1 >= 0 && compruebaPared(player.estadoPartida.x + 1, player.estadoPartida.y)){
        player.estadoPartida.x++;
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
  return true;
}
