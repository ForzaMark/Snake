import { Food } from './food';
import { Snake } from './snake';
import { SnakeGrid } from './grid';
import { Level } from './Level';
import { SnakeGameConfiguration } from './snake-game-configuration';

export class SnakeGame {
    private snake: Snake;
    private food: Food;
    private fieldWidth = 20;
    private fieldHeight = 15;
    private cellWidth: number;
    private cellHeight: number;
    private grid: SnakeGrid;
    private level: Level;
    private snakeSize = 1;
    private wallenabled :boolean;
    private SkillLevel = 10;
    private multiplayer: boolean;
    score: number;

    constructor(private screenWidth: number, private screenHeight: number, private configuration: SnakeGameConfiguration) {
        
        this.fieldWidth = configuration.levelWidth;
        this.fieldHeight = configuration.levelHeight;
        this.snakeSize = configuration.snakeLength;
        this.wallenabled = configuration.wall;
        this.SkillLevel = configuration.skillLevel;
        this.multiplayer = configuration.multiplayer;

        this.cellWidth = screenWidth / this.fieldWidth;
        this.cellHeight = screenHeight / this.fieldHeight;

        this.snake = new Snake(this.fieldWidth, this.fieldHeight, this.snakeSize);
        this.grid = new SnakeGrid(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);

        this.food = new Food(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);
        this.level = new Level(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);
        this.food.createNewFood(this.snake);
    }

    update(): boolean {
        if (!this.snake.move(this.wallenabled)) {
            return false;
        }
        if (this.snake.isOnSnake(this.food)) {
            this.score++;
            this.snake.grow();
            this.food.createNewFood(this.snake);
            if ((this.snake.getSnakeLength() % this.SkillLevel === 0)
                || this.snake.getSnakeLength() === this.snakeSize + 1) {
                this.level.addObstacle(this.snake, this.food);
            } else {
                this.level.changeObstaclePosition(this.snake, this.food);
            }
        }

        if (this.level.collidesWith(this.snake)) {
            return false;
        }

        if (this.snake.collidesWithItself()) {
            return false;
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
}
