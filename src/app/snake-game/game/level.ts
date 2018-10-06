import { Snake } from './snake';
import { Food } from './food';
import { Obstacle } from './obstacle';

export class Level {
    private obstacles: Obstacle[] = [];

    constructor( private fieldWidth: number,
        private fieldHeight: number) {
        }

    addObstacle(snake: Snake, food: Food): void {
        let isOnSnakeOrFood = true;
        let obstacle: Obstacle;
        while (isOnSnakeOrFood) {

            const propx = Math.floor(Math.random() * this.fieldWidth);
            const propy = Math.floor(Math.random() * this.fieldHeight);
            obstacle = new Obstacle(propx, propy);
            isOnSnakeOrFood = snake.isOnSnake(obstacle) || propx === food.x && propy === food.y;
        }
        this.obstacles.push(obstacle);
    }

    draw(context: CanvasRenderingContext2D,  widthCorrecture: number, heightCorrecture: number,
         cellWidth: number, cellHeight: number): void {
        context.fillStyle = '#FF0040';
        for (let i = 0; i < this.obstacles.length; i++) {
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
            this.addObstacle(snake, food);
        }
    }
    placeNewObstacle(x: number, y: number): void {
        let obstacle: Obstacle;
        obstacle = new Obstacle(x, y);
        this.obstacles.push(obstacle);
    }
    removeObstacle(x: number, y: number): void {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].x === x && this.obstacles[i].y === y) {
                this.obstacles.splice(i, 1);
            }
        }
    }

    drawPreview(context: CanvasRenderingContext2D, widthCorrecture: number, heightCorrecture: number,
                x: number, y: number,
                cellWidth: number, cellHeight: number): void {
        context.fillStyle = '#fc6f6f';
        context.fillRect(x * cellWidth + widthCorrecture, y * cellHeight + heightCorrecture, cellWidth, cellHeight);
        context.fillStyle = 'black';
    }

    isOnObstacle(x: number, y: number): boolean {
        for (let i = 0; i < this.obstacles.length; i++) {
            if (this.obstacles[i].x === x && this.obstacles[i].y === y) {
                return false;
            }
        }
        return true;
    }
}
