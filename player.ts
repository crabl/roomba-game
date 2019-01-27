import { Position } from './common';

const roombaImage = require('./sprites/roomba_pixel.png');

const PI = 3.14;

export class Player {
  dirt_collected: number = 0;
  is_docked: boolean = true;
  battery: number = 100;
  radius: number = 30;

  // theta: number = 3 / 2 * Math.PI; // [0, 2 * Math.PI] -> 3/2*pi === vertical
  velocity: number = 0;
  image = new Image();

  constructor(public position: Position, public theta = Math.PI) {
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

    const base_line_width = 4;

    // pulse indicator faster
    if (this.battery <= 25) {
      context.lineWidth = base_line_width + 4 * Math.abs(Math.sin(this.battery * 10));
    /*} else if (this.battery > 25 && this.battery <= 50) {
      context.lineWidth = base_line_width + 4 * Math.abs(Math.sin(this.battery * 5));*/
    } else {
      context.lineWidth = base_line_width + 4 * Math.abs(Math.sin(this.battery * 2));
    }

    if (this.is_docked) {
      context.lineWidth = base_line_width + 4 * Math.abs(Math.sin(this.battery));
    }

    // background of battery indicator
    context.beginPath();
    context.shadowBlur = context.lineWidth * 2;
    if (this.battery <= 25) {
      context.shadowColor = context.strokeStyle = 'rgba(255,124,124,0.5)';
    /*} else if (this.battery > 25 && this.battery <= 50) {
      context.shadowColor = context.strokeStyle = 'rgba(255,189,129,0.5)';*/
    } else {
      context.shadowColor = context.strokeStyle = 'rgba(186,255,192,0.5)';
    }

    if (this.is_docked && this.battery < 100) {
      context.shadowColor = context.strokeStyle = 'rgba(155,207,255,0.5)';
    }

    context.arc(0, 0, this.radius, 0, 2 * Math.PI);
    context.stroke();
    context.closePath();

    // interior battery ring
    context.beginPath();
    if (this.battery <= 25) {
      context.strokeStyle = 'rgba(250,0,0,0.75)';
    /*} else if (this.battery > 25 && this.battery <= 50) {
      context.strokeStyle = 'rgba(255,123,0,0.75)';*/
    } else {
      context.strokeStyle = 'rgba(0,206,18,0.75)';
    }

    if (this.is_docked && this.battery < 100) {
      context.strokeStyle = 'rgba(2,155,255,0.75)';
    }

    context.arc(0, 0, this.radius, 0, (this.battery / 100) * -2 * Math.PI, true);
    context.stroke();

    // draw roomba
    context.drawImage(this.image, -this.radius, -this.radius, 2 * this.radius, 2 * this.radius);

    context.restore();
  }
}