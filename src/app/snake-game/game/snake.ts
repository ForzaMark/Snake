import {SnakePart} from './snake-part';

export class Snake {

    constructor() {}

    private direction: String = 'Right';
    private snakeParts: SnakePart[] = [];

    addParts(x: number, y: number): void {
        this.snakeParts.push(new SnakePart(x, y));
    }

    getParts(): SnakePart[] {
        return this.snakeParts;
    }

    getDirection(): String {
        return this.direction;
    }

    setDirection(dir: String): void {
        this.direction = dir;
    }


}
