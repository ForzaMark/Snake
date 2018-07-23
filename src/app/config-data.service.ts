import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigDataService {

  private data: number[] = [];
  constructor() { }

  changeData(width: number, height: number, snakelength: number, wall: number, multiplayer: number): void {
    this.data.push(width, height, snakelength, wall, multiplayer);
  }
  getData(): number[] {
    return this.data;
  }
}
