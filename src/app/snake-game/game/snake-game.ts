import {Snake} from './snake';
import {Food} from './food';

export enum Direction {
    Left,
    Right,
    Up,
    Down
}

export class SnakeGame {
    private x = 0;
    private y = 0;
    private direction: Direction = Direction.Right;
    private previously: number[] = [0, 0];
    private secPre: number[] = [-1, 0];
    private food = new Food();
    private length = 0;

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
        console.log('coordinate : ' + this.x / 20 + ' ' + this.y / 15);

        if (this.prooveCrash(this.x, this.y)) {
            // Zurück zum Hauptmenü !!!
            // console.log('crash');
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.clearRect(0, 0, this.screenWidth, this.screenHeight);
        for (let x = 0; x !== 800 ; x += 20) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, 600);
            context.stroke();
          }
        for (let y = 0; y !== 600 ; y += 15) {
           context.beginPath();
           context.moveTo(0, y);
           context.lineTo(800, y);
           context.stroke();
         }
        context.fillRect(this.x, this.y, 20, 15);
        context.fillRect(this.previously[0], this.previously[1], 20, 15);
        context.fillRect(this.secPre[0], this.secPre[1], 20, 15);

        this.secPre = [this.previously[0], this.previously[1]];
        this.previously = [this.x, this.y];


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

    grow(): void {
        if (this.length < 5 ) {
        this.length += 1;
        }
    }
}
