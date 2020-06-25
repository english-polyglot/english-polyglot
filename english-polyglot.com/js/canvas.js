// window.onresize = function() {
//   location.reload();
// };

//var canvas = document.querySelector("canvas");
var canvas = document.getElementById("canvas0");

var c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
  x: undefined,
  y: undefined
};

var maxRadius = 40;
// var minRadius = 2;

// var colorArray = ["#ffaa33", "#99ffaa", "#00ff00", "#4411aa", "#ff1100"];
// var colorArray = ["#035AA6", "#4192D9", "#026873", "#038C8C", "#03A696"];
// var colorArray = ["#F20732", "#07038C", "#0439D9", "#056CF2", "#F20505"];
// var colorArray = ["#A7C8F2", "#048ABF", "#027368", "#025951", "#F25116"];
// var colorArray = ["#6800BF", "#45007F", "#8B00FF", "#230040", "#7D00E5"];
var colorArray = ["#2F0459F", "#5C12A6", "#7F25D9", "#F2E205", "#D98E04"];

window.addEventListener("mousemove", function(event) {
//   console.log("Listener");
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  };

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // Interactivity
    if (Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

var circleArray = [];

function init() {
	console.log("init");
  circleArray = [];
  for (var i = 0; i < 800; i++) {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5) * 1;
    var dy = (Math.random() - 0.5) * 1;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();
