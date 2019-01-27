export type DirectionKey = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight';

export enum ObstacleType {
  Fixed = 0,
  Raised = 1,
  Doorway = 2,
  Dirt = 3
}

export interface Position {
  x: number;
  y: number;
}

export interface Dimensions {
  height: number;
  width: number;
}

export interface Player {
  is_docked: boolean;
  battery: number;
  position: Position;
  radius: number;
}

export class Obstacle {
  obstacle_type: ObstacleType;
  position: Position;
  dimensions: Dimensions;
}

export class Decor {
  position: Position;
  dimensions: Dimensions;
}

export enum GameStatus {
  Lost = 'Lost',
  Won = 'Won',
  Normal = 'Normal',
  Low = 'Low',
  Critical = 'Critical',
  Charging = 'Charging'
}
