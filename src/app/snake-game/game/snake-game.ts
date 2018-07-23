import { Food } from './food';
import { Snake } from './snake';
import { SnakeGrid } from './grid';
import { Level } from './Level';

export class SnakeGame {
    private snake: Snake;
    private food: Food;
    private fieldWidth = 20;
    private fieldHeight = 15;
    private cellWidth: number;
    private cellHeight: number;
    private grid: SnakeGrid;
    private level: Level;

    constructor(private screenWidth: number, private screenHeight: number) {
        this.cellWidth = screenWidth / this.fieldWidth;
        this.cellHeight = screenHeight / this.fieldHeight;
        this.snake = new Snake(this.fieldWidth, this.fieldHeight);
        this.grid = new SnakeGrid(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);
        this.food = new Food(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);
        this.level = new Level(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);

        this.food.createNewFood(this.snake.getSnakeParts());
    }

    update(): boolean {
        this.snake.move();
        if (this.snake.isOnSnake(this.food)) {
            this.snake.grow();
            this.food.createNewFood(this.snake.getSnakeParts());
            console.log('1 ' + Number.isInteger(this.snake.getSnakeParts().length / 10));
            console.log('2 ' + this.snake.getSnakeParts().length / 10);
            if (Number.isInteger(this.snake.getSnakeParts().length / 10) || this.snake.getSnakeParts().length / 10 === 0.2) {
                this.level.addObstacle(this.snake.getSnakeParts(), this.food);
            }
        }
        for (let i = 1; i < this.level.getObstacles().length; i++) {
            console.log('3 ' + this.level.getObstacles()[i]);
            // console.log(this.level.getObstacles()[i]);
            // console.log(this.snake.getSnakeParts()[i]);
            if (this.snake.isOnSnake(this.level.getObstacles()[i])) {
                console.log('eins');
                
                return false;
            }
        }

        for (let i = 1; i < this.snake.getSnakeParts().length; i++) {
            if ((this.snake.isOnSnake(this.snake.getSnakeParts()[i]) && this.snake.getSnakeParts().length > 2)) {
                console.log('zwo');
                
                return false;
            }
        }
        return true;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);
        this.grid.draw(context);
        this.snake.draw(context, this.cellWidth, this.cellHeight);
        this.food.draw(context);
        this.level.draw(context);
    }

    onKeyUp(key: KeyboardEvent): void {
        this.snake.onkey(key);
    }
    getLength(): number {
        return this.snake.getSnakeParts().length;
    }
}
