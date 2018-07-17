import {Snake} from './snake';
import {Food} from './food';

export class SnakeGame {

    private x = 0;
    private y = 0;
    private latest = '';

    constructor(private screenWidth: number, private screenHeight: number) {}

    update(command: string) {

        if (command === 'right') {
            this.x += 1;
        }

        if (command === 'up') {
            this.y -= 1;
        }
        if (command === 'down') {
            this.y += 1;
        }
        if (command === 'left') {
            this.x -= 1;
        }

    }

    draw(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);
        context.fillRect(this.x, this.y, 50, 50);
    }

    onclickUp(x: boolean) {
        if (x) {
            this.update('up');
        }
    }
    onclickDown(x: boolean) {
        if (x) {
            this.update('down');
        }
    }
    onclickLeft(x: boolean) {
        if (x) {
            this.update('left');
        }
    }
    onclickRight(x: boolean) {
        if (x) {
            this.update('right');
        }
    }
}
