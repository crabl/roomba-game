import { Position, Obstacle, ObstacleType, Dimensions } from './common';

const charger_url = require('./sprites/charger.png');
const charger_image = new Image();
charger_image.src = charger_url;

// for collisions
class ChargingStationSolid implements Obstacle {
  obstacle_type = ObstacleType.Fixed;
  dimensions: Dimensions = { 
    height: 48, 
    width: 15
  };

  constructor(public position: Position) {}
}

// for rendering
export class ChargingStation implements Obstacle {
  obstacle_type = ObstacleType.Fixed;
  dimensions: Dimensions = {
    height: 95 * 0.4,
    width: 115 * 0.4 - 20
  };

  constructor(public position: Position) {}

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.drawImage(charger_image, this.position.x, this.position.y, this.dimensions.height, this.dimensions.width + 20);
    
    // comment out to see bounds

    // context.beginPath();
    // context.fillStyle = "lightgreen";
    // context.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this.dimensions.width,
    //   this.dimensions.height);
    // context.closePath();
    context.restore();
  }
}

export function createChargingStation(position: Position): Obstacle[] {
  return [
    new ChargingStation(position),
    new ChargingStationSolid(position),
  ]
};
