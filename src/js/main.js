/* Inicializar el juego */
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

  //Establecer listeners de enemigos y de objetos


}

function buildMap(map){
  console.log(map);
}

/**
 * Carga el mapa correspondiente y lo devuelve en una matriz
 * @return {[type]} Matriz con todos los elementos del mapa cargados
 * TODO: generacion de mapa
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
  let casilla = mapa[x][y];
  let imgSrc;
  switch(casilla){
    case 'W': //Trollwall
      imgSrc = './img/trollwall.png';
    break;
    case 'P': //Pared visible
      imgSrc = './img/trollwall.png';
    break;
    case 'E'://ENEMIGO
      imgSrc = './img/enemy.png';
    break;
    case 'O'://Objeto
      imgSrc = './img/object.png';
    break;
    case 'I'://Entrada
      imgSrc = './img/entrance.png';
    break;
    case 'S'://Salida
      imgSrc = './img/trollwall.png';
    break;
    default:
      imgSrc = './img/trollwall.png';
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
