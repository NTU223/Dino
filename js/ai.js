var ai = ai || {};  //!< @namespace ai

ai.init = function(){
  setInterval("ai._mainLoop();", 1000 / 120);
  setInterval("api.keepPlay();", 1000 / 60);
  ai.speedDroping = false;
}


ai._mainLoop = function(){
  obs = api.getObstacles();
  if (obs.length != 0){
    var bound = 350 * (api.getCurrentSpeed() / Runner.config.MAX_SPEED);
    var distance = (obs[0].xPos + obs[0].width) - api.getPlayer().xPos;
    var next = 0;
    if (distance < 0)
      next = 1;
    distance = (obs[next].xPos + obs[next].width) - api.getPlayer().xPos;
    var player = api.getPlayer();
    if (0 < distance && distance < bound && obs[next].yPos != 50 && obs[next].yPos != 75 && player.status != 'JUMPING'){
      api.duckStop();
      api.jump();
    }
    else if (player.status == 'JUMPING'){
      if (player.xPos > obs[0].xPos + obs[0].width / 2 && !this.speedDroping){
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