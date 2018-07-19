import { Food } from './food';
import { Snake } from './snake';
import { SnakeGrid } from './grid';
import { State } from './state';

export class SnakeGame {
    private snake: Snake;
    private food: Food;
    private fieldWidth = 20;
    private fieldHeight = 15;
    private cellWidth: number;
    private cellHeight: number;
    private grid: SnakeGrid;
    private state = State.false;

    constructor(private screenWidth: number, private screenHeight: number) {
        this.cellWidth = screenWidth / this.fieldWidth;
        this.cellHeight = screenHeight / this.fieldHeight;
        this.snake = new Snake(this.fieldWidth, this.fieldHeight);
        this.grid = new SnakeGrid(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);
        this.food = new Food(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);
        this.food.createNewFood();
    }

    update(): boolean {
        this.snake.move();
        if (this.snake.canEat(this.food)) {
            this.snake.grow();
            this.food.createNewFood();
        }
        if (this.snake.hasCrashed()) {
            return false;
        }
    }

    draw(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);
        this.grid.draw(context);
        this.snake.draw(context, this.cellWidth, this.cellHeight);
        this.food.draw(context);
    }

    onKeyUp(key: KeyboardEvent): void {
        this.snake.onkey(key);
    }
}
