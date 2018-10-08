import { CellObject } from '../../snake-game/game/cell-object';

export class EditorPlayerMarker implements CellObject {
    constructor(public x: number, public y: number) { }
    intersects(other: CellObject) {
        return this.x === other.x && this.y === other.y;
    }
}
