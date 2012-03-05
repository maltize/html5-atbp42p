var field_lines = [];

// Phases:
// 0 - ball is not moving; p1 position the paddle & shot (set to 2)
// 1 - ball is moving; do not move paddles; not in field
// 2 - ball is not moving; in field; p2 position the paddle & continue
// 3 - ball is moving; do not move paddles; if hit paddle set 1
var phase = 0;
var last_phase;

var scores = [];
var active_player = 0;
var player_direction = [1, -1];

function switch_player() {
  active_player ^= 1;
}

function next_level(player_no) {
  init_ball(player_no);
  init_paddle();

  active_player = player_no;
  phase = 0;
}

function draw_field() {
  rect(field_lines[0], 0, 1, HEIGHT);
  rect(field_lines[1], 0, 1, HEIGHT);
}

function set_phase(value) {
  last_phase = phase;
  phase = value;
}

function shot_ball() {
  ball.dx = 2 * player_direction[active_player];
  calculate_paddle_bounce(active_player);

  set_phase(1);
  switch_player();
}

function ready_to_shot() {
  if (spacePressed) {
    reset_pressed_key();
    shot_ball();
  }
}

function ready_to_continue() {
  if (spacePressed) {
    reset_pressed_key();
    last_phase = 2;
  }
}

function update_paddle_height() {
  if (paddle[active_player].height > 10)
    paddle[active_player].height -= 10;
}

function calculate_paddle_bounce(paddle_no) {
  ball.dy = 8 * ( ( (ball.y + ball.height / 2) - (paddle[paddle_no].y + paddle[paddle_no].height / 2) ) / paddle[paddle_no].height);
}

function check_collision(paddle_no) {
  // Move the ball differently based on where it hit the paddle
  if (ball.y + ball.height > paddle[paddle_no].y && ball.y < paddle[paddle_no].y + paddle[paddle_no].height) {
    ball.dx = -ball.dx;
    calculate_paddle_bounce(paddle_no);

    switch_player();
    update_paddle_height();
    ball.reset_trail();
    set_phase(1);
  }
}

function collide_ball_and_paddle() {
  // Check paddle 1 collision with ball
  if (ball.x < paddle[0].x + paddle[0].width) {
    check_collision(0);
  }
  // Check paddle 2 collision with ball
  if (ball.x + ball.width > paddle[1].x) {
    check_collision(1);
  }
}

function check_ball_out() {
  if (ball.x < paddle[0].x + paddle[0].width / 2) {
    ++scores[1];
    next_level(0);
  }
  if (ball.x + ball.width > paddle[1].x + paddle[1].width / 2) {
    ++scores[0];
    next_level(1);
  }
}

function is_ball_moving() {
  return !(ball.dx == 0 && ball.dy == 0);
}

function is_ball_on_field() {
  return (ball.x + ball.radius > field_lines[0] && ball.x + ball.radius < field_lines[1]);
}

function check_field_phase() {
  if (is_ball_on_field())
    set_phase(2);
  else if (phase == 2)
    set_phase(3);
}

function is_movement_possible() {
  return phase == 0 || (phase == 2 && last_phase != 2);
}

function is_waiting_for_setup() {
  return phase == 2 && last_phase != 2;
}

function is_trail_possible() {
  return phase == 1 || is_waiting_for_setup();
}

function draw() {
  clear();

  draw_field();
  ball.draw();
  paddle[0].draw();
  paddle[1].draw();

  if (is_trail_possible()) {
    ball.draw_trail();
  }

  if (phase == 0) {
    ready_to_shot();
  }

  if (is_waiting_for_setup()) {
    ready_to_continue();
  } else {
    ball.move();
    check_field_phase();
  }

  if (is_movement_possible()) {
    paddle[active_player].move();
  }

  if (is_ball_moving()) {
    collide_ball_and_paddle();
    check_ball_out();
  }

  print_score();
}

function print_score() {
  text(WIDTH / 2 - 20, HEIGHT / 2, scores[0], "middle");
  text(WIDTH / 2, HEIGHT / 2, ":", "middle");
  text(WIDTH / 2 + 20, HEIGHT / 2, scores[1], "middle");
}

function debug() {
  text(WIDTH / 2, 0, "Ball", "top");
  text(WIDTH / 2, 15, "x " + (ball.x + ball.radius) + " y " + (ball.y + ball.radius), "top");
  text(WIDTH / 2, 30, "dx " + ball.dx + " dy " + ball.dy, "top");
  text(WIDTH / 2, 45, "active_player: " + active_player, "top");
  text(WIDTH / 2, 60, "is_ball_moving: " + is_ball_moving(), "top");
  text(WIDTH / 2, 75, "is_ball_on_field: " + is_ball_on_field(), "top");
  text(WIDTH / 2, 90, "last_phase: " + last_phase, "top");
  text(WIDTH / 2, 105, "phase: " + phase, "top");
  text(WIDTH / 2, 120, "spacePressed: " + spacePressed, "top");
}
