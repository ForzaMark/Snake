import { CellObject } from './cell-object';

export class Obstacle implements CellObject {
    constructor(public x: number, public y: number) {}
    intersects(other: CellObject): boolean {
        return this.x === other.x && this.y === other.y;
    }
}
