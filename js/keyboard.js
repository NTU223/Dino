/**
 * refer: http://stackoverflow.com/questions/10455626/keydown-simulation-in-chrome-fires-normally-but-not-the-correct-key/10520017#10520017
 */

var Keyboard = Keyboard || {};

/**
 * Send keydown event.
 * @param {keycode}
 */
Keyboard.keydown = function(k) {
  var oEvent = document.createEvent('KeyboardEvent');

  // Chromium Hack
  Object.defineProperty(oEvent, 'keyCode', {
              get : function() {
                  return this.keyCodeVal;
              }
  });     
  Object.defineProperty(oEvent, 'which', {
              get : function() {
                  return this.keyCodeVal;
              }
  });     

  if (oEvent.initKeyboardEvent) {
    oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
  }
  else {
    oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
  }

  oEvent.keyCodeVal = k;

  if (oEvent.keyCode !== k) {
    alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
  }

  document.dispatchEvent(oEvent);
}

/**
 * Send keyup event.
 * @param {keycode}
 */
Keyboard.keyup = function(k) {
    var oEvent = document.createEvent('KeyboardEvent');

    // Chromium Hack
    Object.defineProperty(oEvent, 'keyCode', {
                get : function() {
                    return this.keyCodeVal;
                }
    });     
    Object.defineProperty(oEvent, 'which', {
                get : function() {
                    return this.keyCodeVal;
                }
    });     

    if (oEvent.initKeyboardEvent) {
      oEvent.initKeyboardEvent("keyup", true, true, document.defaultView, false, false, false, false, k, k);
    }
    else {
      oEvent.initKeyEvent("keyup", true, true, document.defaultView, false, false, false, false, k, 0);
    }

    oEvent.keyCodeVal = k;

    if (oEvent.keyCode !== k) {
        alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
    }

    document.dispatchEvent(oEvent);
}
