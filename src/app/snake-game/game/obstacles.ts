import { CellObject } from './cell-object';

export class Obstacles implements CellObject {
    constructor(public x: number, public y: number) {}
}
