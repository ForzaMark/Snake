import { SnakePart } from './snake-part';
import { Direction } from './direction';
import { CellObject } from './cell-object';
import { SnakeInputConfiguration } from './snake-game-configuration';

export class Snake {
    private direction = Direction.right;
    private snakeParts: SnakePart[] = [];
    private snakeHead: SnakePart;
    private changeCounter = 0;
    private RectCenter = {
        x : 0,
        y : 0
    };

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
            this.RectCenter.x =  this.snakeParts[i].x * cellWidth;
            this.RectCenter.y =  this.snakeParts[i].y * cellHeight;

            if ( i === 0 ) {
                this.drawHead(context, cellHeight, cellWidth);
                this.drawEyes(context, cellHeight, cellWidth);

            } else {
                context.fillRect(this.RectCenter.x,
                                 this.RectCenter.y,
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
                    context.arc((this.RectCenter.x + cellWidth / 2),
                                (this.RectCenter.y + cellHeight / 2 ),
                                (cellWidth / 2), 1.5 * Math.PI, (0.5 * Math.PI), false);
                    context.fillRect(this.RectCenter.x, this.RectCenter.y, cellWidth / 2, cellHeight);
                    break;
                case Direction.left:
                    context.arc((this.RectCenter.x  + cellWidth / 2 ),
                                (this.RectCenter.y + cellHeight / 2),
                                (cellWidth / 2), 0.5 * Math.PI, (1.5 * Math.PI), false);
                    context.fillRect(this.RectCenter.x + cellWidth / 2, this.RectCenter.y, cellWidth / 2, cellHeight);
                    break;
                case Direction.down:
                    context.arc((this.RectCenter.x + cellWidth / 2),
                                (this.RectCenter.y + cellHeight / 2),
                                (cellWidth / 2), 0 * Math.PI, (1 * Math.PI), false);
                    context.fillRect(this.RectCenter.x,
                                    this.RectCenter.y, cellWidth ,
                                    cellHeight / 2 );
                    break;
                case Direction.up:
                    context.arc((this.RectCenter.x + cellWidth / 2),
                                (this.RectCenter.y + cellHeight / 2),
                                (cellWidth / 2), 1 * Math.PI, (0 * Math.PI), false);
                    context.fillRect(this.RectCenter.x,
                                    this.RectCenter.y + cellHeight / 2, cellWidth ,
                                    cellHeight / 2 );
            }
            context.fill();
        }
    private drawEyes(context: CanvasRenderingContext2D, cellWidth: number, cellHeight: number) {
        context.beginPath();
        context.fillStyle = 'red';
        if (this.direction === Direction.right || this.direction === Direction.left) {
            context.arc((this.RectCenter.x + cellWidth / 2  ),
                        (this.RectCenter.y + cellHeight / 2) - cellWidth / 4,
                        3, 0 * Math.PI, (2 * Math.PI), false);
            context.arc((this.RectCenter.x + cellWidth / 2 ),
                        (this.RectCenter.y + cellHeight / 2) + cellWidth / 4,
                        3, 0 * Math.PI, (2 * Math.PI), false);
        }
        if (this.direction === Direction.up || this.direction === Direction.down) {
            context.arc((this.RectCenter.x + cellWidth / 2) - cellWidth / 4,
                        (this.RectCenter.y + cellHeight / 2),
                        3, 0 * Math.PI, (2 * Math.PI), false);
            context.arc((this.RectCenter.x + cellWidth / 2) + cellWidth / 4,
                        (this.RectCenter.y + cellHeight / 2),
                        3, 0 * Math.PI, (2 * Math.PI), false);
        }
        context.fill();
    }
}
