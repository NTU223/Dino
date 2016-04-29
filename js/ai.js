var ai = ai || {};  //!< @namespace ai

ai.init = function(){
  setInterval("ai._mainLoop()", 1000 / 60);
}


ai._mainLoop = function(){
  obs = api.getObstacles();
  if (obs.length != 0){
    var bound = 270 * (api.getCurrentSpeed() / Runner.config.MAX_SPEED);
    var distance = obs[0].xPos - api.getPlayer().xPos;
    if (0 < distance && distance < bound && obs[0].yPos != 50)
      api.jump();
  }
}