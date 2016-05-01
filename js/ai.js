var ai = ai || {};  //!< @namespace ai

ai.start = function(){
  this.mainLoopIntervalId = setInterval("ai.mainLoop();", 1000 / 120);
  this.keepPlayIntervalId = setInterval("api.keepPlay();", 1000 / 60);
  this.running = true;
};

ai.stop = function(){
  clearInterval(this.mainLoopIntervalId);
  clearInterval(this.keepPlayIntervalId);
  this.running = false;
};

window.addEventListener('keydown', function(e){
  if (e.keyCode == 65){
    if (ai.running)
      ai.stop();
    else
      ai.start();
  }
});

ai.mainLoop = function(){
  obs = api.getObstacles();
  if (obs.length != 0){
    var bound = 250 * (api.getCurrentSpeed() / 13);
    if (api.getCurrentSpeed() >= 11)
      bound = 280 * (api.getCurrentSpeed() / 13);
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
};