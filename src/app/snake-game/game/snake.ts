import {SnakePart} from './snake-part';
import { Food } from './food';
import { Direction } from './direction';

export class Snake {
    private direction = Direction.right;
    private snakeParts: SnakePart[] = [];
    private snakeHead: SnakePart;

    constructor(private fieldWidth: number, private fieldHeight: number) {
        this.addParts(3, 0);
        this.addParts(2, 0);
    }
    addParts(x: number, y: number): void {
        this.snakeParts.push(new SnakePart(x, y));
    }

    getParts(): SnakePart[] {
        return this.snakeParts;
    }

    getSnakeHead(): SnakePart {
        return this.snakeParts[0];
    }

    move(): void {

        // sort
        for (let i = this.getParts().length - 1 ; i > 0; i--) {
            this.getParts()[i].x = this.getParts()[i - 1].x;
            this.getParts()[i].y = this.getParts()[i - 1].y;
        }

        // move
        switch (this.direction) {
            case Direction.left:
                this.getParts()[0].x -= 1;
                break;
            case Direction.right:
                this.getParts()[0].x += 1;
                break;
            case Direction.down:
                this.getParts()[0].y += 1;
                break;
            case Direction.up:
                this.getParts()[0].y -= 1;
                break;
        }

        // wall
        if (this.getSnakeHead().x === this.fieldWidth) {
            this.getParts()[0].x = 0;
        }
        if (this.getSnakeHead().x === -1) {
            this.getParts()[0].x = this.fieldWidth;
        }
        if (this.getSnakeHead().y === this.fieldHeight) {
            this.getParts()[0].y = 0;
        }
        if (this.getSnakeHead().y === -1) {
            this.getParts()[0].y = this.fieldHeight;
        }

        this.snakeHead = this.snakeParts[0];
    }

    draw(context: CanvasRenderingContext2D, cellWidth: number, cellHeight: number): void {
        for (let i = 0; i < this.getParts().length; i++) {
            context.fillRect(this.getParts()[i].x * cellWidth,
                             this.getParts()[i].y * cellHeight,
                             cellWidth, cellHeight);
         }
    }
    eat(food: Food): void {
        if (this.snakeHead.x === food.getPosX() && this.snakeHead.y === food.getPosY()) {
            food.createNewFood();
            this.addParts(this.getParts()[this.getParts().length - 1].x,
                          this.getParts()[this.getParts().length - 1].y);
        }
    }

    hasCrashed(): boolean {
        for (let i = 1; i < this.getParts().length; i++) {
            if (this.snakeHead.x === this.getParts()[i].x && this.snakeHead.y === this.getParts()[i].y) {
                return true;
            }
        }
        return false;
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
}
