import {Snake} from './snake';
import {Food} from './food';

export class SnakeGame {

    private x = 1;
    private y = 1;
    private latest = ''; 

    constructor(private screenWidth: number, private screenHeight: number) {}

    update(command: string) {

        if (command === 'right') {
            this.x += 5;
        }

        if (command === 'up') {
            this.y -= 5;
        }
        if (command === 'down') {
            this.y += 5;
        }
        if (command === 'left') {
            this.x -= 5;
        }
        const PosX: number = this.x;
        const PosY: number = this.y;
        
        if (this.prooveCrash(PosX, PosY)) {
            // Zurück zum Hauptmenü !!!
            alert('Crash');
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

    prooveCrash(PosX: number, PosY: number): Boolean {
        if (PosX >= this.screenWidth || PosY >= this.screenHeight || PosX <= 0 || PosY <= 0) {
            return true;
        } else {
            return false;
        }
    }
}
