// INITIALIZE HEATMAP
const opacityValue = 0.1;
const maxDataValue = 5;
const pointRadius = 100;
const blurRadius = 30;
let heatmap = simpleheat('canvas')
  .max(maxDataValue)
  .radius(pointRadius, blurRadius);
let frame = null;
const canvas = document.getElementById('canvas');

function draw() {
  heatmap.draw(opacityValue);
  frame = null;
}

function updatePosition(positionX, positionY) {
  heatmap.add([positionX, positionY, 1]);
  frame = frame || window.requestAnimationFrame(draw);
}

// on every mouse move event, update position and draw on the canvas
canvas.addEventListener('mousemove', function (e) {
  updatePosition(e.clientX, e.clientY);
});

// on every touch move event, update position and draw on the canvas
canvas.addEventListener('mousemove', function (e) {
  if (e.touches) {
    updatePosition(e.touches[0].clientX, e.touches[0].clientY);
  }
});

// RESIZE THE CANVAS TO FILL THE BROWSER
window.addEventListener('resize', resizeCanvas, false);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  heatmap.resize();
}

resizeCanvas();
