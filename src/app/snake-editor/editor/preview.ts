export class EditorPreview {
    constructor() {}
    draw(context: CanvasRenderingContext2D, widthCorrecture: number, heightCorrecture: number,
        x: number, y: number,
        cellWidth: number, cellHeight: number): void {
        context.fillStyle = '#fc6f6f';
        context.fillRect(x * cellWidth + widthCorrecture, y * cellHeight + heightCorrecture, cellWidth, cellHeight);
        context.fillStyle = 'black';
    }
}
