import { Food } from './food';
import { Snake } from './snake';
import { SnakeGrid } from './grid';
import { Level } from './Level';
import { SnakeGameConfiguration } from './snake-game-configuration';

export interface IMessageService {
    alert(text: string, callback: () => void);
}

export class SnakeGame {
    private elapsedTimeSeconds: number;
    private food: Food;
    private cellWidth: number;
    private cellHeight: number;
    private grid: SnakeGrid;
    private level: Level;
    private multiSnake: Snake[] = [];
    score: number[] = [];
    private gridWidth: number;
    private gridHeight: number;
    private widthDifference: number;
    private heightDifference: number;
    private liveCounter: number[] = [];
    private liveCounterState: boolean;
    private pauseUpdate = false;

    constructor(private screenWidth: number,
                private screenHeight: number,
                private configuration: SnakeGameConfiguration,
                private messageService: IMessageService) {
        this.elapsedTimeSeconds = 0;
        this.liveCounter = [0, 0];
        this.liveCounterState = false;
        this.cellWidth = screenWidth / this.configuration.levelWidth;
        this.cellHeight = screenHeight / this.configuration.levelHeight;
        if (this.cellWidth < this.cellHeight) {
            this.cellHeight = this.cellWidth;
        }
        if (this.cellHeight < this.cellWidth) {
            this.cellWidth = this.cellHeight;
        }
        this.gridWidth = this.cellWidth * this.configuration.levelWidth;
        this.gridHeight = this.cellHeight * this.configuration.levelHeight;
        this.widthDifference = screenWidth - this.gridWidth;
        this.heightDifference = screenHeight - this.gridHeight;

        for (let i = 0; i < this.configuration.playerCount; i++) {
            this.multiSnake.push(new Snake(this.configuration.levelWidth,
                                           this.configuration.levelHeight,
                                           this.configuration.snakeLength,
                                           i,
                                           this.configuration.playerInputs[i],
                                           this.widthDifference / 2, this.heightDifference / 2));
            this.score[i] = configuration.snakeLength;
        }

        this.grid = new SnakeGrid(this.cellWidth, this.cellHeight,
                                  this.configuration.levelWidth, this.configuration.levelHeight, this.configuration.grid);
        this.food = new Food(this.cellWidth, this.cellHeight, this.configuration.levelWidth, this.configuration.levelHeight);
        this.level = new Level(this.cellWidth, this.cellHeight, this.configuration.levelWidth, this.configuration.levelHeight);
        this.food.createNewFood(this.multiSnake[0]);
    }

    update(deltaSeconds: number): boolean {
        this.liveCounterState = false;
        if (this.pauseUpdate) {
            return true;
        }
        if (this.updateTime(deltaSeconds, this.configuration.speed, this.liveCounterState)) {
            return true;
        }

        for (let i = 0; i < this.multiSnake.length; i++) {
                if (!this.multiSnake[i].move(this.configuration.wall)) {
                    this.liveCounter[i]++;
                    this.liveCounterState = true;
                    this.pauseUpdate = true;
                    this.messageService.alert('Snake collides with wall \nScore : ' + this.score[i] +
                        ' \nremaining lives : ' + (this.configuration.lives - this.liveCounter[i]), () => this.pauseUpdate = false);
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
                    this.liveCounter[i]++;
                    this.liveCounterState = true;
                    this.pauseUpdate = true;
                    this.messageService.alert('Snake collides with obstacle  \nScore : ' + this.score[i] +
                          ' \nremaining lives : ' + (this.configuration.lives - this.liveCounter[i]), () => this.pauseUpdate = false );
                    this.level.changeObstaclePosition(this.multiSnake[i], this.food);
                }

                if (this.multiSnake[i].collidesWithItself()) {
                    this.liveCounterState = true;
                    this.liveCounter[i]++;
                    this.pauseUpdate = true;
                    this.messageService.alert('Snake collides with itself \nScore : ' + this.score[i] +
                          ' \nremaining lives : ' + (this.configuration.lives - this.liveCounter[i]), () => this.pauseUpdate = false);
                }

                for (let j = 0; j < this.multiSnake.length; j++) {
                    if (this.multiSnake[j] !== this.multiSnake[i] &&
                       this.multiSnake[i].collidesWithOtherSnake(this.multiSnake[j])) {
                            this.liveCounterState = true;
                            this.liveCounter[i]++;
                            this.pauseUpdate = true;
                            this.messageService.alert('Snake collides with other Snake \nScore : ' + this.score[i] +
                                  ' \nremaining lives : ' +
                                  (this.configuration.lives - this.liveCounter[i]), () => this.pauseUpdate = false);
                    }
                }
                if (this.liveCounter[i] >= this.configuration.lives && !this.pauseUpdate) {
                    return false;
                }

        }
        return true;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);
        this.grid.draw(context, this.widthDifference / 2, this.heightDifference / 2 );

        for (let i = 0; i < this.multiSnake.length; i++) {
            this.multiSnake[i].draw(context, this.cellWidth, this.cellHeight,
                                    i, this.configuration.color,
                                    this.widthDifference / 2, this.heightDifference / 2);
        }

        this.food.draw(context, this.widthDifference / 2, this.heightDifference / 2 );
        this.level.draw(context, this.widthDifference / 2, this.heightDifference / 2 );
    }

    onKeyUp(key: KeyboardEvent): void {
        for (let i = 0; i < this.multiSnake.length; i++) {
            this.multiSnake[i].onkey(key);
        }
        if (key.code === 'Space') {
            this.pauseUpdate = true;
            this.messageService.alert('Game paused', () => this.pauseUpdate = false);
            this.liveCounterState = true;
        }
    }
    private updateTime(deltaSeconds: number, updateThresholdSeconds: number, liveCounterState: boolean): boolean {
        if (liveCounterState) {
            deltaSeconds = 0;
        }
        this.elapsedTimeSeconds += deltaSeconds;
        if (this.elapsedTimeSeconds < updateThresholdSeconds) {
            liveCounterState = false;
            return true;
        } else {
            this.elapsedTimeSeconds -= updateThresholdSeconds;
        }
    }
}
