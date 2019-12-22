const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');
const mouse = {
  x: undefined,
  y: undefined
}
const colorArray = [
  // 'blueviolet',
  // 'orange',
  // 'skyblue',
  // 'mediumvioletred',
  // 'chartreuse',
  //  'chocolate',
  // 'darkcyan',
  // 'aqua',
  '#F27781',
  '#18298C',
  '#04BF8A',
  '#F2CF1D',
  '#F29F05'
]
const maxRadius = 55;
window.addEventListener('mousemove', function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener('resize', function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});
class Particles {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, 360, false);
    c.fillStyle = this.color;
    c.fill();
  }
  update() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0)
      this.dx = -this.dx;
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0)
      this.dy = -this.dy;
    this.x += this.dx;
    this.y += this.dy;
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius)
        this.radius += 1;
    } else if (this.radius > this.minRadius)
      this.radius -= 1;
    this.draw();
  }
}
let circleArray = [];

function init() {
  circleArray = [];
  for (let i = 0; i <1100; i++) {
    let radius = Math.random() * 4 + 1;
    let x = Math.random() * (window.innerWidth - radius * 2) + radius;
    y = Math.random() * (window.innerHeight - radius * 2) + radius;
    dx = (Math.random() - 0.5) * 2;
    dy = (Math.random() - 0.5) * 2;
    circleArray.push(new Particles(x, y, dx, dy, radius));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (let i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
init();
animate();