var ai = ai || {};  //!< @namespace ai

ai.init = function(){
  setInterval("ai._mainLoop();", 1000 / 120);
  setInterval("api.keepPlay();", 1000 / 60);
  ai.speedDroping = false;
}


ai._mainLoop = function(){
  obs = api.getObstacles();
  if (obs.length != 0){
    var bound = 280 * (api.getCurrentSpeed() / Runner.config.MAX_SPEED);
    var distance = (obs[0].xPos + obs[0].width) - api.getPlayer().xPos;
    var player = api.getPlayer();
    if (0 < distance && distance < bound && obs[0].yPos != 50 && obs[0].yPos != 75 && player.status != 'JUMPING'){
      api.duckStop();
      api.jump();
    }
    else if (player.status == 'JUMPING'){
      if (player.xPos > obs[0].xPos + obs[0].width && !this.speedDroping){
        api.speedDrop();
        this.speedDroping = true;
      }
    }
    else{
      this.speedDroping = false;
      api.duck();
    }
  }
}