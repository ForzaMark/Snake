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
            isOnSnakeOrFood = snake.isOnSnake(obstacle) || propx === food.x && propy === food.y;
        }
        this.obstacles.push(obstacle);
    }

    draw(context: CanvasRenderingContext2D,  widthCorrecture: number, heightCorrecture: number): void {
        context.fillStyle = '#FF0040';
        for (let i = 0; i < this.obstacles.length; i++) {
            context.fillRect(this.obstacles[i].x * this.cellWidth + widthCorrecture,
                             this.obstacles[i].y * this.cellHeight + heightCorrecture,
                             this.cellWidth, this.cellHeight);
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

    drawPreview(context: CanvasRenderingContext2D, widthCorrecture: number, heightCorrecture: number, x: number, y: number): void {
        context.fillStyle = '#fc6f6f';
        context.fillRect(x * this.cellWidth + widthCorrecture, y * this.cellHeight + heightCorrecture, this.cellWidth, this.cellHeight);
        context.fillStyle = 'black';
    }
    changeObstacleProperties(newCellWidth, newCellHeight) {
        this.cellWidth = newCellWidth;
        this.cellHeight = newCellHeight;
    }
}
