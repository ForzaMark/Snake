import { CellObject } from './cell-object';

export class SnakePart implements CellObject {
    constructor(public x: number, public y: number) {}
}
