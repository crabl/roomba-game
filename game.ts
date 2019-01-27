import { 
  Obstacle, 
  GameStatus
} from './common';
import { isCollidingWith } from './collision-detection';
import { Wall, Dirt, Doorway } from './obstacles';
import { Player } from './player';
import { ChargingStation } from './charging_station';
import { level_0, level_1 } from './levels';

const canvas = document.querySelector('canvas');
const device_pixel_ratio = window.devicePixelRatio;
const canvas_height = 768;
const canvas_width = 1024;

interface GameState {
  status: GameStatus;
  keys: {
    [key: string]: boolean
  };
  clock: any;
  player: Player;
  current_level: number;
  levels: Obstacle[][]
}

let state: GameState = {
  status: GameStatus.Normal,
  keys: {},
  clock: new Date(),
  player: new Player({
    x: Math.floor(canvas_width / 2),
    y: Math.floor(canvas_height / 2)
  }),
  current_level: 0,
  levels: [
    level_0,
    level_1
  ]
};

function getGameStatus(): GameStatus {
  if (state.player.is_docked) {
    return GameStatus.Charging;
  }

  if (state.player.battery === 0) {
    if (state.player.dirt_collected > 1000) {
      return GameStatus.Won;
    } else {
      return GameStatus.Lost;
    }
  }

  if (state.player.battery > 25 && state.player.battery <= 50) {
    return GameStatus.Low;
  }

  if (state.player.battery > 0 && state.player.battery <= 25) {
    return GameStatus.Critical;
  }

  return GameStatus.Normal;
}

function transition(current: GameStatus, next: GameStatus) {
  if (current === GameStatus.Normal && next === GameStatus.Low) {
    
  } 
  // perform state transitions
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

  all_keys.forEach((key: string) => {
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
        case 'R':
          window.location.reload();
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
  };
}


function detectCollisions() {
  const { player } = state;
  let obstacles = state.levels[state.current_level];

  player.is_docked = false; // fixes issue where player undocks and does not collide

  obstacles.forEach((o: Obstacle) => {
    if (isCollidingWith(player, o)) {
      if (o instanceof Dirt) {
        // remove the dirt
        state.levels[state.current_level] = obstacles.filter(x => o !== x);
        state.player.dirt_collected += o.value;
      } else if(o instanceof Doorway) {
        state.current_level = o.to_level;
      } else if (o instanceof ChargingStation) {
        if (player.battery <= 100){
          player.is_docked = true;
        }
      } else {
        player.velocity = -1; // bump the player back a bit
      }
    }
  });
}

function updateBattery() {
  const current_time: any = new Date();
  if (current_time - state.clock > 10) {
    state.clock = current_time;
  
    if (state.player.is_docked) {
      state.player.battery = Math.min(100, state.player.battery + .03);
    } else {
      state.player.battery = Math.max(0, state.player.battery - .01)
    }
  }
}

function drawObstacles() {
  state.levels[state.current_level].forEach((o: Obstacle) => {
    if(o instanceof ChargingStation){
      o.draw(context);
    } else if(o instanceof Wall) {
      context.beginPath();
      context.rect(o.position.x, o.position.y, o.dimensions.width, o.dimensions.height);
      context.fillStyle = '#333';
      context.fill();
      context.closePath();
    }
    else if(o instanceof Doorway){
      context.beginPath();
      context.rect(o.position.x, o.position.y, o.dimensions.width, o.dimensions.height);
      context.fillStyle = '#555';
      context.fill();
      context.closePath();
    }else if(o instanceof Dirt){
      context.beginPath();
      context.rect(o.position.x, o.position.y, o.dimensions.width, o.dimensions.height);
      context.fillStyle = '#300';
      context.fill();
      context.closePath();
    }
  });
}

(function draw() {
  context.clearRect(0, 0 , canvas_width, canvas_height);

  drawObstacles();
  updatePlayer();
   detectCollisions();
  state.player.draw(context);
  updateBattery(); // eventually going to go in detectCollisions
 

  const current_status = state.status;
  const next_status = getGameStatus();

  if (current_status !== next_status) {
    transition(current_status, next_status);
    state.status = next_status;
  }

  requestAnimationFrame(draw);
})();


