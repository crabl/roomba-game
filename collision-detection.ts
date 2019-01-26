import { Obstacle, Position } from './common';

export function isCollidingWith(player: Position, obstacle: Obstacle): boolean {
    //const obstacle_top_left: Position = {
    //    x: obstacle.position.x,
    //    y: obstacle.position.y
    //};

    //const obstacle_top_right: Position = {
    //    x: obstacle.position.x + obstacle.dimensions.width,
    //    y: obstacle.position.y
    //};

    //const obstacle_bottom_left: Position = {
    //    x: obstacle.position.x,
    //    y: obstacle.position.y + obstacle.dimensions.height
    //};

    //const obstacle_bottom_right: Position = {
    //    x: obstacle.position.x + obstacle.dimensions.width,
    //    y: obstacle.position.y + obstacle.dimensions.height
    //};

    const obstacle_top: Number = obstacle.position.x;
    const obstacle_right: Number = obstacle.position.y + obstacle.dimensions.width;
    const obstacle_bottom: Number = obstacle.position.x + obstacle.dimensions.height;
    const obstacle_left: Number = obstacle.position.y;

    if (player.x >= obstacle_top ||
        player.y <= obstacle_right || 
        player.x <= obstacle_bottom ||
        player.y >= obstacle_left) {
        return true;
    }
    
    return false;
}