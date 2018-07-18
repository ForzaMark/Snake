import {Food} from './food';
import { SnakePart } from './snake-part';

export enum Direction {
    Left,
    Right,
    Up,
    Down
}

export class SnakeGame {
    private snakeParts: SnakePart[] = [];
    private direction: Direction = Direction.Right;
    private food = new Food();

    constructor(private screenWidth: number, private screenHeight: number) {
        this.snakeParts.push(new SnakePart(3, 0));
        this.snakeParts.push(new SnakePart(2, 0));
        this.snakeParts.push(new SnakePart(1, 0));
    }

    update() {
        for (let i = this.snakeParts.length - 1 ; i > 0; i--) {
            this.snakeParts[i].x = this.snakeParts[i - 1].x;
            this.snakeParts[i].y = this.snakeParts[i - 1].y;
        }
        switch (this.direction) {
            case Direction.Left:
                this.snakeParts[0].x -= 1;
                break;
            case Direction.Right:
                this.snakeParts[0].x += 1;
                break;
            case Direction.Down:
                this.snakeParts[0].y += 1;
                break;
            case Direction.Up:
                this.snakeParts[0].y -= 1;
                break;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);
        for (let x = 0; x !== 800 ; x += 20) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, 600);
            context.stroke();
        }
        for (let y = 0; y !== 600 ; y += 15) {
           context.beginPath();
           context.moveTo(0, y);
           context.lineTo(800, y);
           context.stroke();
         }
         for (let i = 0; i < this.snakeParts.length; i++) {
            context.fillRect(this.snakeParts[i].x * 20, this.snakeParts[i].y * 15, 20, 15);
         }
    }

    onKeyUp(key: KeyboardEvent) {
        if (key.code === 'ArrowRight') {
            this.direction = Direction.Right;
        }
        if (key.code === 'ArrowUp') {
            this.direction = Direction.Up;
        }
        if (key.code === 'ArrowDown') {
            this.direction = Direction.Down;
        }
        if (key.code === 'ArrowLeft') {
            this.direction = Direction.Left;
        }
    }
}
