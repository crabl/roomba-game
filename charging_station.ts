import { Position, Obstacle, ObstacleType, Dimensions } from './common';

// for collisions
class ChargingStationSolid implements Obstacle {
  obstacle_type = ObstacleType.Fixed;
  dimensions: Dimensions = {
    height: 30,
    width: 20
  };

  constructor(public position: Position) {}
}

// for rendering
export class ChargingStation implements Obstacle {
  obstacle_type = ObstacleType.Fixed;
  dimensions: Dimensions = {
    height: 30,
    width: 40
  };

  constructor(public position: Position) {}

  draw(context: CanvasRenderingContext2D){
    context.save();
      context.beginPath();
      context.fillStyle = "lightgreen";
      context.fillRect(
          this.position.x,
          this.position.y,
          this.dimensions.width,
          this.dimensions.height);
      context.closePath();

      context.beginPath();
      context.fillStyle = "green";
      context.fillRect(
          this.position.x, 
          this.position.y, 
          this.dimensions.width / 2, this.dimensions.height);
      context.closePath();
      context.restore();
  }
}

export function createChargingStation(position: Position): Obstacle[] {
  return [
    new ChargingStationSolid(position),
    new ChargingStation(position)
  ]
};
