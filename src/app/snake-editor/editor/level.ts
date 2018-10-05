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
    private snake: Snake;
    private food: Food;
    private inputConfig: SnakeInputConfiguration;
    private posX: number;
    private posY: number;
    private gridWidth:  number;
    private gridHeight: number;
    private widthDifference: number;
    private heightDifference: number;

    constructor(private screenWidth: number, private screenHeight: number, private levelWidth: number, private levelHeight: number) {
        this.cellWidth = screenWidth / levelWidth;
        this.cellHeight = screenHeight / levelHeight;
        this.grid = new SnakeGrid(this.cellWidth, this.cellHeight, levelWidth, levelHeight, true);
        this.level = new Level(this.cellWidth, this.cellHeight, levelWidth, levelHeight);
        this.inputConfig = new SnakeInputConfiguration();
        this.inputConfig.down = 'ArrowDown';
        this.inputConfig.up = 'ArrowUp';
        this.inputConfig.left = 'ArrowLeft';
        this.inputConfig.right = 'ArrowRight';
        this.posX = 10;
        this.posY = 10;

        this.snake = new Snake(levelWidth, levelHeight, 1, 2, this.inputConfig, 0, 0);
        this.food = new Food(this.cellWidth, this.cellHeight, levelWidth, levelHeight);

    }
    update(): void {
    }

    draw(context: CanvasRenderingContext2D , levelWidth: number, levelHeight: number) {
        const cellSize = Math.min(this.screenWidth / levelWidth, this.screenHeight / levelHeight);
        this.cellWidth = cellSize;
        this.cellHeight = cellSize;
        this.gridWidth = this.cellWidth * levelWidth;
        this.gridHeight = this.cellHeight * levelHeight;
        this.widthDifference = this.screenWidth - this.gridWidth;
        this.heightDifference = this.screenHeight - this.gridHeight;

        this.grid.changeGridProperties(this.cellWidth, this.cellHeight, levelWidth, levelHeight);
        this.grid.draw(context, this.widthDifference / 2, this.heightDifference / 2);
        this.level.draw(context, this.widthDifference / 2, this.heightDifference / 2);
        this.level.drawPreview(context, this.widthDifference / 2, this.heightDifference / 2, this.posX, this.posY);
    }

    onKeyUp(key: KeyboardEvent) {
        if (key.code === 'ArrowUp') {
           this.posY = this.posY - 1;
        }
        if (key.code === 'ArrowDown') {
            this.posY = this.posY + 1;
        }
        if (key.code === 'ArrowLeft') {
            this.posX = this.posX - 1;
        }
        if (key.code === 'ArrowRight') {
            this.posX = this.posX + 1;
        }
        if (key.code === 'Space') {
            this.level.placeNewObstacle(this.posX, this.posY);
        }
        if (key.code === 'Delete') {
            this.level.removeObstacle(this.posX, this.posY);
        }
    }
}
