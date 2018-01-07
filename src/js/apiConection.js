/**
 * Carga una partida guardada en el web service montado en
 * el servidor de lasalle
 */
function loadGame(){
  let slot;
  do{
    slot = prompt("¿Qué slot de partida quieres cargar?", "1 / 2");
  }while (slot != "1" && slot != "2");

  let url = GameData.gameConstants.apiURL+"?token="+GameData.gameConstants.apiToken+"&slot="+slot;

  let get = $.ajax({
    async : true,
    type : 'get',
    url: url,
    error: (jqXHR, textStatus, errorThrown)=>{
      if(textStatus != "success"){
        alert(textStatus+": No hay nada este slot 😔");
      }
    }
  });

  get.done((game, txtstatus)=>{
    console.log(txtstatus);
    partida = JSON.parse(game);
    if(txtstatus != "success"){
      alert(txtstatus+": Se ha producido un error 😔");
    }else{
      alert("Partida cargada! 😁");
      iniciaPartidaCargada();
    }
  });

  get.fail((jqxhr, textStatus, errorThrown)=>{
    console.log(textStatus, errorThrown, errorThrown.msg);
  });
}

/**
 * Guarda la partida en su estado actual
 */
function saveGame(){
  partida.player = player;
  partida.map = mapa;

  let slot;
  do{
    slot = prompt("¿En que slot de guardado quieres almacenar la partida?", "1 / 2");
  }while (slot != "1" && slot != "2");

  let url = GameData.gameConstants.apiURL+"?token="+GameData.gameConstants.apiToken+"&slot="+slot;

  let post = $.ajax({
    async : true,
    type : 'post',
    url: url,
    data: {json:JSON.stringify(partida)},
    error: (jqXHR, textStatus, errorThrown)=>{
      if(textStatus != "success"){
        alert(textStatus+": No se ha podido guardar en este slot 😔");
      }
    }
  });

  post.done((res, txtstatus)=>{
    console.log(txtstatus);
    if(txtstatus != "success"){
      alert(txtstatus+": Se ha producido un error 😔");
    } else {
      alert("Partida guardada con éxito!");
    }

  });

  post.fail((jqxhr, textStatus, errorThrown)=>{
    console.log(textStatus, errorThrown, errorThrown.msg);
  });
}

/**
 * Elimina una partida guardada en el webservice
 * PLS NO DELET DIS
 */
function deleteGame(){
  let slot;
  do{
    slot = prompt("¿Qué slot de partida quieres vaciar?", "1 / 2");
  }while (slot != "1" && slot != "2");


  let url = GameData.gameConstants.apiURL+"?token="+GameData.gameConstants.apiToken+"&slot="+slot;

  let del = $.ajax({
    async : true,
    type : 'delete',
    url: url,
    error: (jqXHR, textStatus, errorThrown)=>{
      if(textStatus != "success"){
        alert(textStatus+": No se ha podido vaciar este slot 😔");
      }
    }
  });

  del.done((game, txtstatus)=>{
    console.log(txtstatus);
    if(txtstatus == "success"){
      alert("Slot vaciado! 😁");
    }else{
      alert(txtstatus+": Se ha producido un error 😔");
    }

  });

  del.fail((jqxhr, textStatus, errorThrown)=>{
    console.log(textStatus, errorThrown, errorThrown.msg);
  });
}
