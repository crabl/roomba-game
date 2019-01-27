import { Obstacle, Position, Player } from './common';

export function isCollidingWith(player: Player, obstacle: Obstacle): boolean {
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

    const player_top: Position = {
        x: player.position.x,
        y: player.position.y - player.radius 
    }
    const player_right: Position = {
        x: player.position.x + player.radius,
        y: player.position.y 
    }
    const player_bottom: Position = {
        x: player.position.x,
        y: player.position.y + player.radius
    }
    const player_left: Position = {
        x: player.position.x - player.radius,
        y: player.position.y
    }

    if (player_top.y <= obstacle_bottom_right.y && player_top.y <= obstacle_bottom_left.y &&
       player_right.x >= obstacle_bottom_left.x && player_right.x >= obstacle_top_left.x &&
        player_bottom.y >= obstacle_top_right.y && player_bottom.y >= obstacle_top_left.y && 
       player_left.x <= obstacle_bottom_right.x && player_left.x <= obstacle_top_right.x
       ) {
        return true;
    }
    
    return false;
}

export function adjustPlayer(player: Player, obstacle: Obstacle){
     var deltaX = player.position.x - Math.max(obstacle.position.x, 
        Math.min(player.position.x, obstacle.position.x + obstacle.dimensions.width));
     var deltaY = player.position.y - Math.max(obstacle.position.y, 
        Math.min(player.position.y, obstacle.position.y + obstacle.dimensions.height));

    if (deltaY < 0){
        player.position.y = obstacle.position.y - player.radius;
    }else if (deltaY > 0){
        player.position.y = obstacle.position.y + obstacle.dimensions.height + player.radius;
    }

    if(deltaX < 0){
        player.position.x = obstacle.position.x - player.radius;
    }else if (deltaX > 0){
        player.position.x = obstacle.position.x + obstacle.dimensions.width + player.radius;
    }
}