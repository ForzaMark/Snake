import { CellObject } from './cell-object';

export class Obstacle implements CellObject {
    constructor(public x: number, public y: number) {}
}
