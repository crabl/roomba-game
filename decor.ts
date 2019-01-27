import { Decor, Position, Dimensions } from "./common";


export class Rug implements Decor{
    position: Position;
    dimensions: Dimensions;
    image = new Image();

    constructor(public _position: Position, public _dimentions: Dimensions, _image: string) {
        this.position = _position;
        this.dimensions = _dimentions;
        this.image.src = _image;
    }
}