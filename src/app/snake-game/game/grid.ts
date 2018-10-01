export class SnakeGrid {
    constructor(private cellWidth: number, private cellHeight: number,
                private fieldWidth: number, private fieldHeight: number,
                private widthCorrecture: number, private heightCorrecture: number) {}

    draw(context: CanvasRenderingContext2D): void {
        if (this.heightCorrecture === 0 ) {
            for (let x = 0; x <= this.fieldWidth; x++) {
                context.beginPath();
                context.moveTo(x * this.cellWidth + this.widthCorrecture, this.heightCorrecture);
                context.lineTo(x * this.cellWidth + this.widthCorrecture, this.fieldHeight * this.cellHeight);
                context.stroke();
            }
            for (let y = 0; y <= this.fieldHeight ; y++) {
               context.beginPath();
               context.moveTo(this.widthCorrecture, y * this.cellHeight);
               context.lineTo(this.cellWidth * this.fieldWidth + this.widthCorrecture, y * this.cellHeight);
               context.stroke();
             }
        }
        if (this.widthCorrecture === 0) {
            for (let x = 0; x <= this.fieldWidth; x++) {
                context.beginPath();
                context.moveTo(x * this.cellWidth, this.heightCorrecture);
                context.lineTo(x * this.cellWidth, this.fieldHeight * this.cellHeight + this.heightCorrecture);
                context.stroke();
            }
            for (let y = 0; y <= this.fieldHeight ; y++) {
               context.beginPath();
               context.moveTo(0, y * this.cellHeight + this.heightCorrecture );
               context.lineTo(this.cellWidth * this.fieldWidth, y * this.cellHeight + this.heightCorrecture);
               context.stroke();
             }
        }
    }
}
