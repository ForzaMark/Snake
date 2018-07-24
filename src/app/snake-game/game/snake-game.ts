import { Food } from './food';
import { Snake } from './snake';
import { SnakeGrid } from './grid';
import { Level } from './Level';
import { SnakeGameConfiguration } from './snake-game-configuration';

export class SnakeGame {
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
    private multiplayer: boolean;
    score: number;
    private multiSnake: Snake[] = [];

    constructor(private screenWidth: number, private screenHeight: number, private configuration: SnakeGameConfiguration) {
        
        this.fieldWidth = configuration.levelWidth;
        this.fieldHeight = configuration.levelHeight;
        this.snakeSize = configuration.snakeLength;
        this.wallenabled = configuration.wall;
        this.SkillLevel = configuration.skillLevel;
        this.multiplayer = configuration.multiplayer;

        this.cellWidth = screenWidth / this.fieldWidth;
        this.cellHeight = screenHeight / this.fieldHeight;

        this.firstSnake = new Snake(this.fieldWidth, this.fieldHeight, this.snakeSize,4);
        this.secondSnake = new Snake(this.fieldWidth, this.fieldHeight, this.snakeSize,2);
        this.multiSnake.push(this.firstSnake,this.secondSnake);

        this.grid = new SnakeGrid(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);

        this.food = new Food(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);
        this.level = new Level(this.cellWidth, this.cellHeight, this.fieldWidth, this.fieldHeight);
        this.food.createNewFood(this.firstSnake);
    }

    update(): boolean {

        for(let i = 0; i < 2; i++) {
            
            
            if (!this.multiSnake[i].move(this.wallenabled)) {
                console.log('1false');
                
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
                console.log('2false');
                
                return false;
            }

            if (this.multiSnake[i].collidesWithItself()) {
                console.log('3false');
                
                return false;
            }
            console.log(i);
        }
        console.log('truen');
        
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
        this.firstSnake.onkey(key);
    }
}
