import { Wall, Doorway, Dirt } from "./obstacles";
import { Obstacle } from "./common";
import { isContinueStatement, convertToObject } from "typescript";
import { ChargingStation } from "./charging_station";

const NumDirt = 1000;

export function makeDirt(){
  let dirt = [];
  for (let i = 0; i < NumDirt; i++){
    const randomX: number = 50 + (Math.random() * (1024 - 100));
    const randomY: number = 50 + (Math.random() * (768 - 100));
    dirt.push(new Dirt({x: randomX, y: randomY}, 1));
  }

  return dirt;
}
  
export const level_1  = [
    new Doorway({x: 70, y: 600}, {height: 100, width: 10}, "doorTo2"),
    new ChargingStation({x: 170, y:550}, {height: 20, width: 10}),
    new Wall({x: 50, y: 50}, {height: 550, width: 50}),
    new Wall({ x: 50, y: 700 }, { height: 200, width: 50 }),
    ...makeDirt()
];


export const level_2 = [
    new Doorway({x: 670, y: 600}, {height: 100, width: 10}, "doorTo1"),
    new ChargingStation({x: 170, y:550}, {height: 20, width: 10}),
    new Wall({x: 650, y: 50}, {height: 550, width: 50}),
    new Wall({ x: 650, y: 700 }, { height: 200, width: 50 }),
    ...makeDirt()
]
