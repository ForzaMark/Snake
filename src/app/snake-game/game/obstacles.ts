export class Obstacles {
    private PosX: number;
    private PosY: number;

    constructor(private cellWidth: number,
        private cellHeight: number,
        private fieldWidth: number,
        private fieldHeight: number) {}

    createNewObstacles(): void {
        this.PosX =  Math.floor(Math.random() * this.fieldWidth);
        this.PosY =  Math.floor(Math.random() * this.fieldHeight);
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = '#00FFFF';
        context.fillRect(this.PosX * this.cellWidth, this.PosY * this.cellHeight, this.cellWidth, this.cellHeight);
        context.fillStyle = 'black';
    }

    getPosX(): number {
        return this.PosX;
    }

    getPosY(): number {
        return this.PosY;
    }
}
