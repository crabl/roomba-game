const canvas = document.querySelector('canvas');
const body = document.querySelector('body');
const device_pixel_ratio = window.devicePixelRatio;
const canvas_height = body.clientHeight;
const canvas_width = body.clientWidth;

// Initialize the canvas, make it retina-friendly by looking at device pixel ratio
canvas.width = canvas_width * device_pixel_ratio;
canvas.height = canvas_height * device_pixel_ratio;
canvas.style.width = canvas_width + 'px'; // css, need the px
canvas.style.height = canvas_height + 'px'; // css, need the px

type DirectionKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

interface GameState {
  keys: {
    [key: string]: boolean
  };
  x: number;
  y: number;
}

let state: GameState = {
  keys: {},
  x: Math.floor(canvas_width / 2),
  y: Math.floor(canvas_height / 2)
};

onkeydown = onkeyup = function (e: KeyboardEvent) {
  e.preventDefault();
  state.keys[e.key] = e.type === 'keydown';
};

const context = canvas.getContext('2d');
context.scale(device_pixel_ratio, device_pixel_ratio);

function draw() {
  context.clearRect(0, 0 , canvas_width, canvas_height);
  context.beginPath();
  context.arc(state.x, state.y, 20, 0, 2 * Math.PI);
  context.fillStyle = 'rgba(250,0,0,0.9)';
  context.fill();

  // bound to canvas width/height
  Object.keys(state.keys).forEach((key: DirectionKey) => {
    // have to check whether we are actually pressing the keys
    if (state.keys[key]) {
      switch (key) {
        case 'ArrowUp':
          state.y = Math.max(state.y - 1, 0);
          break;
        case 'ArrowDown':
          state.y = Math.min(state.y + 1, canvas_height);
          break;
        case 'ArrowLeft':
          state.x = Math.max(state.x - 1, 0);
          break;
        case 'ArrowRight':
          state.x = Math.min(state.x + 1, canvas_width);
          break;
      }
    }
  });
  

  
  requestAnimationFrame(draw);
}
draw();
