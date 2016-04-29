var api = api || {};  //!< @namespace api

/**
 * Gets obstacles information.
 * @return a list of obstacles
 */
api.getObstacles = function(){
  var obs = [];
  for (var i in runner.horizon.obstacles){
    var obstacle = runner.horizon.obstacles[i];
    var ob = {};
    for (var key in obstacle)
      ob[key] = obstacle[key];
    obs.push(ob);
  }
  return obs;
}

/**
 * Gets player(tRex) information.
 * @return a dict of obstacles
 */
api.getPlayer = function(){
  var player = {};
  var tRex = runner.tRex;
  for (var key in tRex)
    player[key] = tRex[key];
  return player;
}

/**
 * Gets keycode
 * @param {keycode name}, like 'JUMP', 'DUCK'
 */
api.getKeycode = function(type){
  for (var keycode in Runner.keycodes[type])
    return keycode;
}

/**
 * Jump
 */
api.jump = function(){
  Keyboard.keydown(this.getKeycode('JUMP'));
}

/**
 * Duck
 */
api.duck = function(){
  Keyboard.keydown(this.getKeycode('DUCK'));
}

/**
 * Start Ducking
 */
api.duckStart = function(){
  this.duckIntervalId = setInterval("api.duck()", 50);
}

/**
 * Stop Ducking
 */
api.duckStop = function(){
  clearInterval(this.duckIntervalId);
  Keyboard.keyup(this.getKeycode('DUCK'));
}