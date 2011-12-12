var rightDown = false;
var leftDown = false;
var upDown = false;
var downDown = false;
var spacePressed = false;

function onKeyDown(evt) {
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
  else if (evt.keyCode == 38) upDown = true;
  else if (evt.keyCode == 40) downDown = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
  else if (evt.keyCode == 38) upDown = false;
  else if (evt.keyCode == 40) downDown = false;
  else if (evt.keyCode == 32 && is_movement_possible()) spacePressed = true;
}

function reset_pressed_key() {
  spacePressed = false;
}

// Observe keyboard events
$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);
