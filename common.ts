export type DirectionKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

export enum ObstacleType {
  Fixed = 0,
  Raised = 1,
  Doorway = 2
}

export interface Position {
  x: number;
  y: number;
}

export interface Dimensions {
  height: number;
  width: number;
}

export class Obstacle {
  obstacle_type: ObstacleType;
  position: Position;
  dimensions: Dimensions;
}