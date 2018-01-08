/**
 * Almacena en la variable global de mapa los datos del mismo
 * @param  {[type]} map texto plano del mapa
 */
function buildMap(map){

  map = map.split("\n");
  mapa = [];
  for(let i = 0; i < 10; i++){
    mapa.push(map[i].split(""));
  }

  for(let i = 0; i < 10; i++)
    for(let j = 0; j < 10; j++){
      if(mapa[i][j] == "I"){
        GameData.startPosition = {
          x: j,
          y: i
        };
      }
      if(mapa[i][j] == "S"){
        GameData.exitPosition = {
          x: j,
          y: i
        };
      }
    }

  console.log("MAPA CARGADO");
  console.log(mapa);

  GameData.gameStarted = true;
  player.estadoPartida.x = GameData.startPosition.x;
  player.estadoPartida.y = GameData.startPosition.y;
  player.estadoPartida.direccion = 0;
  pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
}

/**
 * Carga el mapa correspondiente y lo devuelve en una matriz
 * @return {[type]} Matriz con todos los elementos del mapa cargados
 */
function loadMap(mapa){
  let rawMap;
  let fileSrc;
  switch(mapa){
    case -3:
      buildMap(GameData.gameConstants.maps.map3);
      break;
    case -2:
      buildMap(GameData.gameConstants.maps.map2);
      break;
    case -1:
      buildMap(GameData.gameConstants.maps.map1);
      break;
  }

}

/**
 *  Segun el tipo de casilla que sea la que el usuario pretende ir se pintara una
 *  cosa u otra
*/
function mapaToImg(x, y) {
  let casilla = mapa[y][x];
  let imgSrc;
  switch(casilla){
    case 'W': //Trollwall
      imgSrc = '/pasillo.png';
    break;
    case 'P': //Pared visible
      imgSrc = '/muro.jpg';
    break;
    case 'E'://ENEMIGO
      generateEnemy();
      imgSrc = "./"+GameData.currentEnemy.img;
    break;
    case 'O'://Objeto
      imgSrc = '/object.png';
    break;
    case 'I'://Entrada
      imgSrc = '/eingang.png';
    break;
    case 'S'://Salida
      imgSrc = '/ausgang.png';
    break;
    default:
      imgSrc = '/pasillo.png';
    break;
  }
  return imgSrc;
}

/**
 * Comprueba si la casilla en la que se encuentra el jugador debe ejecutar
 * alguna interaccion de combate/salida/recoger objeto
 */
function checkInteraction(){
  let playerPosX = player.estadoPartida.x;
  let playerPosY = player.estadoPartida.y;
  //console.log(mapa[playerPosY][playerPosX]);
  switch(mapa[playerPosY][playerPosX]){
    case "E"://CAsilla de enemigo: activar combate

      iniciarCombate();
    break;

    case "O": //Casilla de objeto: interfaz de recogida de objeto
      iniciarRecogidaDeObjeto();
    break;

    case "S":
      iniciarNuevoNivel();
    break;

    default: break;
  }
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
