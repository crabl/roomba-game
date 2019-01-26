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

    // const obstacle_top: Number = obstacle.position.x;
    // const obstacle_right: Number = obstacle.position.y + obstacle.dimensions.width;
    // const obstacle_bottom: Number = obstacle.position.x + obstacle.dimensions.height;
    // const obstacle_left: Number = obstacle.position.y;

    if (player_top.y <= obstacle_bottom_right.y && player_top.y <= obstacle_bottom_left.y &&
       player_right.x >= obstacle_bottom_left.x && player_right.x >= obstacle_top_left.x &&
        player_bottom.y >= obstacle_top_right.y && player_bottom.y >= obstacle_top_left.y && 
       player_left.x <= obstacle_bottom_right.x && player_left.x <= obstacle_top_right.x
       ) {
        return true;
    }
    // else if (player_right.x >= obstacle_bottom_left.x && player_right.x >= obstacle_top_left.x){
    //     return true;
    // }
    // else if(player_bottom.y >= obstacle_top_left.y && player_bottom.y >= obstacle_top_right.y){
    //     return true;
    // }
    // else if (player_left.x <= obstacle_bottom_right.x && player_left.x <= obstacle_top_right.x){
    //     return true;
    // }
    
    return false;
}