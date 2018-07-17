export class SnakeGame {
    private x = 0;

    constructor(private screenWidth: number, private screenHeight: number) {}

    update() {
        this.x += 1;
    }

    draw(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);
        context.fillRect(this.x, 0, 50, 50);
    }
}
