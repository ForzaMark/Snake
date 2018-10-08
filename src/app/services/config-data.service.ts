import { Injectable } from '@angular/core';
import { SnakeGameConfiguration } from './snake-game-configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigDataService {
  private data: SnakeGameConfiguration;

  constructor() { }

  getGameConfiguration(): SnakeGameConfiguration {
    return this.data;
  }

  saveGameConfiguration(configuration: SnakeGameConfiguration) {
    this.data = configuration;
  }
}
