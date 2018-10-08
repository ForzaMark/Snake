import { CellObject } from '../../snake-game/game/cell-object';

export class Cursor implements CellObject {
    intersects(other: CellObject): boolean {
        return this.x === other.x && this.y === other.y;
    }
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
    move(key: KeyboardEvent, levelWidth: number, levelHeight: number) {
        if (key.code === 'ArrowUp' && this.y !== 0) {
            this.y = this.y - 1;
         }
         if (key.code === 'ArrowDown' && this.y !== levelHeight - 1) {
             this.y = this.y + 1;
         }
         if (key.code === 'ArrowLeft' && this.x !== 0) {
             this.x = this.x - 1;
         }
         if (key.code === 'ArrowRight' && this.x !== levelWidth - 1) {
             this.x = this.x + 1;
         }
    }
}
