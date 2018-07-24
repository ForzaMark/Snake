import { Snake } from './snake';
import { CellObject } from './cell-object';

export class Food implements CellObject {
    x: number;
    y: number;

    constructor(private cellWidth: number,
                private cellHeight: number,
                private fieldWidth: number,
                private fieldHeight: number) {}

    createNewFood(snake: Snake): void {
        let isOnSnake = true;
        while (isOnSnake) {
            this.x = Math.floor(Math.random() * this.fieldWidth);
            this.y = Math.floor(Math.random() * this.fieldHeight);
            isOnSnake = snake.isOnSnake(this);
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
