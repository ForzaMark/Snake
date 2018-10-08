import { SnakeGrid } from '../../snake-game/game/grid';
import { Level } from '../../snake-game/game/Level';
import { Snake } from '../../snake-game/game/snake';
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
    private playerMarker: EditorPlayerMarker[] = [];
    private gridWidth:  number;
    private gridHeight: number;
    private widthDifference: number;
    private heightDifference: number;
    private levelWidth: number;
    private levelHeight: number;

    constructor(private screenWidth: number,
                private screenHeight: number,
                private configData: ConfigDataService) {
        this.levelWidth = configData.data.levelWidth;
        this.levelHeight = configData.data.levelHeight;

        this.food = new Food(configData.data.levelWidth, configData.data.levelHeight);
        this.grid = new SnakeGrid(true);
        this.level = new Level(configData.data.levelWidth, configData.data.levelHeight);
        this.cursor = new Cursor(0, 0);
        this.playerMarker[0] = new EditorPlayerMarker();
        this.playerMarker[1] = new EditorPlayerMarker();
    }

    draw(context: CanvasRenderingContext2D , levelWidth: number, levelHeight: number) {
        this.levelWidth = levelWidth;
        this.levelHeight = levelHeight;
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
        this.playerMarker[0].draw(context, this.widthDifference / 2, this.heightDifference / 2,
                                  this.cellWidth, this.cellHeight,
                                  levelWidth, levelHeight, 0);
        this.playerMarker[1].draw(context, this.widthDifference / 2, this.heightDifference / 2,
                                  this.cellWidth, this.cellHeight,
                                  levelWidth, levelHeight, 1);
        this.cursor.draw(context, this.widthDifference / 2, this.heightDifference / 2,
                          this.cellWidth, this.cellHeight,
                          levelWidth, levelHeight);
    }

    onKeyUp(key: KeyboardEvent) {
        this.cursor.move(key, this.levelWidth, this.levelHeight);
        if (key.code === 'Space') {
            if (!(this.cursor.intersects(this.food) ||
                  this.cursor.intersects(this.playerMarker[0]) || this.cursor.intersects(this.playerMarker[1]))) {
                        this.level.addObstacle(this.multiSnake[0], this.food, false,
                                               this.cursor.x, this.cursor.y);
            }
        }
        if (key.code === 'Delete') {
            this.level.removeObstacle(this.cursor.x, this.cursor.y);
            this.food.removeFood(this.cursor.x, this.cursor.y);
        }
        if (key.code === 'KeyF') {
            if (!(this.level.intersects(this.cursor) ||
                  this.cursor.intersects(this.playerMarker[0]) || this.cursor.intersects(this.playerMarker[1]))) {
                this.food.placeNewFood(this.cursor.x, this.cursor.y);
            }
        }
        if (key.code === 'KeyS') {
            if (!(this.cursor.intersects(this.food) || this.level.intersects(this.cursor))) {
                this.playerMarker[0].placeNewMarker(this.cursor);
            }
        }
        if (key.code === 'KeyX') {
            if ( !(this.cursor.intersects(this.food) || this.level.intersects(this.cursor))) {
                this.playerMarker[1].placeNewMarker(this.cursor);
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
