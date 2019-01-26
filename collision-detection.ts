import { Obstacle, Position, Player } from './common';

export function isCollidingWith(player: Player, obstacle: Obstacle): boolean {
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

    if (player.position.x + player.radius >= obstacle_top ||
        player.position.y - player.radius <= obstacle_right || 
        player.position.x - player.radius <= obstacle_bottom ||
        player.position.y + player.radius >= obstacle_left) {
        return true;
    }
    
    return false;
}