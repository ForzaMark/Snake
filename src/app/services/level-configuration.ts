import { Obstacle } from '../snake-game/game/obstacle';
import { EditorPlayerMarker } from '../snake-editor/editor/playerMarker';
import { Food } from '../snake-game/game/food';

export class LevelConfiguration {
    levelWidth: number;
    levelHeight: number;
    playerCount: number;
    obstaclePosition: Obstacle[];
    playerStartPosition: EditorPlayerMarker[];
    foodPosition: Food;
}
