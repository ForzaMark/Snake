export class EditorLevel {
    constructor() {

    }
    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(12, 11);
        context.stroke();
    }
}
