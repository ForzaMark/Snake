import { Obstacle } from '../snake-game/game/obstacle';
import { EditorPlayerMarker } from '../snake-editor/editor/playerMarker';
import { Food } from '../snake-game/game/food';
import { CellObject } from '../snake-game/game/cell-object';

export class LevelConfiguration {
    levelWidth: number;
    levelHeight: number;
    playerCount: number;
    obstaclePosition: CellObject[] = [];
    playerStartPosition: CellObject[] = [];
    foodPosition: CellObject;
}
