import { Injectable } from '@angular/core';
import { SnakeGameConfiguration } from './snake-game/game/snake-game-configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigDataService {

  data: SnakeGameConfiguration;
  constructor() { }
}
