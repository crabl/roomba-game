import { Wall, Doorway, Dirt } from './obstacles';
import { createChargingStation } from './charging_station';
import { Rug } from './decor';

const NUM_DIRT = 500;

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
  new Wall({ x: 25, y: 50 }, { height: 400, width: 25 }),
  new Wall({ x: 25, y: 550 }, { height: 180, width: 25 }),
  new Wall({ x: 25, y: 725 }, { height: 25, width: 950 }),
  new Wall({ x: 975, y: 50 }, { height: 700, width: 25 }),
  new Wall({ x: 25, y: 25 }, { height: 25, width: 975 }),
  ...createChargingStation({ x: 51, y: 300 })
];
export const level_0_decor = [
  new Rug({ x: 400, y: 400 }, { height: 150, width: 300 })
]

export const level_1 = [
  ...makeDirt(),
  new Doorway({ x: 983, y: 450 }, { height: 100, width: 10 }, 0),
  new Wall({ x: 975, y: 50 }, { height: 400, width: 25 }),
  new Wall({ x: 975, y: 550 }, { height: 180, width: 25 }),
  new Wall({ x: 25, y: 725 }, { height: 25, width: 975 }),
  new Wall({ x: 25, y: 50 }, { height: 700, width: 25 }),
  new Wall({ x: 25, y: 25 }, { height: 25, width: 975 }),
  ...createChargingStation({ x: 51, y: 600 })
]
export const level_1_decor = [
  new Rug({ x: 300, y: 200 }, { height: 500, width: 200 })
]
