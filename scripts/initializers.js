function init() {
  ctx = $('#canvas')[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();

  init_field_lines();
  init_ball(active_player);
  init_paddle();
  init_score();

  return setInterval(draw, render_delay);
}

function init_trail() {
  
}

function init_field_lines() {
  field_lines = [WIDTH / 4, (WIDTH / 4) * 3];
}

function init_ball(player_no) {
  ballx = player_no == 0 ? 0 + ballw : WIDTH - paddlew - ballw;
  bally = HEIGHT / 2 - ballh / 2;
  dx = 0;
  dy = 0;

  reset_trail();
}

function init_paddle() {
  paddleh = 100;
  paddlew = 20;

  paddlex[0] = 0;
  paddley[0] = HEIGHT / 2 - paddleh / 2;
  paddlex[1] = WIDTH - paddlew;
  paddley[1] = paddley[0];
}

function init_score() {
  scores[0] = 0;
  scores[1] = 0;
}

function reset_trail() {
  trailx = ballx + ballr;
  traily = bally + ballr;
}
