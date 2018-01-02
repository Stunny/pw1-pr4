
/* Inicializar el juego */
function iniciarJuego() {
  loadMap(-3);
  /* TODO */
}

/**
 * Carga el mapa correspondiente y lo devuelve en una matriz
 * @return {[type]} Matriz con todos los elementos del mapa cargados
 */
function loadMap(mapa){
  switch(mapa){
    case -3:

      break;
    case -2:

      break;
    case -1:

      break;
  }

}

/**
 *  Segun el tipo de casilla que sea la que el usuario pretende ir se pintara una
 *  cosa u otra
*/
function mapaToImg(x, y) {


}

/**
 * Asocia las diferentes teclas pulsadas a los eventos que tienen que darse
 * segun lo que el usuario pulse
 * @return {boolean} True siempre
 */
function bindKeyCodes(){
  $(document).keypress((e)=>{
    console.log("key pressed");
    switch(e.which){
      case window.gameConstants.MOVE_DOWN_CODE:
        moveDown();
        break;
      case window.gameConstants.MOVE_UP_CODE:
        moveUp();
        break;
      case window.gameConstants.MOVE_LEFT_CODE:
        moveLeft();
        break;
      case window.gameConstants.MOVE_RIGHT_CODE:
        moveRight();
        break;
      default:
      console.log(e.which);
    }
  });

  return true;
}
