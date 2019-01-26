const canvas = document.querySelector('canvas');
const body = document.querySelector('body');
const device_pixel_ratio = window.devicePixelRatio;
const canvas_height = body.clientHeight;
const canvas_width = body.clientWidth;

type DirectionKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';
interface Wall {
  x: number; 
  y: number; 
  height: number; 
  width: number;
}

interface GameState {
  keys: {
    [key: string]: boolean
  };
  clock: any;
  player: {
    is_docked: boolean;
    battery: number;
    x: number;
    y: number;
  };
  walls: Wall[];
}

let state: GameState = {
  keys: {},
  clock: new Date(),
  player: {
    is_docked: false,
    battery: 100,
    x: Math.floor(canvas_width / 2),
    y: Math.floor(canvas_height / 2)
  },
  walls: []
};

// Initialize the canvas, make it retina-friendly by looking at device pixel ratio
canvas.width = canvas_width * device_pixel_ratio;
canvas.height = canvas_height * device_pixel_ratio;
canvas.style.width = canvas_width + 'px'; // css, need the px
canvas.style.height = canvas_height + 'px'; // css, need the px

onkeydown = onkeyup = function (e: KeyboardEvent) {
  e.preventDefault();
  if (e.type === 'keydown') {
    state.keys[e.key] = true;
  } else {
    delete state.keys[e.key];
  }
};

const context = canvas.getContext('2d');
context.scale(device_pixel_ratio, device_pixel_ratio);

function updatePlayer() {
  const increment = 1;

  // bound to canvas width/height
  Object.keys(state.keys).forEach((key: DirectionKey) => {
    // have to check whether we are actually pressing the keys
    if (state.keys[key]) {
      switch (key) {
        case 'ArrowUp':
          state.player.y = Math.max(state.player.y - increment, 0);
          break;
        case 'ArrowDown':
          state.player.y = Math.min(state.player.y + increment, canvas_height);
          break;
        case 'ArrowLeft':
          state.player.x = Math.max(state.player.x - increment, 0);
          break;
        case 'ArrowRight':
          state.player.x = Math.min(state.player.x + increment, canvas_width);
          break;
      }
    }
  });
}

function updateBattery() {
  const current_time: any = new Date();
  if (current_time - state.clock > 1000) {
    state.clock = current_time;
    state.player.battery -= 1;
    console.log(state.player.battery);
  }
}

(function draw() {
  context.clearRect(0, 0 , canvas_width, canvas_height);
  context.beginPath();
  context.arc(state.player.x, state.player.y, 20, 0, 2 * Math.PI);
  context.fillStyle = 'rgba(250,0,0,1)';
  context.fill();

  updatePlayer();
  updateBattery();

  requestAnimationFrame(draw);
})();
