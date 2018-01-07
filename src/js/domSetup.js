/**
 * Asocia las diferentes teclas pulsadas a los eventos que tienen que darse
 * segun lo que el usuario pulse
 * @return {boolean} True siempre
 */
function bindKeyCodes(){
  $(document).keypress((e)=>{
    if(GameData.gameStarted){
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

  $("#loadGame").click((e)=>{
    loadGame();
  });

  $("#saveGame").click((e)=>{
    saveGame();
  });

  $("#deleteGame").click((e)=>{
    deleteGame();
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
