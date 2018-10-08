import { CellObject } from '../../snake-game/game/cell-object';

export class EditorPlayerMarker implements CellObject {
    x: number;
    y: number;

    constructor() { }
    intersects(other: CellObject) {
        return this.x === other.x && this.y === other.y;
    }
    placeNewMarker(cursorPosition: CellObject): void {
        this.x = cursorPosition.x;
        this.y = cursorPosition.y;
    }
    draw(context: CanvasRenderingContext2D, widthCorrecture: number, heightCorrecture: number,
        cellWidth: number, cellHeight: number,
        fieldWidth: number, fieldHeight: number, player: number): void {
        if (this.x > fieldWidth - 1 || this.x < 0
            || this.y < 0 ||  this.y > fieldHeight - 1 ) {
            this.removeMarker();
        }
        if (player === 0) {
            context.fillStyle = '#33beff';
        } else {
            context.fillStyle = '#eabb6d';
        }
        context.fillRect(this.x * cellWidth + widthCorrecture, this.y * cellHeight + heightCorrecture, cellWidth, cellHeight);
        context.fillStyle = 'black';
    }
    removeMarker() {
        this.x = undefined;
        this.y = undefined;
    }
}


