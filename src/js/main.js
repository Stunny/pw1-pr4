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
  $(document).keydown((e)=>{
    switch(e.which){
      case 83:
        moveDown();
      break;
      case 87:
        moveUp();
      break;
      case 65:
        moveLeft();
      break;
      case 68:
        moveRight();
      break;
    }
  });

  return true;
}
