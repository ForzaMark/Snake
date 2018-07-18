import {Food} from './food';
import {Snake} from './snake';

export enum Direction {
    Left,
    Right,
    Up,
    Down
}

export class SnakeGame {
    private snake: Snake;
    private direction: Direction = Direction.Right;
    private food = new Food();
    private fieldWidth = 20;
    private fieldHeight = 15;
    private cellWidth: number;
    private cellHeight: number;

    constructor(private screenWidth: number, private screenHeight: number) {
        this.snake = new Snake();
        this.snake.addParts(1, 0);
        this.snake.addParts(2, 0);
        this.snake.addParts(3, 0);
        this.cellWidth = screenWidth / this.fieldWidth;
        this.cellHeight = screenHeight / this.fieldHeight;
    }

    update() {
        for (let i = this.snake.getParts().length - 1 ; i > 0; i--) {
            this.snake.getParts()[i].x = this.snake.getParts()[i - 1].x;
            this.snake.getParts()[i].y = this.snake.getParts()[i - 1].y;
        }
        switch (this.direction) {
            case Direction.Left:
                this.snake.getParts()[0].x -= 1;
                break;
            case Direction.Right:
                this.snake.getParts()[0].x += 1;
                break;
            case Direction.Down:
                this.snake.getParts()[0].y += 1;
                break;
            case Direction.Up:
                this.snake.getParts()[0].y -= 1;
                break;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);
        for (let x = 0; x !== this.fieldWidth; x++) {
            context.beginPath();
            context.moveTo(x * this.cellWidth, 0);
            context.lineTo(x * this.cellWidth, this.fieldHeight * this.cellHeight);
            context.stroke();
        }
        for (let y = 0; y !== this.fieldHeight ; y++) {
           context.beginPath();
           context.moveTo(0, y * this.cellHeight);
           context.lineTo(this.cellWidth * this.fieldWidth, y * this.cellHeight);
           context.stroke();
         }
         for (let i = 0; i < this.snake.getParts().length; i++) {
            context.fillRect(this.snake.getParts()[i].x * this.cellWidth,
                             this.snake.getParts()[i].y * this.cellHeight,
                             this.cellWidth,
                             this.cellHeight);
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
