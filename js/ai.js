var ai = ai || {};  //!< @namespace ai

ai.init = function(){
  setInterval("ai._mainLoop()", 1000 / 60);
}


ai._mainLoop = function(){
  obs = api.getObstacles();
  if (obs.length != 0){
    var bound = 270 * (api.getCurrentSpeed() / Runner.config.MAX_SPEED);
    var distance = (obs[0].xPos + obs[0].width) - api.getPlayer().xPos;
    var player = api.getPlayer();
    if (0 < distance && distance < bound && obs[0].yPos != 50 && player.status != 'JUMPING')
      api.jump();
    if (player.status == 'JUMPING'){
      console.log(player.xPos + ',' + (obs[0].xPos + obs[0].width));
      if (player.xPos > obs[0].xPos + obs[0].width){
        console.log('drop');
        api.speedDrop();
      }
    }
  }
}