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
    var player = api.getPlayer();
    if (player.status == 'JUMPING'){
      var prev = -1;
      for (var i = 0; i < obs.length; i++)
        if (obs[i].xPos < player.xPos)
          prev = i;
      if (prev == -1)
        return;
      if (player.xPos > obs[prev].xPos + obs[prev].width / 2){
        api.speedDrop();
      }
    }
    else if (player.status == 'RUNNING' || player.status == 'DUCKING'){
      var next = -1;
      for (var i = obs.length - 1; i >= 0; i--)
        if (obs[i].xPos > player.xPos)
          next = i;
      if (next == -1)
        return;
      var distance = obs[next].xPos - player.xPos;
      if (distance < bound && obs[next].yPos != 50 && obs[next].yPos != 75){
        api.duckStop();
        api.jump();
      }
      else{
        api.duck();
      }
    }
  }
}