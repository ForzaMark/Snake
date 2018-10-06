import { SnakeGrid } from '../../snake-game/game/grid';
import { Level } from '../../snake-game/game/Level';
import { Snake } from '../../snake-game/game/snake';
import { SnakeInputConfiguration } from '../../snake-game/game/snake-game-configuration';
import { Food } from '../../snake-game/game/food';
import { ConfigDataService } from '../../config-data.service';
import { EditorPreview } from './preview';

export class EditorLevel {
    private cellWidth: number;
    private cellHeight: number;
    private grid: SnakeGrid;
    private level: Level;
    private multiSnake: Snake[] = [];
    private food: Food;
    private preview: EditorPreview;
    private inputConfig: SnakeInputConfiguration;
    private posX: number;
    private posY: number;
    private gridWidth:  number;
    private gridHeight: number;
    private widthDifference: number;
    private heightDifference: number;

    constructor(private screenWidth: number, private screenHeight: number,
                private configData: ConfigDataService) {
        const cellSize = Math.min(screenWidth / configData.data.levelWidth,
                                  screenHeight / this.configData.data.levelHeight);
        this.cellWidth = cellSize;
        this.cellHeight = cellSize;
        this.inputConfig = new SnakeInputConfiguration();
        this.posX = 0;
        this.posY = 0;


        for (let i = 0; i < configData.data.playerCount; i++) {
            this.multiSnake.push(new Snake(configData.data.levelWidth,
                                           configData.data.levelHeight,
                                           configData.data.snakeLength,
                                           i,
                                           this.inputConfig,
                                           this.widthDifference / 2, this.heightDifference / 2));
        }
        this.food = new Food(configData.data.levelWidth, configData.data.levelHeight);
        this.grid = new SnakeGrid(true);
        this.level = new Level(configData.data.levelWidth, configData.data.levelHeight);
        this.preview = new EditorPreview();

    }

    draw(context: CanvasRenderingContext2D , levelWidth: number, levelHeight: number) {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);
        this.setDrawVariables(levelWidth, levelHeight);
        this.grid.draw(context, this.widthDifference / 2, this.heightDifference / 2,
                        this.cellWidth, this.cellHeight,
                        levelWidth, levelHeight);
        this.level.draw(context, this.widthDifference / 2, this.heightDifference / 2,
                        this.cellWidth, this.cellHeight);
        this.food.draw(context, this.widthDifference / 2, this.heightDifference / 2,
                        this.cellWidth, this.cellHeight);
        for (let i = 0; i < this.multiSnake.length; i++) {
            this.multiSnake[i].draw(context, this.cellWidth, this.cellHeight,
                                    1, this.configData.data.color,
                                    this.widthDifference / 2, this.heightDifference / 2);
        }
        this.preview.draw(context, this.widthDifference, this.heightDifference,
                          this.posX, this.posY,
                          this.cellWidth, this.cellHeight);
    }

    onKeyUp(key: KeyboardEvent) {
        if (key.code === 'ArrowUp' && this.posY !== 0) {
           this.posY = this.posY - 1;
        }
        if (key.code === 'ArrowDown' && this.posY !== this.configData.data.levelHeight - 1) {
            this.posY = this.posY + 1;
        }
        if (key.code === 'ArrowLeft' && this.posX !== 0) {
            this.posX = this.posX - 1;
        }
        if (key.code === 'ArrowRight' && this.posX !==  this.configData.data.levelWidth - 1) {
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
        if (this.configData.data.playerCount === 2 && key.code === 'KeyX') {
            if (this.posX !== this.food.x && this.posY !== this.food.y) {
                if (this.level.isOnObstacle(this.posX, this.posY)) {
                    this.multiSnake[1].placeSnake(this.posX, this.posY);
                }
            }
        }
    }
    private setDrawVariables(levelWidth: number, levelHeight: number): void {
        const cellSize = Math.min(this.screenWidth / levelWidth, this.screenHeight / levelHeight);
        this.cellWidth = cellSize;
        this.cellHeight = cellSize;
        this.gridWidth = this.cellWidth * levelWidth;
        this.gridHeight = this.cellHeight * levelHeight;
        this.widthDifference = this.screenWidth - this.gridWidth;
        this.heightDifference = this.screenHeight - this.gridHeight;
    }
}
