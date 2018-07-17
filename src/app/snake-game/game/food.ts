export class Food {
    private positionX: number;
    private positionY: number;

    getPositionX(): number {
        return this.positionX;
    }
    getPositionY(): number {
        return this.positionY;
    }

    setPositionX(posX: number): void {
        this.positionX = posX;
    }

    setPositionY(posY: number): void {
        this.positionY = posY;
    }
}
