import { Food } from './food';
import { Snake } from './snake';
import { SnakeGrid } from './grid';
import { Level } from './Level';
import { SnakeGameConfiguration } from './snake-game-configuration';

export class SnakeGame {
    private elapsedTimeSeconds: number;

    private firstSnake: Snake;
    private secondSnake: Snake;
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
    private multiplayer: number;
    private speed: number;
    score: number;
    private multiSnake: Snake[] = [];

    constructor(private screenWidth: number, private screenHeight: number, private configuration: SnakeGameConfiguration) {
        
        this.fieldWidth = configuration.levelWidth;
        this.fieldHeight = configuration.levelHeight;
        this.snakeSize = configuration.snakeLength;
        this.wallenabled = configuration.wall;
        this.SkillLevel = configuration.skillLevel;
        this.multiplayer = configuration.playerCount;
        this.speed = configuration.speed;

        this.cellWidth = screenWidth / this.fieldWidth;
        this.cellHeight = screenHeight / this.fieldHeight;

        this.firstSnake = new Snake(this.fieldWidth, this.fieldHeight, this.snakeSize,4);
        this.secondSnake = new Snake(this.fieldWidth, this.fieldHeight, this.snakeSize,2);
        this.multiSnake.push(this.firstSnake,this.secondSnake);

        this.grid = new SnakeGrid(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);

        this.food = new Food(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);
        this.level = new Level(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);
        this.food.createNewFood(this.firstSnake);

        this.elapsedTimeSeconds = 0;
    }

    update(deltaSeconds: number): boolean {
        const updateThresholdSeconds = this.speed;

        this.elapsedTimeSeconds += deltaSeconds;
        if (this.elapsedTimeSeconds < updateThresholdSeconds) {
            return true;
        }
        else {
            this.elapsedTimeSeconds -= updateThresholdSeconds;
        }

        for(let i = 0; i < 2; i++) {
            
            
            if (!this.multiSnake[i].move(this.wallenabled)) {
               
                
                return false;
            }
            if (this.multiSnake[i].isOnSnake(this.food)) {
                this.score++;
                this.multiSnake[i].grow();
                this.food.createNewFood(this.multiSnake[i]);
                if ((this.multiSnake[i].getSnakeLength() % this.SkillLevel === 0)
                    || this.multiSnake[i].getSnakeLength() === this.snakeSize + 1) {
                    this.level.addObstacle(this.multiSnake[i], this.food);
                } else {
                    this.level.changeObstaclePosition(this.multiSnake[i], this.food);
                }
            }

            if (this.level.collidesWith(this.multiSnake[i])) {
                         
                return false;
            }

            if (this.multiSnake[i].collidesWithItself()) {
                return false;
            }
            //refactoring
            for (let j = 0; j < this.multiSnake.length; j++) {
                if(this.multiSnake[j] !== this.multiSnake[i]){
                    if (this.multiSnake[i].collidesWithOtherSnake(this.multiSnake[j])) {
                        return false;
                    }
                }
                
            }
            
        }
        
        return true;
    }   

    draw(context: CanvasRenderingContext2D): void {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);
        this.grid.draw(context);
        this.firstSnake.draw(context, this.cellWidth, this.cellHeight);
        this.secondSnake.draw(context, this.cellWidth, this.cellHeight)
        this.food.draw(context);
        this.level.draw(context);
    }

    onKeyUp(key: KeyboardEvent): void {
        this.firstSnake.onkey(key,0);
        this.secondSnake.onkey(key,1)
    }
}
