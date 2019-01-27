import { Obstacle, ObstacleType, Dimensions, Position } from './common';

export class Wall implements Obstacle {
  obstacle_type = ObstacleType.Fixed;
  constructor(public position: Position, public dimensions: Dimensions) {}
}

export class Dirt implements Obstacle {
  obstacle_type = ObstacleType.Dirt;
  dimensions = {
    height: 2,
    width: 2
  };
  color: 'rgba(50,50,50,0.5)';
  constructor(public position: Position, public value: number) {}
}

export class Doorway implements Obstacle {
  obstacle_type = ObstacleType.Doorway;
  constructor(public position: Position, public dimensions: Dimensions, public to_level: number) {}
}

export class Raised implements Obstacle {
  obstacle_type = ObstacleType.Raised;
  constructor(public position: Position, public dimensions: Dimensions){}
}