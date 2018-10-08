import { CellObject } from '../../snake-game/game/cell-object';

export class EditorPreview implements CellObject {
    constructor(public x: number, public y: number) {}

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
        context.fillStyle = '#fc6f6f';
        context.fillRect(this.x * cellWidth + widthCorrecture, this.y * cellHeight + heightCorrecture, cellWidth, cellHeight);
        context.fillStyle = 'black';
    }
}
