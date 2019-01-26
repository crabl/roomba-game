import { Position } from './common';

const PI = 3.14;

export class Player {
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
    this.image.src = '/sprites/demon_roomba.png';
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.position.x, this.position.y);
    context.rotate(this.theta);
    
    // context.strokeStyle = 'blue';
    // context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    // context.stroke();

    context.fillStyle = 'red';
    context.fillRect(-10, -5, 20, 10);

    // context.drawImage(this.image, this.position.x, this.position.y);
    
    
    context.restore();
  }
}