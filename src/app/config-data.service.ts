import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigDataService {

  private data: number[] = [];
  private wallEnabled = 0;
  constructor() { }

  changeData(width: number, height: number, snakelength: number, wall: boolean, multiplayer: number): void {
    console.log(wall);
     if (!width) {
       width = 20;
     }
     if (!height) {
      height = 15;
    }
    if (!snakelength) {
      snakelength = 1;
    }
    if (wall) {
      this.wallEnabled = 1;
    } else {
      this.wallEnabled = 0;
    }
    if (!multiplayer) {
      multiplayer = 0;
    }

    if (this.data.length === 0) {
    this.data.push(width, height, snakelength, this.wallEnabled, multiplayer);
   } else {
     this.data = [];
     this.data.push(width, height, snakelength, this.wallEnabled, multiplayer);
      }
    }

  getData(): number[] {
    return this.data;
  }
}
