export class SnakeGrid {
    constructor(private cellWidth: number, private cellHeight: number,
                private fieldWidth: number, private fieldHeight: number,
                private gridenabled: boolean) {}

    draw(context: CanvasRenderingContext2D, widthCorrecture: number, heightCorrecture: number): void {
        if (this.gridenabled) {
            for (let x = 0; x <= this.fieldWidth; x++) {
                context.beginPath();
                context.moveTo(x * this.cellWidth + widthCorrecture, heightCorrecture);
                context.lineTo(x * this.cellWidth + widthCorrecture, this.fieldHeight * this.cellHeight + heightCorrecture);
                context.stroke();
            }
            for (let y = 0; y <= this.fieldHeight ; y++) {
               context.beginPath();
               context.moveTo(widthCorrecture, y * this.cellHeight + heightCorrecture);
               context.lineTo(this.cellWidth * this.fieldWidth + widthCorrecture, y * this.cellHeight + heightCorrecture);
               context.stroke();
             }
        }
        if (!this.gridenabled) {
            // if (widthCorrecture === 0) {
            //     context.beginPath();
            //     context.moveTo(0, heightCorrecture);
            //     context.lineTo(this.cellWidth * this.fieldWidth, heightCorrecture);
            //     context.stroke();
            //     context.moveTo(0, this.cellHeight * this.fieldHeight + heightCorrecture);
            //     context.lineTo(this.cellWidth * this.fieldWidth, this.cellHeight * this.fieldHeight + heightCorrecture );
            //     context.stroke();
            // }
            // if (heightCorrecture === 0) {
                context.beginPath();
                context.moveTo(widthCorrecture, heightCorrecture);
                context.lineTo(widthCorrecture, this.cellHeight * this.fieldHeight + heightCorrecture);
                context.stroke();
                context.moveTo(this.cellWidth * this.fieldWidth + widthCorrecture, heightCorrecture);
                context.lineTo(this.cellWidth * this.fieldWidth + widthCorrecture, this.fieldHeight * this.cellHeight + heightCorrecture);
                context.stroke();
        }
    }
}
