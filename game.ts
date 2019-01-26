import { 
  Obstacle, 
  DirectionKey,
  ObstacleType,
  Position,
  Dimensions
} from './common';
import { isCollidingWith, adjustPlayer } from './collision-detection';
import { Wall } from './obstacles';
import { Player } from './player';

const canvas = document.querySelector('canvas');
const body = document.querySelector('body');
const device_pixel_ratio = window.devicePixelRatio;
const canvas_height = body.clientHeight;
const canvas_width = body.clientWidth;

var iscolliding: Boolean;

interface GameState {
  keys: {
    [key: string]: boolean
  };
  clock: any;
  player: Player;
  obstacles: Obstacle[]
}

let state: GameState = {
  keys: {},
  clock: new Date(),
  player: new Player({
    x: Math.floor(canvas_width / 2),
    y: Math.floor(canvas_height / 2)
  }),
  obstacles: [
    new Wall({ x: 400, y: 400 }, { height: 200, width: 200 }),
    new Wall({ x: 700, y: 200 }, { height: 100, width: 100 })
  ]
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
  // bound to canvas width/height
  const vx = Math.cos(state.player.theta) * state.player.velocity;
  const vy = Math.sin(state.player.theta) * state.player.velocity;

  const all_keys = Object.keys(state.keys);

  all_keys.forEach((key: DirectionKey) => {
    // have to check whether we are actually pressing the keys
    if (state.keys[key]) {
      switch (key) {
        case 'ArrowUp':
          state.player.increaseVelocity();
          break;
        case 'ArrowDown':
          state.player.decreaseVelocity();
          break;
        case 'ArrowLeft':
          state.player.rotateLeft();
          break;
        case 'ArrowRight':
          state.player.rotateRight();
          break;
      }
    }
  });

  // if we're not holding the up or down arrows, we should decelerate
  if (!all_keys['ArrowUp'] && !all_keys['ArrowDown']) {
    state.player.decelerate();
  }

  state.player.position = {
    x: Math.min(Math.max(0, state.player.position.x + vx), canvas_width),
    y: Math.min(Math.max(0, state.player.position.y + vy), canvas_height)
  }
}


function detectCollisions() {
  const { player, obstacles } = state;
  obstacles.forEach((o: Obstacle) => {
    if (isCollidingWith(player, o)) {
      // console.log(player.position, o.position),
      adjustPlayer(player, o)

    }
  })
}


function updateBattery() {
  const current_time: any = new Date();
  if (current_time - state.clock > 1000) {
    state.clock = current_time;
    state.player.battery = Math.max(0, state.player.battery - 1);
    //console.log(state.player.battery);
  }
}

function drawObstacles() {
  state.obstacles.forEach((o: Obstacle) => {
    context.beginPath();
    context.rect(o.position.x, o.position.y, o.dimensions.width, o.dimensions.height);
    context.fillStyle = '#333';
    context.fill();
  });
}

(function draw() {
  context.clearRect(0, 0 , canvas_width, canvas_height);
<<<<<<< HEAD

  drawObstacles();

  context.beginPath();
  context.arc(state.player.position.x, state.player.position.y, state.player.radius, 0, 2 * Math.PI);
  context.fillStyle = 'rgba(250,0,0,1)';
  context.fill();
=======
>>>>>>> add player class with ability to draw

  updatePlayer();
  state.player.draw(context);
  updateBattery(); // eventually going to go in detectCollisions
  detectCollisions();

  requestAnimationFrame(draw);
})();


