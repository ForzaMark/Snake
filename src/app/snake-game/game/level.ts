import { SnakePart } from './snake-part';
import { Food } from './food';
import { CellObject } from './cell-object';
import { Obstacles } from './obstacles';


export class Level implements CellObject {
    x: number;
    y: number;
    obstacles: Obstacles[] = [];

    constructor(private cellWidth: number,
        private cellHeight: number,
        private fieldWidth: number,
        private fieldHeight: number) {
        }

    addObstacle(SnakeParts: SnakePart[], food: Food): void {
        this.x = undefined;
        while (!this.x) {
            const propx = Math.floor(Math.random() * this.fieldWidth);
            const propy = Math.floor(Math.random() * this.fieldHeight);

            for (let i = 0; i < SnakeParts.length; i++) {
                if (propx !== food.getx()
                    && propx !== SnakeParts[i].x
                    && propy !== food.gety()
                    && propy !== SnakeParts[i].y) {
                        this.x = propx;
                        this.y = propy;
                }
            }
        }
        this.obstacles.push(new Obstacles(this.x, this.y));
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = '#00FFFF';
        for (let i = 0; i < this.obstacles.length; i++) {
            context.fillRect(this.obstacles[i].x * this.cellWidth, this.obstacles[i].y * this.cellHeight, this.cellWidth, this.cellHeight);
        }
        context.fillStyle = 'black';
    }

    getx(): number {
        return this.x;
    }

    gety(): number {
        return this.y;
    }
    getObstacles(): Obstacles[] {
        return this.obstacles;
    }

    changeObstaclePosition(): void {
        for (let i = 0; i < this.obstacles.length; i++) {
            const propx = Math.floor(Math.random() * this.fieldWidth);
            const propy = Math.floor(Math.random() * this.fieldHeight);
            this.obstacles[i].x = propx;
            this.obstacles[i].y = propy;
        }
    }
}
