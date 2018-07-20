import { SnakePart } from './snake-part';

export class Food {
    private PosX: number;
    private PosY: number;

    constructor(private cellWidth: number,
                private cellHeight: number,
                private fieldWidth: number,
                private fieldHeight: number) {}

    createNewFood(Snakeparts: SnakePart[]): void {

        this.PosX = undefined;
        while (!this.PosX) {
            const propPosX = Math.floor(Math.random() * this.fieldWidth);
            const propPosy = Math.floor(Math.random() * this.fieldHeight);

            for (let i = 0; i < Snakeparts.length; i++) {
                if (propPosX !== Snakeparts[i].x && propPosy !== Snakeparts[i].y) {
                        this.PosX = propPosX;
                        this.PosY = propPosy;
                }
            }
        }
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillRect(this.PosX * this.cellWidth, this.PosY * this.cellHeight, this.cellWidth, this.cellHeight);
    }

    getPosX(): number {
        return this.PosX;
    }

    getPosY(): number {
        return this.PosY;
    }
}
