var upDown = false;
var downDown = false;
var spacePressed = false;

var keyUP = 38;
var keyDOWN = 40;
var keySPACE = 32;

var keyA = 65;
var keyZ = 90;
var keyX = 88;

function onKeyDown(evt) {
  if (evt.keyCode == keyUP || evt.keyCode == keyA) upDown = true;
  else if (evt.keyCode == keyDOWN || evt.keyCode == keyZ) downDown = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == keyUP || evt.keyCode == keyA) upDown = false;
  else if (evt.keyCode == keyDOWN || evt.keyCode == keyZ) downDown = false;
  else if ((evt.keyCode == keySPACE || evt.keyCode == keyX) && is_movement_possible()) spacePressed = true;
}

function reset_pressed_key() {
  spacePressed = false;
}

// Observe keyboard events
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
