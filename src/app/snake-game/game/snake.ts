import { SnakePart } from './snake-part';
import { Direction } from './direction';
import { CellObject } from './cell-object';

export class Snake {
    private direction = Direction.right;
    private snakeParts: SnakePart[] = [];
    private snakeHead: SnakePart;

    constructor(private fieldWidth: number, private fieldHeight: number, snakeSize: number, startPos:number) {
        for (let i = 0; i < snakeSize; i++) {
            if (startPos === 0) {
                this.addPart(0, startPos);
            } else {
                this.addPart(fieldWidth,fieldHeight-1)
                this.direction = Direction.left;
            }
        }
        this.snakeHead = this.snakeParts[0];
        
    }

    private addPart(x: number, y: number): void {
        this.snakeParts.push(new SnakePart(x, y));
    }

    move(wallEnabled: boolean): boolean {
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
        //wall

        if (this.snakeHead.x >= this.fieldWidth && wallEnabled) {
            this.snakeParts[0].x = 0;
        } else if (this.snakeHead.x > this.fieldWidth && !wallEnabled) {
            return false;
        }
        if (this.snakeHead.x < 0 && wallEnabled) {
            this.snakeParts[0].x = this.fieldWidth;
        } else if (this.snakeHead.x < -1 && !wallEnabled) {
            return false;
        }
        if (this.snakeHead.y >= this.fieldHeight && wallEnabled) {
            this.snakeParts[0].y = 0;
        } else if (this.snakeHead.y > this.fieldHeight && !wallEnabled) {
            return false;
        }
        if (this.snakeHead.y < 0 && wallEnabled) {
            this.snakeParts[0].y = this.fieldHeight;
        } else if (this.snakeHead.y < -1 && !wallEnabled) {
            return false;
        }
        return true;
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
        
        
        if(x === 0){
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
        if (x === 1) {
            if (key.code === 'KeyD' && this.direction !== Direction.left) {
                this.direction = Direction.right;
                }
                if (key.code === 'KeyW' && this.direction !== Direction.down) {
                    this.direction = Direction.up;
                }
                if (key.code === 'KeyS' && this.direction !== Direction.up) {
                    this.direction = Direction.down;
                }
                if (key.code === 'KeyA' && this.direction !== Direction.right) {
                    this.direction = Direction.left;
                }
        }
    }
    isOnSnake(cellObject: CellObject): boolean {
        for (let i = 0; i < this.snakeParts.length; i++) {
            if (cellObject.x === this.snakeHead.x && cellObject.y === this.snakeHead.y) {
                return true;
            } else { return false; }
        }
    }

    collidesWithItself(): boolean {
        for (let i = 1; i < this.snakeParts.length; i++) {
            if ((this.isOnSnake(this.snakeParts[i]) && this.snakeParts.length > 2)) {
                return true;
            }
        }
        return false;
    }

    getSnakeLength(): number {
        return this.snakeParts.length;
    }

    collidesWithOtherSnake(otherSnake: this): boolean {
        for (let i = 0; i < otherSnake.snakeParts.length; i++) {
            if(this.snakeHead.x === otherSnake.snakeParts[i].x &&
               this.snakeHead.y === otherSnake.snakeParts[i].y){
                return true
            }
        }
        return false;
    }
}
