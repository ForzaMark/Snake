import { Food } from './food';
import { Snake } from './snake';
import { SnakeGrid } from './grid';
import { Level } from './Level';
import { ConfigDataService } from '../../config-data.service';

export class SnakeGame {
    private snake: Snake;
    private food: Food;
    private fieldWidth = 20;
    private fieldHeight = 15;
    private cellWidth: number;
    private cellHeight: number;
    private grid: SnakeGrid;
    private level: Level;
    private ConfigData: number;
    private data: ConfigDataService;
    private snakeSize = 1;
    private wall = false;
    private multiplayer = false;

    constructor(private screenWidth: number, private screenHeight: number, ConfigData: number[]) {
        this.fieldWidth = ConfigData[0];
        this.fieldHeight = ConfigData[1];
        this.snakeSize = ConfigData[2];
        console.log(ConfigData[3]);
        if (ConfigData[3].toString() === 'on') { this.wall = true; }
        if (ConfigData[4].toString() === 'on') { this.multiplayer = true; }

        this.cellWidth = Math.trunc(screenWidth / this.fieldWidth);
        this.cellHeight = Math.trunc(screenHeight / this.fieldHeight);

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

            if (Number.isInteger(this.snake.getSnakeParts().length / 10)
                || this.snake.getSnakeParts().length / 10 === 0.2) {
                this.level.addObstacle(this.snake.getSnakeParts(), this.food);
            } else {
                this.level.changeObstaclePosition();
            }
        }
        for (let i = 0; i < this.level.getObstacles().length; i++) {
            if (this.snake.isOnSnake(this.level.getObstacles()[i])) {
                return false;
            }
        }

        for (let i = 1; i < this.snake.getSnakeParts().length; i++) {
            if ((this.snake.isOnSnake(this.snake.getSnakeParts()[i]) && this.snake.getSnakeParts().length > 2)) {
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
