import { SnakePart } from './snake-part';
import { Direction } from './direction';
import { CellObject } from './cell-object';
import { SnakeInputConfiguration } from './snake-game-configuration';

export class Snake {
    private direction = Direction.right;
    private snakeParts: SnakePart[] = [];
    private snakeHead: SnakePart;
    private changeCounter = 0;
    private headCenter: number[] = [0, 0];

    constructor(private fieldWidth: number,
                private fieldHeight: number,
                snakeSize: number,
                startPos: number,
                private input: SnakeInputConfiguration) {

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

    draw(context: CanvasRenderingContext2D, cellWidth: number, cellHeight: number, snakeNumber: number): void {
        for (let i = 0; i < this.snakeParts.length; i++) {
            if (snakeNumber === 0) {
                context.fillStyle = '#08088A';
            } else {
                context.fillStyle = '#B18904';
            }
            this.headCenter[0] =  this.snakeParts[i].x * cellWidth;
            this.headCenter[1] =  this.snakeParts[i].y * cellHeight;
            if ( i === 0 && this.snakeParts.length > 1) {
                this.drawHead(context, cellHeight, cellWidth);
                this.drawEyes(context, cellHeight, cellWidth);
            } else {
                context.fillRect(this.headCenter[0],
                                 this.headCenter[1],
                                 cellWidth, cellHeight);
            }
         }
    }
    grow(): void {
        this.addPart(this.snakeParts[this.snakeParts.length - 1].x,
                     this.snakeParts[this.snakeParts.length - 1].y);
    }

    onkey(key: KeyboardEvent): void {
        if (this.changeCounter === 0) {
            if (key.code === this.input.right && this.direction !== Direction.left) {
                this.direction = Direction.right;
            }
            if (key.code === this.input.up && this.direction !== Direction.down) {
                this.direction = Direction.up;
            }
            if (key.code === this.input.down && this.direction !== Direction.up) {
                this.direction = Direction.down;
            }
            if (key.code === this.input.left && this.direction !== Direction.right) {
                this.direction = Direction.left;
            }
        }

        this.changeCounter++;
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
    private drawHead(context: CanvasRenderingContext2D, cellWidth: number, cellHeight: number): void {
        context.beginPath();
            switch (this.direction) {
                case Direction.right:
                    context.arc((this.headCenter[0]),
                    (this.headCenter[1] + cellHeight / 2),
                    (cellWidth / 2), 1.5 * Math.PI, (0.5 * Math.PI), false);
                    break;
                case Direction.left:
                    context.arc((this.headCenter[0] + cellWidth ),
                    (this.headCenter[1] + cellHeight / 2),
                    (cellWidth / 2), 0.5 * Math.PI, (1.5 * Math.PI), false);
                    break;
                case Direction.down:
                    context.arc((this.headCenter[0] + cellWidth / 2),
                    (this.headCenter[1] ),
                    (cellWidth / 2), 0 * Math.PI, (1 * Math.PI), false);
                    break;
                case Direction.up:
                    context.arc((this.headCenter[0] + cellWidth / 2),
                    (this.headCenter[1] + cellHeight),
                    (cellWidth / 2), 1 * Math.PI, (0 * Math.PI), false);
            }
            context.fill();
        }
    private drawEyes(context: CanvasRenderingContext2D, cellWidth: number, cellHeight: number) {
        context.beginPath();
        context.fillStyle = 'red';
        switch (this.direction) {
            case Direction.right:
                context.arc((this.headCenter[0]),
                            (this.headCenter[1] + cellHeight / 2) - cellWidth / 4,
                            3, 0 * Math.PI, (2 * Math.PI), false);
                context.arc((this.headCenter[0]),
                            (this.headCenter[1] + cellHeight / 2) + cellWidth / 4,
                            3, 0 * Math.PI, (2 * Math.PI), false);
                break;
            case Direction.left:
                context.arc((this.headCenter[0] + cellWidth ),
                            (this.headCenter[1] + cellHeight / 2) - cellWidth / 4,
                            3, 0 * Math.PI, (2 * Math.PI), false);
                context.arc((this.headCenter[0] + cellWidth ),
                            (this.headCenter[1] + cellHeight / 2) + cellWidth / 4,
                            3, 0 * Math.PI, (2 * Math.PI), false);
                break;
            case Direction.down:
                context.arc((this.headCenter[0] + cellWidth / 2) - cellWidth / 4,
                            (this.headCenter[1] ),
                            3, 0 * Math.PI, (2 * Math.PI), false);
                context.arc((this.headCenter[0] + cellWidth / 2) + cellWidth / 4,
                            (this.headCenter[1] ),
                            3, 0 * Math.PI, (2 * Math.PI), false);
                break;
            case Direction.up:
                context.arc((this.headCenter[0] + cellWidth / 2) - cellWidth / 4,
                            (this.headCenter[1] + cellHeight),
                            3, 0 * Math.PI, (2 * Math.PI), false);
                context.arc((this.headCenter[0] + cellWidth / 2) + cellWidth / 4,
                            (this.headCenter[1] + cellHeight),
                            3, 0 * Math.PI, (2 * Math.PI), false);
        }
        context.fill();
    }
}
