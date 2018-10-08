import { Snake } from './snake';
import { CellObject } from './cell-object';

export class Food implements CellObject {
    x: number;
    y: number;

    constructor(private fieldWidth: number, private fieldHeight: number) {}
    intersects(other: CellObject): boolean {
        return this.x === other.x && this.y === other.y;
    }

    createNewFood(snake: Snake): void {
        let isOnSnake = true;
        while (isOnSnake) {
            this.x = Math.floor(Math.random() * this.fieldWidth);
            this.y = Math.floor(Math.random() * this.fieldHeight);
            isOnSnake = snake.isOnSnake(this);
        }
    }

    draw(context: CanvasRenderingContext2D,  widthCorrecture: number, heightCorrecture: number,
         cellWidth: number, cellHeight: number,
         fieldWidth: number, fieldHeight: number): void {
        if (this.x > fieldWidth - 1 || this.x < 0
            || this.y < 0 ||  this.y > fieldHeight - 1 ) {
            this.removeFood(this.x, this.y);
        }
        context.beginPath();
        context.fillStyle = '#84e968';
        context.arc(this.x * cellWidth + cellWidth / 2 + widthCorrecture,
                    this.y * cellHeight + cellHeight / 2 + heightCorrecture,
                    cellWidth / 2, 0, 2 * Math.PI, false);
        context.fill();
        context.stroke();
        context.fillStyle = 'black';
    }

    placeNewFood(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    removeFood(x: number, y: number): void {
        if (this.x === x && this.y === y ) {
            this.x = undefined;
            this.y = undefined;
        }
    }
}
