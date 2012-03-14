function Ball(x, y, height, width, radius){
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.height = height;
  this.width = width;
  this.radius = radius;
  this.trailx;
  this.traily;

  this.move = function() {
    if (this.x + this.width > WIDTH || this.x < 0)
      this.dx = -this.dx;
    if (this.y + this.height > HEIGHT || this.y < 0) {
      this.dy = -this.dy;
      this.reset_trail();
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  this.draw = function() {
    rect(this.x, this.y, this.width, this.height);
  }

  this.reset_trail = function() {
    this.trailx = this.x + this.radius;
    this.traily = this.y + this.radius;
  }

  this.draw_trail = function() {
    line(this.trailx, this.traily, this.x + this.radius, this.y + this.radius);
  }
}

function Paddle(x, y, height, width){
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;

  this.move = function() {
    if (upDown) {
      if (phase == 0 && this.y + this.height <= ball.y + ball.radius)
        return;
      if (this.y > 0)
        this.y -= 5;
    } else if (downDown) {
      if (phase == 0 && this.y >= ball.y + ball.height - ball.radius)
        return;
      if (this.y + this.height < HEIGHT)
        this.y += 5;
    }
  }

  this.draw = function() {
    rect(this.x, this.y, this.width, this.height);
  }
}
