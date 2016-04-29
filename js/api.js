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
