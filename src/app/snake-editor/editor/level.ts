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
        this.preview = new EditorPreview(0, 0);

    }

    draw(context: CanvasRenderingContext2D , levelWidth: number, levelHeight: number) {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);
        this.setDrawVariables(levelWidth, levelHeight);
        this.grid.draw(context, this.widthDifference / 2, this.heightDifference / 2,
                        this.cellWidth, this.cellHeight,
                        levelWidth, levelHeight);
        this.level.draw(context, this.widthDifference / 2, this.heightDifference / 2,
                        this.cellWidth, this.cellHeight,
                        levelWidth, levelHeight);
        this.food.draw(context, this.widthDifference / 2, this.heightDifference / 2,
                        this.cellWidth, this.cellHeight,
                        levelWidth, levelHeight);
        for (let i = 0; i < this.multiSnake.length; i++) {
            this.multiSnake[i].draw(context, this.cellWidth, this.cellHeight,
                                    1, this.configData.data.color,
                                    this.widthDifference / 2, this.heightDifference / 2,
                                    levelWidth, levelHeight);
        }
        this.preview.draw(context, this.widthDifference / 2, this.heightDifference / 2,
                          this.cellWidth, this.cellHeight,
                          levelWidth, levelHeight);
    }

    onKeyUp(key: KeyboardEvent) {
        if (key.code === 'ArrowUp' && this.preview.y !== 0) {
           this.preview.y = this.preview.y - 1;
        }
        if (key.code === 'ArrowDown' && this.preview.y !== this.configData.data.levelHeight - 1) {
            this.preview.y = this.preview.y + 1;
        }
        if (key.code === 'ArrowLeft' && this.preview.x !== 0) {
            this.preview.x = this.preview.x - 1;
        }
        if (key.code === 'ArrowRight' && this.preview.x !==  this.configData.data.levelWidth - 1) {
            this.preview.x = this.preview.x + 1;
        }
        if (key.code === 'Space') {
            if (this.preview.x !== this.food.x || this.preview.y !== this.food.y) {
                for (let i = 0; i < this.multiSnake.length; i++) {
                    if (this.preview.x !== this.multiSnake[i].snakeHead.x ||
                        this.preview.y !== this.multiSnake[i].snakeHead.y) {
                        this.level.addObstacle(this.multiSnake[i], this.food, false,
                                               this.preview.x, this.preview.y);
                    }
                }
            }
        }
        if (key.code === 'Delete') {
            this.level.removeObstacle(this.preview.x, this.preview.y);
            this.food.removeFood(this.preview.x, this.preview.y);
        }
        if (key.code === 'KeyF') {
            for (let i = 0; i < this.multiSnake.length; i++) {
                if (this.preview.x !== this.multiSnake[i].snakeHead.x || this.preview.y !== this.multiSnake[i].snakeHead.y) {
                    if (this.level.isOnObstacle(this.preview.x, this.preview.y)) {
                        this.food.placeNewFood(this.preview.x, this.preview.y);
                    }
                }
            }
        }
        if (key.code === 'KeyS') {
            if (this.preview.x !== this.food.x || this.preview.y !== this.food.y) {
                if (this.level.isOnObstacle(this.preview.x, this.preview.y)) {
                    this.multiSnake[0].placeSnake(this.preview.x, this.preview.y);
                }
            }
        }
        if (this.configData.data.playerCount === 2 && key.code === 'KeyX') {
            if (this.preview.x !== this.food.x && this.preview.y !== this.food.y) {
                if (this.level.isOnObstacle(this.preview.x, this.preview.y)) {
                    this.multiSnake[1].placeSnake(this.preview.x, this.preview.y);
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
