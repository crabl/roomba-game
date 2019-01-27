import { 
  Obstacle, 
  GameStatus,
  Decor
} from './common';
import { isCollidingWith } from './collision-detection';
import { Wall, Dirt, Doorway } from './obstacles';
import { Player } from './player';
import { ChargingStation } from './charging_station';
import { level_0, level_1, level_0_decor, level_1_decor } from './levels';
import { Rug } from './decor';

const floor = new Image();
floor.src = require('./sprites/hardwood_sprite.png')
import { Sounds } from './sounds';

const canvas = document.querySelector('canvas');
const device_pixel_ratio = window.devicePixelRatio;
const canvas_height = 768;
const canvas_width = 1024;

const DIRT_REQUIRED = 100;
const sounds = new Sounds();
sounds.play();

interface GameState {
  status: GameStatus;
  keys: {
    [key: string]: boolean
  };
  clock: any;
  player: Player;
  current_level: number;
  levels: Obstacle[][];
  decor: Decor[][];
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
  ],
  decor: [
    level_0_decor,
    level_1_decor
  ]
};

function getGameStatus(): GameStatus {
  if (state.player.is_docked) {
    return GameStatus.Charging;
  }

  if (state.player.dirt_collected >= DIRT_REQUIRED) {
    return GameStatus.Won;
  }

  if (state.player.battery === 0) {
    if (state.player.dirt_collected > DIRT_REQUIRED) {
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

  // Charging -> Not Charging = Undocked
  if (current === GameStatus.Charging && next !== GameStatus.Charging) {
    // sounds.undock();
  }

  // Not Charging -> Charging = Docked
  if (current !== GameStatus.Charging && next === GameStatus.Charging) {
    // sounds.dock();
  }
  // perform state transitions
}

// Initialize the canvas, make it retina-friendly by looking at device pixel ratio
canvas.width = canvas_width * device_pixel_ratio;
canvas.height = canvas_height * device_pixel_ratio;
canvas.style.width = canvas_width + 'px'; // css, need the px
canvas.style.height = canvas_height + 'px'; // css, need the px

onkeydown = onkeyup = function (e: KeyboardEvent) {
  if (state.status !== GameStatus.Won && state.status !== GameStatus.Lost) {
    e.preventDefault(); // release keyboard when win/lose condition triggered
  }

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

  // console.log(state.player.position);

  const current_time: any = new Date();
  if (current_time - state.clock > 10) {
    state.clock = current_time;
  
    if (state.player.is_docked) {
      state.player.battery = Math.min(100, state.player.battery + .05);
    } else {
      state.player.battery = Math.max(0, state.player.battery - .01)
    }
  }
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
        switch (o.to_level) {
          case 0:
            state.player.position.x = 100;
            state.player.position.y = 490;
            break;
          case 1:
            state.player.position.x = 870;
            state.player.position.y = 500;
            break;
        }
        
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

function drawObstacles() {
  state.levels[state.current_level].forEach((o: Obstacle) => {
    if (o instanceof ChargingStation){
      o.draw(context);
    } else if (o instanceof Wall) {
      context.beginPath();
      context.rect(o.position.x, o.position.y, o.dimensions.width, o.dimensions.height);
      context.fillStyle = '#333';
      context.fill();
      context.closePath();
    } else if (o instanceof Doorway){
      context.beginPath();
      context.rect(o.position.x, o.position.y, o.dimensions.width, o.dimensions.height);
      context.fillStyle = '#555';
      context.fill();
      context.closePath();
    } else if (o instanceof Dirt){
      context.beginPath();
      context.rect(o.position.x, o.position.y, o.dimensions.width, o.dimensions.height);
      context.fillStyle = o.color;
      context.fill();
      context.closePath();
    }
  });
}

function drawDecor() {
  const decor = state.decor[state.current_level];
  decor.forEach((d: Decor) => {
    if (d instanceof Rug) {
      context.beginPath();
      context.drawImage(d.image, d.position.x, d.position.y, d.dimensions.width, d.dimensions.height);
      context.closePath();
    }
  });
}

function drawHud() {
  context.save();
  const text = state.player.dirt_collected + ' points';
  context.font = "30px Lobster";
  context.strokeStyle = "#fff";
  context.lineWidth = 3;
  context.strokeText(text, 100, 700);
  context.fillStyle = '#000';
  context.fillText(text, 100, 700);
  context.restore();
}

function drawFloor() {
  context.save();
  const floor_pattern = context.createPattern(floor, 'repeat')
  context.rect(25, 25, canvas_width - 50, canvas_height - 50);
  context.fillStyle = floor_pattern;
  context.fill();
  context.restore();
}

function drawWinState(context) {
  const text = 'You win!';
  context.rect(0, 0, canvas_width, canvas_height);
  context.fillStyle = '#0008';
  context.fill();
  context.font = "80px Lobster";
  context.strokeStyle = '#000';
  context.lineWidth = 6;
  context.strokeText(text, 400, 400);
  context.fillStyle = "#fff";
  context.fillText(text, 400, 400);
}

function drawLoseState(context) {
  const text = 'You lose!';
  context.rect(0, 0, canvas_width, canvas_height);
  context.fillStyle = '#0008';
  context.fill();
  context.font = "80px Lobster";
  context.strokeStyle = '#000';
  context.lineWidth = 6;
  context.strokeText(text, 400, 400);
  context.fillStyle = "#fff";
  context.fillText(text, 400, 400);
}

(function draw() {
  context.clearRect(0, 0 , canvas_width, canvas_height);
  const current_status = state.status;
  const next_status = getGameStatus();

  drawFloor();
  drawDecor();
  drawObstacles();
  state.player.draw(context);
  drawHud();
  updatePlayer();
  detectCollisions();

  if (current_status !== next_status) {
    transition(current_status, next_status);
    state.status = next_status;
  } else if (state.status == GameStatus.Won) {
    drawWinState(context);
    return;
  } else if (state.status == GameStatus.Lost) {
    drawLoseState(context);
    return;
  }

  requestAnimationFrame(draw);
})();


