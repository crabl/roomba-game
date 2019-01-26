import { Position } from './common';

const roombaImage = require('./sprites/demon_roomba_right.png');

const PI = 3.14;

export class Player {
  dirt_collected: number = 0;
  is_docked: boolean = false;
  battery: number = 100;
  radius: number = 20;
  position: Position = {
    x: 0,
    y: 0
  };
  theta: number = 0; // [0, 2 * Math.PI]
  velocity: number = 0;
  image = new Image();

  constructor(initial_position: Position) {
    this.position = initial_position;
    this.image.src = roombaImage;
  }

  rotateLeft() {
    if (this.theta <= 0) {
      this.theta = 2 * PI;
    }

    this.theta -= 0.03;
  }

  rotateRight() {
    if (this.theta >= 2 * PI) {
      this.theta = 0;
    }

    this.theta += 0.03;
  }

  increaseVelocity() {
    this.velocity = Math.min(this.velocity + 0.1, 1);
  }

  decreaseVelocity() {
    this.velocity = Math.max(this.velocity - 0.1, -1);
  }

  decelerate() {
    if (this.velocity < 0) {
      this.velocity = Math.min(this.velocity + 0.05, 1)
    } else {
      this.velocity = Math.max(this.velocity - 0.05, 0);
    }
  }

  setImage(){
    this.image.src = roombaImage;
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.theta);

    context.beginPath();
    context.lineWidth = 6;

    if (this.battery <= 25) {
      context.strokeStyle = 'red';
    } else if (this.battery > 25 && this.battery <= 50) {
      context.strokeStyle = 'yellow';
    } else {
      context.strokeStyle = 'green';
    }

    context.arc(0, 0, this.radius, 0, (this.battery / 100) * -2 * Math.PI, true);
    context.stroke();

    context.drawImage(this.image, -20, -20, 40, 40);

    context.restore();
  }
}