import { SnakeGrid } from '../../snake-game/game/grid';
import { Level } from '../../snake-game/game/Level';
import { Snake } from '../../snake-game/game/snake';
import { SnakeInputConfiguration } from '../../snake-game/game/snake-game-configuration';
import { Food } from '../../snake-game/game/food';
import { ConfigDataService } from '../../config-data.service';
import { Cursor } from './cursor';
import { EditorPlayerMarker } from './playerMarker';

export class EditorLevel {
    private cellWidth: number;
    private cellHeight: number;
    private grid: SnakeGrid;
    private level: Level;
    private multiSnake: Snake[] = [];
    private food: Food;
    private cursor: Cursor;
    private playerMarker: EditorPlayerMarker;
    private inputConfig: SnakeInputConfiguration;
    private gridWidth:  number;
    private gridHeight: number;
    private widthDifference: number;
    private heightDifference: number;

    constructor(private screenWidth: number,
                private screenHeight: number,
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
        this.cursor = new Cursor(0, 0);
        this.playerMarker = new EditorPlayerMarker(0, 1);

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
        this.cursor.draw(context, this.widthDifference / 2, this.heightDifference / 2,
                          this.cellWidth, this.cellHeight,
                          levelWidth, levelHeight);
    }

    onKeyUp(key: KeyboardEvent) {
        if (key.code === 'ArrowUp' && this.cursor.y !== 0) {
           this.cursor.y = this.cursor.y - 1;
        }
        if (key.code === 'ArrowDown' && this.cursor.y !== this.configData.data.levelHeight - 1) {
            this.cursor.y = this.cursor.y + 1;
        }
        if (key.code === 'ArrowLeft' && this.cursor.x !== 0) {
            this.cursor.x = this.cursor.x - 1;
        }
        if (key.code === 'ArrowRight' && this.cursor.x !==  this.configData.data.levelWidth - 1) {
            this.cursor.x = this.cursor.x + 1;
        }
        if (key.code === 'Space') {
            if (this.level.isOnObstacle(this.food.x, this.food.y) || this.level.isOnObstacle(this.playerMarker.x, this.playerMarker.y)) {
                        this.level.addObstacle(this.multiSnake[0], this.food, false,
                                               this.cursor.x, this.cursor.y);
            }
        }
        if (key.code === 'Delete') {
            this.level.removeObstacle(this.cursor.x, this.cursor.y);
            this.food.removeFood(this.cursor.x, this.cursor.y);
        }
        if (key.code === 'KeyF') {
            if ((this.food.intersects(this.cursor) || this.food.intersects(this.playerMarker))) {
                this.food.placeNewFood(this.cursor.x, this.cursor.y);
            }
        }
        if (key.code === 'KeyS') {
            if (this.cursor.x !== this.food.x || this.cursor.y !== this.food.y) {
                if (this.level.isOnObstacle(this.cursor.x, this.cursor.y)) {
                    this.multiSnake[0].placeSnake(this.cursor.x, this.cursor.y);
                }
            }
        }
        if (this.configData.data.playerCount === 2 && key.code === 'KeyX') {
            if (this.cursor.x !== this.food.x && this.cursor.y !== this.food.y) {
                if (this.level.isOnObstacle(this.cursor.x, this.cursor.y)) {
                    this.multiSnake[1].placeSnake(this.cursor.x, this.cursor.y);
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
