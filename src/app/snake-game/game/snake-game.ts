import {Snake} from './snake';
import {Food} from './food';

export enum Direction {
    Left,
    Right,
    Up,
    Down
}

export class SnakeGame {
    private x = 1;
    private y = 1;
    private direction: Direction = Direction.Right;
    private latest = '';
    private food = new Food();

    constructor(private screenWidth: number, private screenHeight: number) {}

    update() {

        switch (this.direction) {
            case Direction.Left:
                this.x -= 20;
                break;
            case Direction.Right:
                this.x += 20;
                break;
            case Direction.Down:
                this.y += 15;
                break;
            case Direction.Up:
                this.y -= 15;
                break;
        }

        if (this.prooveCrash(this.x, this.y)) {
            // Zurück zum Hauptmenü !!!
            // alert('Crash');
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);
        context.fillRect(this.x, this.y, 20, 15);
    }

    onKeyUp(key: KeyboardEvent) {
        if (key.code === 'ArrowRight') {
            this.direction = Direction.Right;
        }
        if (key.code === 'ArrowUp') {
            this.direction = Direction.Up;
        }
        if (key.code === 'ArrowDown') {
            this.direction = Direction.Down;
        }
        if (key.code === 'ArrowLeft') {
            this.direction = Direction.Left;
        }
    }

    prooveCrash(PosX: number, PosY: number): Boolean {
        if (PosX >= this.screenWidth || PosY >= this.screenHeight || PosX <= 0 || PosY <= 0) {
            return true;
        } else {
            return false;
        }
    }
}
