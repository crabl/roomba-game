import { Position, Obstacle, ObstacleType, Dimensions } from './common';
import { deflateRaw } from 'zlib';

export class ChargingStation implements Obstacle {
    position: Position;
    obstacle_type = ObstacleType.Fixed;

    constructor(public in_position: Position, public dimensions: Dimensions){
        this.position = in_position;
    }

    draw(context: CanvasRenderingContext2D){
        context.save();
        context.beginPath();
        context.fillStyle = "lightgreen";
        context.fillRect(
            this.position.x,
            this.position.y,
            this.dimensions.width * 2,
            this.dimensions.height);
        context.closePath();

        context.beginPath();
        context.fillStyle = "green";
        context.fillRect(
            this.position.x, 
            this.position.y, 
            this.dimensions.width, this.dimensions.height);
        context.closePath();
        context.restore();
    }
}

