import { CellObject } from '../snake-game/game/cell-object';
import { SnakeInputConfiguration } from './snake-game-configuration';

export class LevelConfiguration {
    levelWidth: number;
    levelHeight: number;
    snakeLength: number;
    playerCount: number;
    obstaclePosition: CellObject[] = [];
    playerStartPosition: CellObject[] = [];
    foodPosition: number[];
    wall: boolean;
    skillLevel: number;
    speed: number;
    grid: boolean;
    playerInputs: SnakeInputConfiguration[];
    color: string;
    lives: number;
}
