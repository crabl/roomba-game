import { Wall, Doorway, Dirt, Raised } from './obstacles';
import { createChargingStation } from './charging_station';
import { Rug } from './decor';

const NUM_DIRT = 750;

const rug_image = require('./sprites/RugBAAA.png');
const rug_big_image = require('./sprites/rug2.png');

export function makeDirt() {
  let dirt = [];
  for (let i = 0; i < NUM_DIRT; i++) {
    const randomX: number = 50 + (Math.random() * (1024 - 100));
    const randomY: number = 50 + (Math.random() * (768 - 100));
    dirt.push(new Dirt({ x: randomX, y: randomY }, 1));
  }

  return dirt;
}

export const level_0 = [
  ...makeDirt(),
  new Doorway({ x: 33, y: 450 }, { height: 100, width: 10 }, 1),
  new Raised({ x: 250, y: 150 }, { height: 200, width: 300 }), // Table
  new Wall({ x: 260, y: 160 }, { height: 20, width: 20 }), // Table leg
  new Wall({ x: 520, y: 160 }, { height: 20, width: 20 }), // Table leg
  new Wall({ x: 520, y: 320 }, { height: 20, width: 20 }), // Table leg
  new Wall({ x: 260, y: 320 }, { height: 20, width: 20 }), // Table leg
  new Raised({ x: 300, y: 70 }, { height: 65, width: 60 }), // Chair top left
  new Raised({ x: 300, y: 70 }, { height: 10, width: 59 }), // Chair Back
  new Wall({ x: 305, y: 75 }, { height: 10, width: 10 }), // Chair leg
  new Wall({ x: 345, y: 75 }, { height: 10, width: 10 }), // Chair leg
  new Wall({ x: 345, y: 115 }, { height: 10, width: 10 }), // Chair leg
  new Wall({ x: 305, y: 115 }, { height: 10, width: 10 }), // Chair leg
  new Raised({ x: 450, y: 70 }, { height: 65, width: 60 }), // Chair top right
  new Raised({ x: 450, y: 70 }, { height: 10, width: 59 }), // Chair Back
  new Wall({ x: 455, y: 75 }, { height: 10, width: 10 }), // Chair leg
  new Wall({ x: 495, y: 75 }, { height: 10, width: 10 }), // Chair leg
  new Wall({ x: 495, y: 115 }, { height: 10, width: 10 }), // Chair leg
  new Wall({ x: 455, y: 115 }, { height: 10, width: 10 }), // Chair leg
  new Raised({ x: 450, y: 360 }, { height: 65, width: 60 }), // Chair bottom right
  new Raised({ x: 450, y: 415 }, { height: 10, width: 59 }), // Chair Back
  new Wall({ x: 455, y: 365 }, { height: 10, width: 10 }), // Chair leg
  new Wall({ x: 495, y: 365 }, { height: 10, width: 10 }), // Chair leg
  new Wall({ x: 495, y: 410 }, { height: 10, width: 10 }), // Chair leg
  new Wall({ x: 455, y: 410 }, { height: 10, width: 10 }), // Chair leg
  new Raised({ x: 300, y: 360 }, { height: 65, width: 60 }), // Chair bottom left
  new Raised({ x: 300, y: 415 }, { height: 10, width: 59 }), // Chair Back
  new Wall({ x: 305, y: 365 }, { height: 10, width: 10 }), // Chair leg
  new Wall({ x: 345, y: 365 }, { height: 10, width: 10 }), // Chair leg
  new Wall({ x: 345, y: 410 }, { height: 10, width: 10 }), // Chair leg
  new Wall({ x: 305, y: 410 }, { height: 10, width: 10 }), // Chair leg
new Wall({ x: 25, y: 50 }, { height: 400, width: 25 }),
  new Wall({ x: 25, y: 550 }, { height: 180, width: 25 }),
  new Wall({ x: 25, y: 725 }, { height: 25, width: 950 }),
  new Wall({ x: 975, y: 50 }, { height: 700, width: 25 }),
  new Wall({ x: 25, y: 25 }, { height: 25, width: 975 }),
  ...createChargingStation({ x: 51, y: 300 })
];
export const level_0_decor = [
  new Rug({ x: 250, y: 500 }, { height: 150, width: 300 }, rug_image)
]

export const level_1 = [
  ...makeDirt(),
  new Wall({ x: 70, y: 100 }, { height: 400, width: 200 }), // Couch
  new Doorway({ x: 983, y: 450 }, { height: 100, width: 10 }, 0),
  new Wall({ x: 975, y: 50 }, { height: 400, width: 25 }),
  new Wall({ x: 975, y: 550 }, { height: 180, width: 25 }),
  new Wall({ x: 25, y: 725 }, { height: 25, width: 975 }),
  new Wall({ x: 25, y: 50 }, { height: 700, width: 25 }),
  new Wall({ x: 25, y: 25 }, { height: 25, width: 975 }),
  ...createChargingStation({ x: 51, y: 600 })
]
export const level_1_decor = [
  new Rug({ x: 300, y: 100 }, { height: 500, width: 300 }, rug_big_image)
]
