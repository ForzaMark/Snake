import { Food } from './food';
import { Snake } from './snake';
import { SnakeGrid } from './grid';
import { Level } from './Level';
import { SnakeGameConfiguration } from './snake-game-configuration';

export class SnakeGame {
    private elapsedTimeSeconds: number;
    private food: Food;
    private cellWidth: number;
    private cellHeight: number;
    private grid: SnakeGrid;
    private level: Level;
    private multiSnake: Snake[] = [];
    score: number[] = [];

    constructor(private screenWidth: number, private screenHeight: number, private configuration: SnakeGameConfiguration) {
        this.elapsedTimeSeconds = 0;
        this.cellWidth = screenWidth / this.configuration.levelWidth;
        this.cellHeight = screenHeight / this.configuration.levelHeight;

        for (let i = 0; i < this.configuration.playerCount; i++) {
            this.multiSnake.push(new Snake(this.configuration.levelWidth,
                                           this.configuration.levelHeight,
                                           this.configuration.snakeLength,
                                           i,
                                           this.configuration.playerInputs[i]));
            this.score[i] = configuration.snakeLength;
        }

        this.grid = new SnakeGrid(this.cellWidth, this.cellHeight, this.configuration.levelWidth, this.configuration.levelHeight);
        this.food = new Food(this.cellWidth, this.cellHeight, this.configuration.levelWidth, this.configuration.levelHeight);
        this.level = new Level(this.cellWidth, this.cellHeight, this.configuration.levelWidth, this.configuration.levelHeight);
        this.food.createNewFood(this.multiSnake[0]);
    }

    update(deltaSeconds: number): boolean {
        const updateThresholdSeconds = this.configuration.speed;

        this.elapsedTimeSeconds += deltaSeconds;
        if (this.elapsedTimeSeconds < updateThresholdSeconds) {
            return true;
        } else {
            this.elapsedTimeSeconds -= updateThresholdSeconds;
        }

        for (let i = 0; i < this.multiSnake.length; i++) {
            if (!this.multiSnake[i].move(this.configuration.wall)) {
                alert('Beendet : mit Wand kollidiert --> Score : ' + this.score[i]);
                return false;
            }
            if (this.multiSnake[i].isOnSnake(this.food)) {
                this.score[i]++;
                this.multiSnake[i].grow();
                this.food.createNewFood(this.multiSnake[i]);
                if ((this.multiSnake[i].getSnakeLength() % this.configuration.skillLevel === 0)
                    || this.multiSnake[i].getSnakeLength() === this.configuration.snakeLength + 1) {
                    this.level.addObstacle(this.multiSnake[i], this.food);
                } else {
                    this.level.changeObstaclePosition(this.multiSnake[i], this.food);
                }
            }

            if (this.level.collidesWith(this.multiSnake[i])) {
                alert('Beendet : Mit Hinderniss kollidiert ---> Score : ' + this.score[i]);
                return false;
            }

            if (this.multiSnake[i].collidesWithItself()) {
                alert('Beendet : Mit sich selbst kollidiert ---> Score : ' + this.score[i]);
                return false;
            }

            for (let j = 0; j < this.multiSnake.length; j++) {
                if (this.multiSnake[j] !== this.multiSnake[i] &&
                   this.multiSnake[i].collidesWithOtherSnake(this.multiSnake[j])) {
                        alert('Beendet : Mit anderer Schlange kollidiert --> Score : ' + this.score[i]);
                        return false;
                }
            }
        }
        return true;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);

        if (this.configuration.grid) {
            this.grid.draw(context);
        }

        for (let i = 0; i < this.multiSnake.length; i++) {
            this.multiSnake[i].draw(context, this.cellWidth, this.cellHeight);
        }

        this.food.draw(context);
        this.level.draw(context);
    }

    onKeyUp(key: KeyboardEvent): void {
        for (let i = 0; i < this.multiSnake.length; i++) {
            this.multiSnake[i].onkey(key);
        }
    }
}
