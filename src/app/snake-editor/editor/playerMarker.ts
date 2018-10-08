import { CellObject } from '../../snake-game/game/cell-object';

export class EditorPlayerMarker implements CellObject {
    constructor(public x: number, public y: number) { }
    intersects(other: CellObject) {
        return this.x === other.x && this.y === other.y;
    }
    placeNewMarker(cursorPosition: CellObject): void {
        this.x = cursorPosition.x;
        this.y = cursorPosition.y;
    }
    draw(context: CanvasRenderingContext2D, widthCorrecture: number, heightCorrecture: number,
        cellWidth: number, cellHeight: number,
        fieldWidth: number, fieldHeight: number): void {
        if (this.x > fieldWidth - 1) {
            this.x = fieldWidth - 1;
        }
        if (this.x < 0 ) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > fieldHeight - 1 ) {
            this.y = fieldHeight - 1;
        }
        context.fillStyle = '#33beff';
        context.fillRect(this.x * cellWidth + widthCorrecture, this.y * cellHeight + heightCorrecture, cellWidth, cellHeight);
        context.fillStyle = 'black';
    }
}


