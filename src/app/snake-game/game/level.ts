import { Snake } from './snake';
import { Food } from './food';
import { Obstacle } from './obstacle';

export class Level {
    private obstacles: Obstacle[] = [];

    constructor(private cellWidth: number,
        private cellHeight: number,
        private fieldWidth: number,
        private fieldHeight: number) {
        }

    addObstacle(snake: Snake, food: Food): void {
        let isOnSnakeOrFood = true;
        let obstacle: Obstacle;
        while (isOnSnakeOrFood) {

            const propx = Math.floor(Math.random() * this.fieldWidth);
            const propy = Math.floor(Math.random() * this.fieldHeight);
            obstacle = new Obstacle(propx, propy);
            isOnSnakeOrFood = snake.isOnSnake(obstacle) || propx === food.getx() && propy === food.gety();
        }
        this.obstacles.push(obstacle);
    }

    draw(context: CanvasRenderingContext2D): void {
        context.fillStyle = '#00FFFF';
        for (let i = 0; i < this.obstacles.length; i++) {
            context.fillRect(this.obstacles[i].x * this.cellWidth, this.obstacles[i].y * this.cellHeight, this.cellWidth, this.cellHeight);
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
        let obstacleCounter = this.obstacles.length;
        this.obstacles = [];

        for (let i = 0; i < obstacleCounter; i++) {
            this.addObstacle(snake, food);
        }
    }
}
