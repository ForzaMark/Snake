import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigDataService {

  private data: number[] = [];
  constructor() { }

  changeData(width: number, height: number, snakelength: number, wall: number, multiplayer: number): void {
   if (this.data.length === 0) {
    this.data.push(width, height, snakelength, wall, multiplayer);
   } else {
     this.data = [];
     this.data.push(width, height, snakelength, wall, multiplayer);
    }
  }

  getData(): number[] {
    return this.data;
  }
}
