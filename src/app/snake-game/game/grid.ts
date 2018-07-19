export class SnakeGrid {
    
    constructor(private cellWidth: number, private cellHeight: number,
                private fieldWidth: number, private fieldHeight: number) {}

    drawGrid(context: CanvasRenderingContext2D) {
        for (let x = 0; x !== this.fieldWidth; x++) {
            context.beginPath();
            context.moveTo(x * this.cellWidth, 0);
            context.lineTo(x * this.cellWidth, this.fieldHeight * this.cellHeight);
            context.stroke();
        }
        for (let y = 0; y !== this.fieldHeight ; y++) {
           context.beginPath();
           context.moveTo(0, y * this.cellHeight);
           context.lineTo(this.cellWidth * this.fieldWidth, y * this.cellHeight);
           context.stroke();
         }
    }
}
