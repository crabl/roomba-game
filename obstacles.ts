import { Obstacle, ObstacleType, Dimensions, Position } from './common';

export class Wall implements Obstacle {
  obstacle_type = ObstacleType.Fixed;
  constructor(public position: Position, public dimensions: Dimensions) {}
}

// export class Doorway implements Obstacle {
//   obstacle_type = ObstacleType.Doorway;
//   constructor(public position: Position, public dimensions: Dimensions, public destination: string) {}
// }

// export class Charger implements Obstacle {
//   obstacle_type = ObstacleType.Charger;
//   dimensions = {
//     height: 10,
//     width: 5
//   };

//   constructor(public position: Position) {}
// }