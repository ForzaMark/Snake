import { SnakePart } from './snake-part';
import { Direction } from './direction';
import { CellObject } from './cell-object';
import { Keys } from './enumKeys';

export class Snake {
    private direction = Direction.right;
    private snakeParts: SnakePart[] = [];
    private snakeHead: SnakePart;
    private changeCounter = 0;

    constructor(private fieldWidth: number,
                private fieldHeight: number,
                snakeSize: number,
                startPos: number,
                private player1Keys: Keys[] = [],
                private player2Keys: Keys[] = []) {

        for (let i = 0; i < snakeSize; i++) {
            if (startPos === 0) {
                this.addPart(0, startPos);
            } else {
                this.addPart(fieldWidth, fieldHeight - 1);
                this.direction = Direction.left;
            }
        }
        this.snakeHead = this.snakeParts[0];
    }

    private addPart(x: number, y: number): void {
        this.snakeParts.push(new SnakePart(x, y));
    }

    move(wallEnabled: boolean): boolean {
        this.sort();
        this.makeaStep();
       return this.wall(wallEnabled);
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

    onkey(key: KeyboardEvent, x: number): void {
        if (x === 0) {
            this.setDirection(this.player1Keys, key);
        } else {
            this.setDirection(this.player2Keys, key);
        }
    }

    isOnSnake(cellObject: CellObject): boolean {
        return this.isOnSnakeInternal(cellObject, 0);
    }

    collidesWithItself(): boolean {
        return this.isOnSnakeInternal(this.snakeHead, 2);
    }

    getSnakeLength(): number {
        return this.snakeParts.length;
    }

    collidesWithOtherSnake(otherSnake: this): boolean {
        return otherSnake.isOnSnake(this.snakeHead);
    }

    private isOnSnakeInternal(cellObject: CellObject, startIndex: number) {
        for (let i = startIndex; i < this.snakeParts.length ; i++) {
            if (cellObject.x === this.snakeParts[i].x && cellObject.y === this.snakeParts[i].y) {
                return true;
            }
        }
        return false;
    }
    private sort(): void {
        this.changeCounter = 0;
        for (let i = this.snakeParts.length - 1 ; i > 0; i--) {
            this.snakeParts[i].x = this.snakeParts[i - 1].x;
            this.snakeParts[i].y = this.snakeParts[i - 1].y;
        }
    }

    private makeaStep(): void {
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
    }
    private wall(wallenabled: boolean): boolean {
        if (this.snakeHead.x >= this.fieldWidth && wallenabled) {
            this.snakeParts[0].x = 0;
        } else if (this.snakeHead.x > this.fieldWidth && !wallenabled) {
            return false;
        }
        if (this.snakeHead.x < 0 && wallenabled) {
            this.snakeParts[0].x = this.fieldWidth;
        } else if (this.snakeHead.x < -1 && !wallenabled) {
            return false;
        }
        if (this.snakeHead.y >= this.fieldHeight && wallenabled) {
            this.snakeParts[0].y = 0;
        } else if (this.snakeHead.y > this.fieldHeight && !wallenabled) {
            return false;
        }
        if (this.snakeHead.y < 0 && wallenabled) {
            this.snakeParts[0].y = this.fieldHeight;
        } else if (this.snakeHead.y < -1 && !wallenabled) {
            return false;
        }
        return true;
    }
    private setDirection(keySet: Keys[], key: KeyboardEvent): void {

            if (key.code === keySet[3].toString()  && this.direction !== Direction.left && this.changeCounter === 0) {
            this.direction = Direction.right;
            }
            if (key.code === this.player1Keys[0].toString() && this.direction !== Direction.down && this.changeCounter === 0) {
                this.direction = Direction.up;
            }
            if (key.code === this.player1Keys[1].toString() && this.direction !== Direction.up && this.changeCounter === 0) {
                this.direction = Direction.down;
            }
            if (key.code === this.player1Keys[2].toString() && this.direction !== Direction.right && this.changeCounter === 0) {
                this.direction = Direction.left;
            }
            this.changeCounter++;
    }
}
