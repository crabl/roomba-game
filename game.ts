import { 
  Obstacle, 
  DirectionKey,
  ObstacleType,
  Position,
  Dimensions
} from './common';
import { isCollidingWith, adjustPlayer } from './collision-detection';
import { Wall, Dirt } from './obstacles';
import { Player } from './player';

const canvas = document.querySelector('canvas');
const body = document.querySelector('body');
const device_pixel_ratio = window.devicePixelRatio;
const canvas_height = body.clientHeight;
const canvas_width = body.clientWidth;
const NumDirt = 1000;

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
    new Dirt({ x: 300, y: 200 }),
    new Wall({ x: 400, y: 400 }, { height: 200, width: 200 }),
    new Wall({ x: 700, y: 200 }, { height: 100, width: 100 })
  ]
};

function GenerateDirt(){
  const randomX: number = Math.random() * canvas_width;
  const randomY: number = Math.random() * canvas_height;
  state.obstacles.push(new Dirt({ x: randomX, y: randomY}));
}

var i: number;
for (i = 0; i < NumDirt; i++){
  GenerateDirt();
}

enum GameStatus {
  Lost = 0,
  Won = 1,
  Normal = 2,
  Low = 3,
  Critical = 4,
  Charging = 5
}

function getGameStatus(): GameStatus {
  if (state.player.is_docked) {
    return GameStatus.Charging;
  }

  if (state.player.battery === 0) {
    // if (state.player.dirt_count > 1000) {
    //   return GameStatus.Won;
    // } else {
    //   return GameStatus.Lost;
    // }
    
    return GameStatus.Lost;
  }

  if (state.player.battery > 25 && state.player.battery <= 50) {
    return GameStatus.Low;
  }

  if (state.player.battery > 0 && state.player.battery <= 25) {
    return GameStatus.Critical;
  }

  return GameStatus.Normal;
}

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
      if (o instanceof Dirt) {
        state.obstacles = obstacles.filter(x => o !== x);
      } else {
        adjustPlayer(player, o)
      }
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

  drawObstacles();
  updatePlayer();
  state.player.draw(context);
  updateBattery(); // eventually going to go in detectCollisions
  detectCollisions();

  requestAnimationFrame(draw);
})();


