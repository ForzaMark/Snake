import { SnakeGrid } from '../../snake-game/game/grid';

export class EditorLevel {
    private cellWidth: number;
    private cellHeight: number;
    private grid: SnakeGrid;
    constructor(private screenwidth: number, private screenHeight: number, private levelWidth: number, private levelHeight: number) {
        this.cellWidth = screenwidth / levelWidth;
        this.cellHeight = screenHeight / levelHeight;
        this.grid = new SnakeGrid(this.cellWidth, this.cellHeight, levelWidth, levelHeight, true);
    }
    update(): void {

    }
    draw(context: CanvasRenderingContext2D) {
        this.grid.draw(context, 0, 0);
    }
}
