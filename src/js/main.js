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
 * Inicializa un nuevo nivel despues de haber superado el primero
 */
function iniciarNuevoNivel(){
  player.estadoPartida.nivel++;
  if(player.estadoPartida.nivel == 0){
    //TODO:Fin del juego. GANADOR
  }

  alert("Nivel superado! Empecemos el siguiente.");
  loadMap(player.estadoPartida.nivel);
}

/**
 * Genera un objeto random de la pool para recoger por el jugador
 * @return {string} nombre del objeto
 */
function generateObject(){

  let obj = Math.floor(Math.random() * (_.size(objetos) - 1));
  GameData.currentFoundObj = objetos[Object.keys(objetos)[obj]];
  return GameData.currentFoundObj.nombre;
}

/**
 * Ejecuta el proceso de recoger un objeto del suelo
 * o pasar de largo
 * TODO: Mostrar en la UI los objetos de las manos
 */
function iniciarRecogidaDeObjeto(){
  if(confirm("Objeto encontrado! Deseas recoger "+generateObject()+"?")){
    if(confirm("Deseas equiparlo(Aceptar) o guardarlo en la mochila(Cancelar)?")){
      let hand = prompt("¿Quieres equiparlo en la mano derecha o la izquierda?", "D/I");
      let mano;
      switch(hand){
        case "I":
          mano = player.manoizquierda;
        break;
        case "D":
          mano = player.manoderecha;
        break;
      }

      if(mano != null){
        player.personaje.mochila.push(mano);
        $("#objcts").text($("#objcts").text()+", "+mano.nombre);
      }
      mano = GameData.currentFoundObj;

    }else{
      player.personaje.mochila.push(GameData.currentFoundObj);
      $("#objcts").text($("#objcts").text()+", "+GameData.currentFoundObj.nombre);
    }
  }
}

/**
 * TODO: Ejecuta el proceso de entrar en combate con un enemigo
 * encontrado por el camino hacia la salida de la planta
 */
function iniciarCombate(){
  let escape = false;
  if(confirm("Enemigo salvaje apareció! Luchar(Aceptar) o huir(Cancelar)?")){
    
  }
}

/**
 * TODO: carga una partida guardada en el web service montado en
 * el servidor de lasalle
 */
function loadGame(){

}

/**
 * TODO: guarda la partida en su estado actual
 * @return {[type]} [description]
 */
function saveGame(){

}

/**
 * Elimina una partida guardada en el webservice
 * @return {[type]} [description]
 */
function deleteGame(){

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
