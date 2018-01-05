/* Inicializar el juego por primera vez */
function iniciarJuego() {
  //actualizacion de la UI
  player.nivel = 1;
  $("#level").text(player.nivel);

  player.personaje.xp = 0;
  $("#xpr").text(player.personaje.xp);

  $("#atac").text(player.personaje.ataque);

  console.log($("#protec").text(player.personaje.defensa));

  $("#lifepoints").text(vidaPlayer);

  $("#objcts").text(player.personaje.mochila[0].nombre);

  //generacion del primer piso
  loadMap(-3);
}

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
    }

  console.log("MAPA CARGADO");
  console.log(mapa);

  GameData.gameStarted = true;
  player.estadoPartida.x = GameData.startPosition.x;
  player.estadoPartida.y = GameData.startPosition.y;
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
      imgSrc = '/wall.png';
    break;
    case 'E'://ENEMIGO
      imgSrc = '/enemy.png';
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
 * Asocia las diferentes teclas pulsadas a los eventos que tienen que darse
 * segun lo que el usuario pulse
 * @return {boolean} True siempre
 */
function bindKeyCodes(){
  $(document).keypress((e)=>{
    if(GameData.gameStarted){
      console.log("key pressed");
      switch(e.which){
        case GameData.gameConstants.MOVE_DOWN_CODE:
          moveDown();
          break;
        case GameData.gameConstants.MOVE_UP_CODE:
          moveUp();
          break;
        case GameData.gameConstants.MOVE_LEFT_CODE:
          moveLeft();
          break;
        case GameData.gameConstants.MOVE_RIGHT_CODE:
          moveRight();
          break;
        default:
        console.log(e.which);
      }
    }
  });

  return true;
}


/**
 * Asocia los diferentes scripts controladores asociados a botones
 * del documento HTML
 */
function iniciarScripts(){
  GameData.canvas = $('#visor');

  //Inicializacion del dialog de seleccion de raza
  $("#race-dialog").dialog({
      autoOpen: false,
      modal:true,
      close:()=>{
        $("#race-dialog").hide();
      },
      height: 380,
      width: 750,
      modal: true,
      draggable: false
  });

  $("#startGame").click((e)=>{
    initPlayer();
  });

  $("#movesquerra").click((e)=>{
    if(GameData.gameStarted)
      moveLeft();
  });
  $("#movdreta").click((e)=>{
    if(GameData.gameStarted)
      moveRight();
  });
  $("#movendavant").click((e)=>{
    if(GameData.gameStarted)
      moveUp();
  });
  $("#movendarrere").click((e)=>{
    if(GameData.gameStarted)
      moveDown();
  });
}
