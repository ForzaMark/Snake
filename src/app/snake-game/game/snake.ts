import { SnakePart } from './snake-part';
import { Direction } from './direction';
import { CellObject } from './cell-object';
import { SnakeInputConfiguration } from './snake-game-configuration';

export class Snake {
    private direction = Direction.right;
    private snakeParts: SnakePart[] = [];
    public snakeHead: SnakePart;
    private changeCounter = 0;
    private partCenter = {
        x : 0,
        y : 0
    };
    private witdhCorrecture: number;
    private heightCorrecture: number;

    constructor(private fieldWidth: number,
                private fieldHeight: number,
                snakeSize: number,
                startPos: number,
                private input: SnakeInputConfiguration,
                widthCorrectur: number, heightCorrecture: number) {
        this.witdhCorrecture = widthCorrectur;
        this.heightCorrecture = heightCorrecture;
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

    draw(context: CanvasRenderingContext2D,
         cellWidth: number, cellHeight: number,
         snakeNumber: number, color: string,
         widthCorrectur: number, heightCorrecture: number): void {
        for (let i = 0; i < this.snakeParts.length; i++) {
            if (snakeNumber === 0) {
                context.fillStyle = color;
            } else {
                context.fillStyle = '#B18904';
            }
            this.partCenter.x =  this.snakeParts[i].x * cellWidth + widthCorrectur;
            this.partCenter.y =  this.snakeParts[i].y * cellHeight + heightCorrecture;

            if ( i === 0 ) {
                this.drawHead(context, cellHeight, cellWidth);
                this.drawEyes(context, cellHeight, cellWidth);

            } else if (i === this.snakeParts.length - 1) {
                this.drawTail(context, cellHeight, cellWidth);
            } else {
                context.fillRect(this.partCenter.x,
                                 this.partCenter.y,
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
        if (this.heightCorrecture !== 0 || this.witdhCorrecture !== 0) {
            if (this.snakeHead.x >= this.fieldWidth && wallenabled) {
                this.snakeParts[0].x = 0;
            }
            if (this.snakeHead.x < 0 && wallenabled) {
                this.snakeParts[0].x = this.fieldWidth - 1;
            }
            if (this.snakeHead.y >= this.fieldHeight && wallenabled) {
                this.snakeParts[0].y = 0;
            }
            if (this.snakeHead.y < 0 && wallenabled) {
                this.snakeParts[0].y = this.fieldHeight - 1;
            }
        } else {
            if (this.snakeHead.x >= this.fieldWidth && wallenabled) {
                this.snakeParts[0].x = 0;
            }
            if (this.snakeHead.x < 0 && wallenabled) {
                this.snakeParts[0].x = this.fieldWidth - 1;
            }
            if (this.snakeHead.y >= this.fieldHeight && wallenabled) {
                this.snakeParts[0].y = 0;
            }
            if (this.snakeHead.y < 0 && wallenabled) {
                this.snakeParts[0].y = this.fieldHeight;
            }
        }
        if (!wallenabled && (this.snakeHead.x >= this.fieldWidth)) {
            this.direction = Direction.left;
            this.makeaStep();
            this.direction = Direction.down;
            this.makeaStep();
            return false;
        }
        if (!wallenabled && (this.snakeHead.x < 0)) {
            this.direction = Direction.right;
            this.makeaStep();
            this.direction = Direction.up;
            this.makeaStep();
            return false;
        }
        if (!wallenabled && (this.snakeHead.y >= this.fieldHeight)) {
            this.direction = Direction.up;
            this.makeaStep();
            this.direction = Direction.right;
            this.makeaStep();
            return false;
        }
        if (!wallenabled && (this.snakeHead.y < 0)) {
            this.direction = Direction.down;
            this.makeaStep();
            this.direction = Direction.left;
            this.makeaStep();
            return false;
        }
        return true;
    }
    private drawHead(context: CanvasRenderingContext2D, cellWidth: number, cellHeight: number): void {
        context.beginPath();
            switch (this.direction) {
                case Direction.right:
                    context.arc((this.partCenter.x + cellWidth / 2),
                                (this.partCenter.y + cellHeight / 2 ),
                                (cellWidth / 2), 1.5 * Math.PI, (0.5 * Math.PI), false);
                    context.fillRect(this.partCenter.x, this.partCenter.y, cellWidth / 2, cellHeight);
                    break;
                case Direction.left:
                    context.arc((this.partCenter.x  + cellWidth / 2 ),
                                (this.partCenter.y + cellHeight / 2),
                                (cellWidth / 2), 0.5 * Math.PI, (1.5 * Math.PI), false);
                    context.fillRect(this.partCenter.x + cellWidth / 2, this.partCenter.y, cellWidth / 2, cellHeight);
                    break;
                case Direction.down:
                    context.arc((this.partCenter.x + cellWidth / 2),
                                (this.partCenter.y + cellHeight / 2),
                                (cellWidth / 2), 0 * Math.PI, (1 * Math.PI), false);
                    context.fillRect(this.partCenter.x,
                                    this.partCenter.y, cellWidth ,
                                    cellHeight / 2 );
                    break;
                case Direction.up:
                    context.arc((this.partCenter.x + cellWidth / 2),
                                (this.partCenter.y + cellHeight / 2),
                                (cellWidth / 2), 1 * Math.PI, (0 * Math.PI), false);
                    context.fillRect(this.partCenter.x,
                                    this.partCenter.y + cellHeight / 2, cellWidth ,
                                    cellHeight / 2 );
            }
            context.fill();
        }
    private drawEyes(context: CanvasRenderingContext2D, cellWidth: number, cellHeight: number) {
        context.beginPath();
        context.fillStyle = 'red';
        if (this.direction === Direction.right || this.direction === Direction.left) {
            context.arc((this.partCenter.x + cellWidth / 2  ),
                        (this.partCenter.y + cellHeight / 2) - cellWidth / 4,
                        3, 0 * Math.PI, (2 * Math.PI), false);
            context.arc((this.partCenter.x + cellWidth / 2 ),
                        (this.partCenter.y + cellHeight / 2) + cellWidth / 4,
                        3, 0 * Math.PI, (2 * Math.PI), false);
        }
        if (this.direction === Direction.up || this.direction === Direction.down) {
            context.arc((this.partCenter.x + cellWidth / 2) - cellWidth / 4,
                        (this.partCenter.y + cellHeight / 2),
                        3, 0 * Math.PI, (2 * Math.PI), false);
            context.arc((this.partCenter.x + cellWidth / 2) + cellWidth / 4,
                        (this.partCenter.y + cellHeight / 2),
                        3, 0 * Math.PI, (2 * Math.PI), false);
        }
        context.fill();
    }

    private drawTail(context: CanvasRenderingContext2D, cellWidth: number, cellHeight: number) {
        const dir = this.snakeParts[this.snakeParts.length - 2];
        context.beginPath();
        if (dir.x - this.snakeParts[this.snakeParts.length - 1].x === -1) {
            context.fillRect(this.partCenter.x,
                            this.partCenter.y,
                            cellWidth / 2,
                            cellHeight);
            context.arc(this.partCenter.x + cellWidth / 2,
                        this.partCenter.y +  cellHeight / 2,
                        cellWidth / 2,
                        1.5 * Math.PI,
                        0.5 * Math.PI);
        }
        if (dir.x - this.snakeParts[this.snakeParts.length - 1].x === 1 ) {
            context.fillRect(this.partCenter.x + cellWidth / 2,
                             this.partCenter.y,
                             cellWidth / 2,
                             cellHeight);
            context.arc(this.partCenter.x + cellWidth / 2,
                        this.partCenter.y + cellHeight / 2,
                        cellWidth / 2,
                        0.5 * Math.PI,
                        1.5 * Math.PI);
        }
        if (dir.y - this.snakeParts[this.snakeParts.length - 1].y === -1) {
            context.fillRect(this.partCenter.x,
                            this.partCenter.y - cellHeight / 2,
                            cellWidth ,
                            cellHeight);
            context.arc(this.partCenter.x + cellWidth / 2,
                        this.partCenter.y + cellHeight / 2,
                        cellWidth / 2,
                        0,
                        Math.PI);
        }
        if (dir.y - this.snakeParts[this.snakeParts.length - 1].y === 1) {
            context.fillRect(this.partCenter.x,
                            this.partCenter.y + cellHeight / 2,
                            cellWidth,
                            cellHeight);
            context.arc(this.partCenter.x + cellWidth / 2,
                        this.partCenter.y + cellHeight / 2,
                        cellWidth / 2,
                        Math.PI,
                        0);
        } else {

        }
        context.fill();
    }
}
