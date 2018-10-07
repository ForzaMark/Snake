import { CellObject } from '../../snake-game/game/cell-object';

export class EditorPreview implements CellObject {
    constructor(public x: number, public y: number) {}

    draw(context: CanvasRenderingContext2D, widthCorrecture: number, heightCorrecture: number,
        cellWidth: number, cellHeight: number,
        fieldWidth: number, fieldHeight: number): void {
        context.fillStyle = '#fc6f6f';
        context.fillRect(this.x * cellWidth + widthCorrecture, this.y * cellHeight + heightCorrecture, cellWidth, cellHeight);
        context.fillStyle = 'black';
    }
}
