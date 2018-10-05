import { SnakeGrid } from '../../snake-game/game/grid';
import { Level } from '../../snake-game/game/Level';
import { Snake } from '../../snake-game/game/snake';
import { SnakeInputConfiguration } from '../../snake-game/game/snake-game-configuration';
import { Food } from '../../snake-game/game/food';

export class EditorLevel {
    private cellWidth: number;
    private cellHeight: number;
    private grid: SnakeGrid;
    private level: Level;
    private multiSnake: Snake[] = [];
    private food: Food;
    private inputConfig: SnakeInputConfiguration;
    private posX: number;
    private posY: number;
    private gridWidth:  number;
    private gridHeight: number;
    private widthDifference: number;
    private heightDifference: number;

    constructor(private screenWidth: number, private screenHeight: number,
                private levelWidth: number, private levelHeight: number,
                private gameMode: number, private snakeLength: number,
                private color: string) {
        this.cellWidth = screenWidth / this.levelWidth;
        this.cellHeight = screenHeight / this.levelHeight;
        this.grid = new SnakeGrid(this.cellWidth, this.cellHeight, this.levelWidth, this.levelHeight, true);
        this.level = new Level(this.cellWidth, this.cellHeight, this.levelWidth, this.levelHeight);
        this.inputConfig = new SnakeInputConfiguration();
        this.inputConfig.down = 'ArrowDown';
        this.inputConfig.up = 'ArrowUp';
        this.inputConfig.left = 'ArrowLeft';
        this.inputConfig.right = 'ArrowRight';
        this.posX = 0;
        this.posY = 0;


        for (let i = 0; i < this.gameMode; i++) {
            this.multiSnake.push(new Snake(levelWidth,
                                           levelHeight,
                                           this.snakeLength,
                                           i,
                                           this.inputConfig,
                                           this.widthDifference / 2, this.heightDifference / 2));
        }
        this.food = new Food(this.cellWidth, this.cellHeight, levelWidth, levelHeight);

    }
    update(): void {
    }

    draw(context: CanvasRenderingContext2D , levelWidth: number, levelHeight: number) {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);
        const cellSize = Math.min(this.screenWidth / levelWidth, this.screenHeight / levelHeight);
        this.cellWidth = cellSize;
        this.cellHeight = cellSize;
        this.gridWidth = this.cellWidth * levelWidth;
        this.gridHeight = this.cellHeight * levelHeight;
        this.widthDifference = this.screenWidth - this.gridWidth;
        this.heightDifference = this.screenHeight - this.gridHeight;

        this.grid.changeGridProperties(this.cellWidth, this.cellHeight, levelWidth, levelHeight);
        this.level.changeObstacleProperties(this.cellWidth, this.cellHeight);
        this.food.changeFoodProperties(this.cellWidth, this.cellHeight);

        this.grid.draw(context, this.widthDifference / 2, this.heightDifference / 2);
        this.level.draw(context, this.widthDifference / 2, this.heightDifference / 2);
        this.food.draw(context, this.widthDifference / 2, this.heightDifference / 2);
        for (let i = 0; i < this.multiSnake.length; i++) {
            this.multiSnake[i].draw(context, this.cellWidth, this.cellHeight,
                                    1, this.color,
                                    this.widthDifference / 2, this.heightDifference / 2);
        }
        this.level.drawPreview(context, this.widthDifference / 2, this.heightDifference / 2, this.posX, this.posY);
    }

    onKeyUp(key: KeyboardEvent) {
        if (key.code === 'ArrowUp' && this.posY !== 0) {
           this.posY = this.posY - 1;
        }
        if (key.code === 'ArrowDown' && this.posY !== this.levelHeight - 1) {
            this.posY = this.posY + 1;
        }
        if (key.code === 'ArrowLeft' && this.posX !== 0) {
            this.posX = this.posX - 1;
        }
        if (key.code === 'ArrowRight' && this.posX !==  this.levelWidth - 1) {
            this.posX = this.posX + 1;
        }
        if (key.code === 'Space') {
            if (this.posX !== this.food.x || this.posY !== this.food.y) {
                for (let i = 0; i < this.multiSnake.length; i++) {
                    if (this.posX !== this.multiSnake[i].snakeHead.x || this.posY !== this.multiSnake[i].snakeHead.y) {
                        this.level.placeNewObstacle(this.posX, this.posY);
                    }
                }
            }
        }
        if (key.code === 'Delete') {
            this.level.removeObstacle(this.posX, this.posY);
            this.food.removeFood(this.posX, this.posY);
        }
        if (key.code === 'KeyF') {
            for (let i = 0; i < this.multiSnake.length; i++) {
                if (this.posX !== this.multiSnake[i].snakeHead.x || this.posY !== this.multiSnake[i].snakeHead.y) {
                    if (this.level.isOnObstacle(this.posX, this.posY)) {
                        this.food.placeNewFood(this.posX, this.posY);
                    }
                }
            }
        }
        if (key.code === 'KeyS') {
            if (this.posX !== this.food.x && this.posY !== this.food.y) {
                if (this.level.isOnObstacle(this.posX, this.posY)) {
                    this.multiSnake[0].placeSnake(this.posX, this.posY);
                }
            }
        }
        if (this.gameMode === 2 && key.code === 'KeyX') {
            if (this.posX !== this.food.x && this.posY !== this.food.y) {
                if (this.level.isOnObstacle(this.posX, this.posY)) {
                    this.multiSnake[1].placeSnake(this.posX, this.posY);
                }
            }
        }
    }
}
