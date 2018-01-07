/**
 * Lleva a cabo la creación del personaje
 */
function initPlayer(){
  if(confirm('Empecemos! ¿Listo?')){
    //Nombre y sexo
    player.nombre = prompt("Empecemos por conocerte un poco. ¿Cómo te llamas?", "");
    let sex = prompt("¿Eres un chico, una chica, o te consideras otra cosa y no aceptas la realidadd?", "");
    $("#namesex").text ( player.nombre + "/" +sex);
    player.nombre += '/'+sex;
    //************************Seleccion Tipo de personaje****************************//
    confirm("Ahora escogeremos la raza con la que quieras jugar");

    loadRaceDialog();
    $("#race-dialog").dialog('open');
  }
}

/**
 * Carga el dialog de seleccion de personaje
 */
function loadRaceDialog(){
  var humanImg, elfImg, dwarfImg;

  humanImg = $("#select-human").find("img");
  elfImg = $("#select-elf").find("img");
  dwarfImg = $("#select-dwarf").find("img");

  //Cargar imagenes del dialog de selesccion de raza
  humanImg.attr('src', './img/race-human.png');
  elfImg.attr('src', './img/race-elf.png');
  dwarfImg.attr('src', './img/race-dwarf.png');

  //Asignar los handlers que se encargaran de ver que raza se escoge
  humanImg.click(()=>{
    selectChaaracter("human");
  });
  elfImg.click(()=>{
    selectChaaracter("elf");
  });
  dwarfImg.click(()=>{
    selectChaaracter("dwarf");
  });
}

/**
 * LLeva a cabo la funcionalidad de seleccion de personaje
 * @param  {string} type Tipo de personaje{"human","elf","dwarf"}
 */
function selectChaaracter(type){
  $("#race-dialog").dialog('close');

  switch(type){
    case 'human':
      player.personaje = humano;
    break;
    case 'elf':
      player.personaje = elfo;
    break;
    case 'dwarf':
      player.personaje = enano;
    break;
  }
  $("#img-avatar").attr('src', 'img/'+player.personaje.img);
  $("#img-avatar").css("display", "block");
  iniciarJuego();
}

/* Inicializar el juego por primera vez */
function iniciarJuego() {
  //actualizacion de la UI
  player.nivel = 1;
  $("#level").text(player.nivel);

  player.personaje.xp = 0;
  $("#xpr").text(player.personaje.xp);

  $("#atac").text(player.personaje.ataque);

  $("#protec").text(player.personaje.defensa);

  $("#lifepoints").text(vidaPlayer);

  $("#objcts").text(player.personaje.mochila[0].nombre);

  //generacion del primer piso
  loadMap(-3);
}

/**
 * Pone en ejecucion la partida cargada desde el webservice
 */
function iniciaPartidaCargada(){
  GameData.gameStarted = true;
  mapa = partida.map;
  player = partida.player;

  $("#namesex").text (player.nombre);
  $("#level").text(player.nivel);
  $("#xpr").text(player.personaje.xp);
  $("#atac").text(player.personaje.ataque);
  $("#protec").text(player.personaje.defensa);
  $("#lifepoints").text(vidaPlayer);
  $("#objcts").text(player.personaje.mochila[0].nombre);
  $("#img-avatar").attr('src', 'img/'+player.personaje.img);

  pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
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
 * Mueve el personaje hacia arriba/de frente en el mapa
 * @return {boolean} true si se ha podido llevar a cabo el movimiento
 */
function moveUp() {
  console.log("up");
  switch (player.estadoPartida.direccion){
    case 0:
        if(player.estadoPartida.y - 1 <= 9 && player.estadoPartida.y - 1 >= 0 && compruebaPared(player.estadoPartida.x, player.estadoPartida.y - 1)){
          player.estadoPartida.y--;
          pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
          break;
        }else{
          return false;
        }
      break;
    case 1:
      if(player.estadoPartida.y + 1 <= 9 && player.estadoPartida.y + 1 >= 0 && compruebaPared(player.estadoPartida.x + 1, player.estadoPartida.y)){
        player.estadoPartida.x++;
        pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
        break;
      }else{
        return false;
      }
      break;
    case 2:
      if(player.estadoPartida.x + 1 <= 9 && player.estadoPartida.x + 1 >= 0 && compruebaPared(player.estadoPartida.x, player.estadoPartida.y + 1)){
        player.estadoPartida.y++;
        pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
        break;
      }else{
        return false;
      }
      break;
    case 3:
      if(player.estadoPartida.x - 1 <= 9 && player.estadoPartida.x - 1 >= 0 && compruebaPared(player.estadoPartida.x - 1, player.estadoPartida.y)){
        player.estadoPartida.x--;
        pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
        break;
      }else{
        return false;
      }
      break;
  }

  checkInteraction();
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
          pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
          break;
        }else{
          return false;
        }
      break;
    case 1:
      if(player.estadoPartida.y - 1 <= 9 && player.estadoPartida.y - 1 >= 0 && compruebaPared(player.estadoPartida.x, player.estadoPartida.y - 1)){
        player.estadoPartida.x--;
        pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
        break;
      }else{
        return false;
      }
      break;
    case 2:
      if(player.estadoPartida.x - 1 <= 9 && player.estadoPartida.x - 1 >= 0 && compruebaPared(player.estadoPartida.x - 1, player.estadoPartida.y)){
        player.estadoPartida.y--;
        pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
        break;
      }else{
        return false;
      }
      break;
    case 3:
      if(player.estadoPartida.x + 1 <= 9 && player.estadoPartida.x + 1 >= 0 && compruebaPared(player.estadoPartida.x + 1, player.estadoPartida.y)){
        player.estadoPartida.x++;
        pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
        break;
      }else{
        return false;
      }
      break;
  }

  checkInteraction();
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
  pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
  return true;
}

/**
 * Mueve el personaje hacia izquierda en el mapa
 * @return {boolean} true si se ha podido llevar a cabo el movimiento
 */
function moveLeft() {
  console.log("left");
  player.estadoPartida.direccion--;
  if(player.estadoPartida.direccion == -1){
    player.estadoPartida.direccion = 3;
  }
  pintaPosicion(player.estadoPartida.x, player.estadoPartida.y);
  return true;
}
