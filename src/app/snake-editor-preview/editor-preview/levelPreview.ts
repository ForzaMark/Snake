import { SnakeGrid } from '../../snake-game/game/grid';
import { LevelConfiguration } from '../../services/level-configuration';
import { Level } from '../../snake-game/game/Level';
import { Food } from '../../snake-game/game/food';
import { EditorPlayerMarker } from '../../snake-editor/editor/playerMarker';

export class LevelPreview {
    private grid: SnakeGrid;
    private level: Level;
    private food: Food;
    private playerMarker: EditorPlayerMarker[] = [];
    private levelWidth: number;
    private levelHeight: number;
    private cellWidth: number;
    private cellHeight: number;
    private widthDifference: number;
    private heightDifference: number;

    constructor(private screenWidth: number, private screenHeight: number,
               ) {
        this.grid = new SnakeGrid(true);
        this.food = new Food(this.levelWidth, this.levelHeight);
        this.level = new Level(this.levelWidth, this.levelHeight);
        this.playerMarker[0] = new EditorPlayerMarker();
        this.playerMarker[1] = new EditorPlayerMarker();
    }
    setObjects(configuration: LevelConfiguration) {
        this.level.clear();
        this.food.placeNewFood(configuration.foodPosition[0], configuration.foodPosition[1]);
        this.playerMarker[0].placeNewMarker(configuration.playerStartPosition[0]);
        this.playerMarker[1].placeNewMarker(configuration.playerStartPosition[1]);
        for (let i = 0; i < configuration.obstaclePosition.length; i++) {
            this.level.addObstacle(this.food, false, configuration.obstaclePosition[i].x, configuration.obstaclePosition[i].y);
        }
    }
    draw(context: CanvasRenderingContext2D, levelWidth: number, levelHeight: number): void {
        this.levelWidth = levelWidth;
        this.levelHeight = levelHeight;
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);

        this.setDrawVariables(this.levelWidth, this.levelHeight);
        this.grid.draw(context, this.widthDifference / 2, this.heightDifference / 2,
                       this.cellWidth, this.cellHeight,
                       this.levelWidth, this.levelHeight);
        this.food.draw(context, this.widthDifference / 2, this.heightDifference / 2,
                        this.cellWidth, this.cellHeight,
                        this.levelWidth, this.levelHeight);
        this.playerMarker[0].draw(context, this.widthDifference / 2, this.heightDifference / 2,
                                this.cellWidth, this.cellHeight,
                                levelWidth, levelHeight, 0 );
        this.playerMarker[1].draw(context, this.widthDifference / 2, this.heightDifference / 2,
                                    this.cellWidth, this.cellHeight,
                                    levelWidth, levelHeight, 1 );
        this.level.draw(context, this.widthDifference / 2, this.heightDifference / 2,
                        this.cellWidth, this.cellHeight,
                        this.levelWidth, this.levelHeight);
    }
    private setDrawVariables(levelWidth: number, levelHeight: number): void {
        const cellSize = Math.min(this.screenWidth / levelWidth, this.screenHeight / levelHeight);
        this.cellWidth = cellSize;
        this.cellHeight = cellSize;
        const gridWidth = this.cellWidth * levelWidth;
        const gridHeight = this.cellHeight * levelHeight;
        this.widthDifference = this.screenWidth - gridWidth;
        this.heightDifference = this.screenHeight - gridHeight;
    }
}
