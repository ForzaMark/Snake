import { Snake } from './snake';
import { Food } from './food';
import { Obstacle } from './obstacle';
import { CellObject } from './cell-object';

export class Level implements CellObject {
    x: number;
    y: number;
    private obstacles: Obstacle[] = [];

    constructor(private fieldWidth: number,
                private fieldHeight: number) {
        }

    addObstacle(food: Food, random: boolean, fixedX?: number, fixedY?: number, snake?: Snake): CellObject[] {
        let isOnSnakeOrFood = true;
        let obstacle: Obstacle;
        if (random) {
            while (isOnSnakeOrFood) {

                const propx = Math.floor(Math.random() * this.fieldWidth);
                const propy = Math.floor(Math.random() * this.fieldHeight);
                obstacle = new Obstacle(propx, propy);
                if (snake) {
                    isOnSnakeOrFood = snake.isOnSnake(obstacle) || propx === food.x && propy === food.y;
                } else {
                    isOnSnakeOrFood = propx === food.x && propy === food.y;
                }
            }
            this.obstacles.push(obstacle);
        } else {
            obstacle = new Obstacle(fixedX, fixedY);
            this.obstacles.push(obstacle);
            return this.obstacles;
        }
    }

    draw(context: CanvasRenderingContext2D,  widthCorrecture: number, heightCorrecture: number,
         cellWidth: number, cellHeight: number,
         fieldWidth: number, fieldHeight: number): void {
        context.fillStyle = '#FF0040';
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].x > fieldWidth - 1) {
                this.obstacles[i].x = fieldWidth - 1;
            }
            if (this.obstacles[i].x < 0 ) {
                this.obstacles[i].x = 0;
            }
            if (this.obstacles[i].y < 0) {
                this.obstacles[i].y = 0;
            }
            if (this.obstacles[i].y > fieldHeight - 1 ) {
                this.obstacles[i].y = fieldHeight - 1;
            }
            context.fillRect(this.obstacles[i].x * cellWidth + widthCorrecture,
                             this.obstacles[i].y * cellHeight + heightCorrecture,
                             cellWidth, cellHeight);
        }
        context.fillStyle = 'black';
    }

    collidesWith(snake: Snake): boolean {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (snake.isOnSnake(this.obstacles[i])) {
                return true;
            }
        }
        return false;
    }

    changeObstaclePosition(snake: Snake, food: Food): void {
        const obstacleCounter = this.obstacles.length;
        this.obstacles = [];

        for (let i = 0; i < obstacleCounter; i++) {
            this.addObstacle(food, true, undefined, undefined, snake);
        }
    }

    removeObstacle(x: number, y: number): void {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].x === x && this.obstacles[i].y === y) {
                this.obstacles.splice(i, 1);
            }
        }
    }
    intersects(other: CellObject) {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].x === other.x && this.obstacles[i].y === other.y) {
              return true;
            }
        }
        return false;
    }
    intialAdding(obstalePositions: CellObject[]): void {
        this.obstacles = [];
        let obstacle: Obstacle;
        for (let i = 0; i < obstalePositions.length; i++) {
            obstacle = new Obstacle(obstalePositions[i].x, obstalePositions[i].y);
            this.obstacles.push(obstacle);
        }
    }
    clear(): void {
        this.obstacles = [];
    }
}
