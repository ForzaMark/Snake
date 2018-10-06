export class SnakeGrid {
    constructor(private gridenabled: boolean) {}

    draw(context: CanvasRenderingContext2D, widthCorrecture: number, heightCorrecture: number,
         cellWidth: number , cellHeight: number,
         fieldWidth: number, fieldHeight: number ): void {
        if (this.gridenabled) {
            for (let x = 0; x <= fieldWidth; x++) {
                context.beginPath();
                context.moveTo(x * cellWidth + widthCorrecture, heightCorrecture);
                context.lineTo(x * cellWidth + widthCorrecture, fieldHeight * cellHeight + heightCorrecture);
                context.stroke();
            }
            for (let y = 0; y <= fieldHeight ; y++) {
               context.beginPath();
               context.moveTo(widthCorrecture, y * cellHeight + heightCorrecture);
               context.lineTo(cellWidth * fieldWidth + widthCorrecture, y * cellHeight + heightCorrecture);
               context.stroke();
             }
        }
        if (!this.gridenabled) {
                context.beginPath();
                context.moveTo(widthCorrecture, heightCorrecture);
                context.lineTo(widthCorrecture, cellHeight * fieldHeight + heightCorrecture);
                context.stroke();
                context.moveTo(cellWidth * fieldWidth + widthCorrecture, heightCorrecture);
                context.lineTo(cellWidth * fieldWidth + widthCorrecture, fieldHeight * cellHeight + heightCorrecture);
                context.stroke();
        }
    }
}
