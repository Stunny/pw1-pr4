/* Inicializar el juego */
function iniciarJuego() {
  /* TODO */
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
