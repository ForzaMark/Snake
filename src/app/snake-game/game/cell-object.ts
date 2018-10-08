export interface CellObject {
    x: number;
    y: number;

    intersects(other: CellObject): boolean;
}
