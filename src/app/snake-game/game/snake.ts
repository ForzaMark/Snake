import {SnakePart} from './snake-part';
export class Snake {

    constructor() {}

    private positionX: number;
    private positionY: number;
    private snakeParts: SnakePart[] = [];

    getPositionX(): number {
        return this.positionX;
    }
    getPositionY(): number {
        return this.positionY;
    }

    setPositionX(posX: number): void {
        this.positionX += posX;
    }

    setPositionY(posY: number): void {
        this.positionY += posY;
    }

    addParts(x: number, y: number): void {
        this.snakeParts.push(new SnakePart(x, y));
    }

    getParts(): SnakePart[] {
        return this.snakeParts;
    }


}
