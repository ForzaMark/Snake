
export class SnakeInputConfiguration {
    left: string;
    right: string;
    up: string;
    down: string;
}

export class SnakeGameConfiguration {
    levelWidth: number;
    levelHeight: number;
    snakeLength: number;
    wall: boolean;
    skillLevel: number;
    playerCount: number;
    speed: number;
    grid: boolean;
    playerInputs: SnakeInputConfiguration[];
    color: string;
    lives: number;
    leveltype: string;
}
