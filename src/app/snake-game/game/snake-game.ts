import {Food} from './food';
import {Snake} from './snake';
import { SnakeGrid } from './grid';

export class SnakeGame {
    private snake: Snake;
    private food: Food;
    private fieldWidth = 20;
    private fieldHeight = 15;
    private cellWidth: number;
    private cellHeight: number;
    private grid: SnakeGrid;

    constructor(private screenWidth: number, private screenHeight: number) {
        this.cellWidth = screenWidth / this.fieldWidth;
        this.cellHeight = screenHeight / this.fieldHeight;
        this.snake = new Snake();
        this.grid = new SnakeGrid(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);
        this.snake.addParts(0, 0);
        this.snake.addParts(1, 0);
        this.snake.addParts(2, 0);
        this.snake.addParts(3, 0);
    }

    update() {
        this.snake.sort();
        this.snake.move();
        this.snake.setSnakeHead(this.snake.getParts()[0].x,
                                this.snake.getParts()[0].y);
        this.wall();
    }

    draw(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);
        this.grid.drawGrid(context);
        this.snake.draw(context, this.cellWidth, this.cellHeight);
    }

    onKeyUp(key: KeyboardEvent) {
        if (key.code === 'ArrowRight') {
            this.snake.setDirection('Right');
        }
        if (key.code === 'ArrowUp') {
            this.snake.setDirection('Up');
        }
        if (key.code === 'ArrowDown') {
            this.snake.setDirection('Down');
        }
        if (key.code === 'ArrowLeft') {
            this.snake.setDirection('Left');
        }
    }

    wall() {
        if (this.snake.getSnakeHead().x === this.fieldWidth) {
            this.snake.getParts()[0].x = 0;
        }
        if (this.snake.getSnakeHead().x === -1) {
            this.snake.getParts()[0].x = this.fieldWidth;
        }
        if (this.snake.getSnakeHead().y === this.fieldHeight) {
            this.snake.getParts()[0].y = 0;
        }
        if (this.snake.getSnakeHead().y === -1) {
            this.snake.getParts()[0].y = this.fieldHeight;
        }
    }
}
