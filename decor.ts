import { Decor, Position, Dimensions } from "./common";

const rug_image = require('./sprites/RugBAAA.png');

export class Rug implements Decor{
    position: Position;
    dimensions: Dimensions;
    image = new Image();

    constructor(public _position: Position, public _dimentions: Dimensions) {
        this.position = _position;
        this.dimensions = _dimentions;
        this.image.src = rug_image;
    }
}