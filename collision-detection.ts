import { Obstacle, Position } from './common';

export function isCollidingWith(player: Position, obstacle: Obstacle): boolean {
  const obstacle_top_left: Position = {
    x: obstacle.position.x,
    y: obstacle.position.y
  };

  const obstacle_top_right: Position = {
    x: obstacle.position.x + obstacle.dimensions.width,
    y: obstacle.position.y
  };

  const obstacle_bottom_left: Position = {
    x: obstacle.position.x, 
    y: obstacle.position.y + obstacle.dimensions.height
  };

  const obstacle_bottom_right: Position = {
    x: obstacle.position.x + obstacle.dimensions.width,
    y: obstacle.position.y + obstacle.dimensions.height
  };


  return false;
}