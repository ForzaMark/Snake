export class Food {
    private PosX: number;
    private PosY: number;

    constructor(private cellWidth: number,
                private cellHeight: number,
                private fieldWidth: number,
                private fieldHeight: number) {}

    createNewFood(): void {
        this.PosX =  Math.floor(Math.random() * this.fieldWidth);
        this.PosY =  Math.floor(Math.random() * this.fieldHeight);
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
