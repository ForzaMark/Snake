import {SnakePart} from './snake-part';

export class Snake {

    constructor() {}

    private direction: String = 'Right';
    private snakeParts: SnakePart[] = [];
    private snakeHead = {
        x : 0,
        y : 0
    };

    addParts(x: number, y: number): void {
        this.snakeParts.push(new SnakePart(x, y));
    }

    getParts(): SnakePart[] {
        return this.snakeParts;
    }

    getDirection(): String {
        return this.direction;
    }

    setDirection(dir: String): void {
        this.direction = dir;
    }

    setSnakeHead(x: number, y: number) {
        this.snakeHead.x = x;
        this.snakeHead.y = y;
    }

    getSnakeHead(): object {
        return this.snakeHead;
    }

    move(): void {
        switch (this.getDirection()) {
            case 'Left':
                this.getParts()[0].x -= 1;
                break;
            case 'Right':
                this.getParts()[0].x += 1;
                break;
            case 'Down':
                this.getParts()[0].y += 1;
                break;
            case 'Up':
                this.getParts()[0].y -= 1;
                break;
        }
    }

    draw(context: CanvasRenderingContext2D, cellWidth: number, cellHeight: number ) {
        for (let i = 0; i < this.getParts().length; i++) {
            context.fillRect(this.getParts()[i].x * cellWidth,
                             this.getParts()[i].y * cellHeight,
                             cellWidth, cellHeight);
         }
    }

    sort(): void {
        for (let i = this.getParts().length - 1 ; i > 0; i--) {
            this.getParts()[i].x = this.getParts()[i - 1].x;
            this.getParts()[i].y = this.getParts()[i - 1].y;
        }
    }
}
