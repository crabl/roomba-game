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

export enum GameStatus {
  Lost = 0,
  Won = 1,
  Normal = 2,
  Low = 3,
  Critical = 4,
  Charging = 5
}
