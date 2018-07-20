import { SnakePart } from './snake-part';

export class Food {
    x: number;
    y: number;

    constructor(private cellWidth: number,
                private cellHeight: number,
                private fieldWidth: number,
                private fieldHeight: number) {}

    createNewFood(Snakeparts: SnakePart[]): void {

        this.x = undefined;
        while (!this.x) {
            const propx = Math.floor(Math.random() * this.fieldWidth);
            const propy = Math.floor(Math.random() * this.fieldHeight);

            for (let i = 0; i < Snakeparts.length; i++) {
                if (propx !== Snakeparts[i].x && propy !== Snakeparts[i].y) {
                        this.x = propx;
                        this.y = propy;
                }
            }
        }
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillRect(this.x * this.cellWidth, this.y * this.cellHeight, this.cellWidth, this.cellHeight);
    }

    getx(): number {
        return this.x;
    }

    gety(): number {
        return this.y;
    }
}
