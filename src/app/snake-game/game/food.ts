export class Food {
    private PosX: number;
    private PosY: number;

    constructor(private cellWidth: number, private cellHeight: number, private fieldWidth: number, private fieldHeight: number) {}

    createNewFood() {
        this.PosX =  Math.floor(Math.random() * this.fieldWidth) + 0;
        this.PosY =  Math.floor(Math.random() * this.fieldHeight) + 0;
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillRect(this.PosX * this.cellWidth, this.PosY * this.cellHeight, this.cellWidth, this.cellHeight);
    }
    getPosX(): number {
        return this.PosX;
    }
    getPosY(): number {
        return this.PosY;
    }
}
