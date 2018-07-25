import { Snake } from './snake';
import { CellObject } from './cell-object';

export class Food implements CellObject {
    x: number;
    y: number;
//git
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
        context.beginPath()
        context.arc(this.x* this.cellWidth + this.cellWidth/2,
                    this.y * this.cellHeight + this.cellHeight / 2,
                    this.cellWidth/2,0,2* Math.PI,false);
                    
        context.fillStyle = 'green';
        context.fill();
        context.stroke();
        context.fillStyle = 'black';
    }
}
