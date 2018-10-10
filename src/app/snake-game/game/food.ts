import { Snake } from './snake';
import { CellObject } from './cell-object';
import { Level } from './Level';

export class Food implements CellObject {
    x: number;
    y: number;

    constructor(private fieldWidth: number, private fieldHeight: number) {}
    intersects(other: CellObject): boolean {
        return this.x === other.x && this.y === other.y;
    }

    createNewFood(snake: Snake, obstacles: Level, fixedPosition?: number[]): void {
        if (fixedPosition) {
            this.x = fixedPosition[0];
            this.y = fixedPosition[1];
        } else {
            let isOnObstacle = true;
            let isOnSnake = true;
            while (isOnObstacle || isOnSnake) {
                    this.x = Math.floor(Math.random() * this.fieldWidth);
                    this.y = Math.floor(Math.random() * this.fieldHeight);
                    isOnSnake = snake.isOnSnake(this);
                    isOnObstacle = obstacles.intersects(this);
            }
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
