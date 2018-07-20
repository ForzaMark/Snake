import {SnakePart} from './snake-part';
import { Food } from './food';
import { Direction } from './direction';
import { CellObject } from './cell-object';

export class Snake {
    private direction = Direction.right;
    private snakeParts: SnakePart[] = [];
    private snakeHead: SnakePart;

    constructor(private fieldWidth: number, private fieldHeight: number) {
        this.addPart(3, 0);
        this.snakeHead = this.snakeParts[0];
    }

    private addPart(x: number, y: number): void {
        this.snakeParts.push(new SnakePart(x, y));
    }

    move(): void {
        // sort
        for (let i = this.snakeParts.length - 1 ; i > 0; i--) {
            this.snakeParts[i].x = this.snakeParts[i - 1].x;
            this.snakeParts[i].y = this.snakeParts[i - 1].y;
        }

        // move
        switch (this.direction) {
            case Direction.left:
                this.snakeParts[0].x -= 1;
                break;
            case Direction.right:
                this.snakeParts[0].x += 1;
                break;
            case Direction.down:
                this.snakeParts[0].y += 1;
                break;
            case Direction.up:
                this.snakeParts[0].y -= 1;
                break;
        }

        // wall
        if (this.snakeHead.x === this.fieldWidth) {
            this.snakeParts[0].x = 0;
        }
        if (this.snakeHead.x === -1) {
            this.snakeParts[0].x = this.fieldWidth;
        }
        if (this.snakeHead.y === this.fieldHeight) {
            this.snakeParts[0].y = 0;
        }
        if (this.snakeHead.y === -1) {
            this.snakeParts[0].y = this.fieldHeight;
        }
    }

    draw(context: CanvasRenderingContext2D, cellWidth: number, cellHeight: number): void {
        for (let i = 0; i < this.snakeParts.length; i++) {
            context.fillRect(this.snakeParts[i].x * cellWidth,
                             this.snakeParts[i].y * cellHeight,
                             cellWidth, cellHeight);
         }
    }
    grow(): void {
        this.addPart(this.snakeParts[this.snakeParts.length - 1].x,
                     this.snakeParts[this.snakeParts.length - 1].y);
    }

    onkey(key: KeyboardEvent): void {
        if (key.code === 'ArrowRight' && this.direction !== Direction.left) {
           this.direction = Direction.right;
        }
        if (key.code === 'ArrowUp' && this.direction !== Direction.down) {
            this.direction = Direction.up;
        }
        if (key.code === 'ArrowDown' && this.direction !== Direction.up) {
            this.direction = Direction.down;
        }
        if (key.code === 'ArrowLeft' && this.direction !== Direction.right) {
            this.direction = Direction.left;
        }
    }
    getSnakeParts(): SnakePart[] {
        return this.snakeParts;
    }
    isOnSnake(cellObject: CellObject): Boolean {
        for (let i = 0; i < this.getSnakeParts().length; i++) {
            if (cellObject.x === this.snakeHead.x && cellObject.y === this.snakeHead.y) {
                return true;
            } else { return false; }
        }
    }
}
