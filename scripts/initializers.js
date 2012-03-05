var ball;
var paddle = [];

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

function init_field_lines() {
  field_lines = [WIDTH / 4, (WIDTH / 4) * 3];
}

function init_ball(player_no) {
  ball = new Ball(player_no == 0 ? 0 + 20 : WIDTH - paddle[0].width - 20, HEIGHT / 2 - 20 / 2);
  ball.reset_trail();
}

function init_paddle() {
  paddle[0] = new Paddle(0, HEIGHT / 2 - 100 / 2, 100, 20);
  paddle[1] = new Paddle(WIDTH - 20, paddle[0].y, 100, 20);
}

function init_score() {
  scores[0] = 0;
  scores[1] = 0;
}
