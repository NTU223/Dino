var api = api || {};  //!< @namespace api

/**
 * Configuration
 */
api.fps = 60;
api.KEYPRESS_TIME = 1000 / api.fps;
api.speedDroping = false;

/**
 * Get obstacles information.
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
 * Get player(tRex) information.
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
 * Get currentSpeed.
 * @return a number
 */
api.getCurrentSpeed = function(){
  return runner.currentSpeed;
}

/**
 * Check if game is paused
 * @return a boolean
 */
api.isPaused = function(){
  return runner.paused;
}

/**
 * Get keycode
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
  if (this.getPlayer().status != 'JUMPING')
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
  clearInterval(this.speedDropIntervalId);
  this.duckIntervalId = setInterval("api.duck()", this.KEYPRESS_TIME);
}

/**
 * Stop Ducking
 */
api.duckStop = function(){
  clearInterval(this.duckIntervalId);
  Keyboard.keyup(this.getKeycode('DUCK'));
}

/**
 * Checking if not JUMPING
 */
api.speedDropHandler = function(){
  if (this.getPlayer().status != 'JUMPING'){
    Keyboard.keyup(this.getKeycode('DUCK'));
    clearInterval(this.speedDropIntervalId);
    this.speedDroping = false;
  }
}

/**
 * Start Speed Droping
 */
api.speedDrop = function(){
  if (this.speedDroping)
    return;
  this.speedDroping = true;
  Keyboard.keydown(this.getKeycode('DUCK'));
  this.speedDropIntervalId = setInterval("api.speedDropHandler()", this.KEYPRESS_TIME);
}

/**
 * Check if game is paused, then play it
 */
api.keepPlay = function(){
  if (runner.paused)
    runner.play();
}