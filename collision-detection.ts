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

     const obstacle_center: Position = {
         x: obstacle.position.x + obstacle.dimensions.width / 2,
         y: obstacle.position.y + obstacle.dimensions.height / 2
     }
 
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

    enum Edge {top, right, bottom, left}

    var deltaX_fromCenters: Number;
    var deltaY_fromCenters: Number;
     deltaX_fromCenters = player.position.x - obstacle_center.x;
     deltaY_fromCenters = player.position.y - obstacle_center.y;
     var l = {deltaX_fromCenters, deltaY_fromCenters}
     console.log(l);

     var edge: Edge;

    switch(deltaY_fromCenters){
        case 70:
        case 69:
        case 68:
        case 67:
        case 66:
        case 65:
        console.log("bottom");
        player.position.y = obstacle_bottom_left.y + player.radius;
        break;
        case -70:
        case -69:
        case -68:
        case -67:
        case -66:
        case -65:
        console.log("top");
        player.position.y = obstacle_top_left.y - player.radius;
        break;
    }

    switch(deltaX_fromCenters){
        case 70:
        case 69:
        case 68:
        case 67:
        case 66:
        case 65:
        console.log("left");
        player.position.x = obstacle_top_right.x + player.radius;
        break;
        case -70:
        case -69:
        case -68:
        case -67:
        case -66:
        case -65:
        console.log("right");
        player.position.x = obstacle_top_left.x - player.radius;
        break;
    }
}