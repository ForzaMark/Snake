import { SnakePart } from './snake-part';
import { Food } from './food';

export class Obstacles {
    private PosX: number;
    private PosY: number;

    constructor(private cellWidth: number,
        private cellHeight: number,
        private fieldWidth: number,
        private fieldHeight: number) {}

    createNewObstacles(SnakeParts: SnakePart[], food: Food): void {
        this.PosX = undefined;
        while (!this.PosX) {
            const propPosX = Math.floor(Math.random() * this.fieldWidth);
            const propPosy = Math.floor(Math.random() * this.fieldHeight);

            for (let i = 0; i < SnakeParts.length; i++) {
                if (propPosX !== food.getPosX()
                    && propPosX !== SnakeParts[i].x
                    && propPosy !== food.getPosY()
                    && propPosy !== SnakeParts[i].y) {
                        this.PosX = propPosX;
                        this.PosY = propPosy;
                }
            }
        }
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
