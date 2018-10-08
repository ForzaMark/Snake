import { Injectable } from '@angular/core';
import { SnakeGameConfiguration } from './snake-game-configuration';
import { LevelConfiguration } from './level-configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigDataService {
  private data: SnakeGameConfiguration;
  private levelConfig: LevelConfiguration;
  constructor() { }

  getGameConfiguration(): SnakeGameConfiguration {
    return this.data;
  }

  saveGameConfiguration(configuration: SnakeGameConfiguration) {
    this.data = configuration;
  }

  getLevelConfiguration(): LevelConfiguration {
    return this.levelConfig;
  }

  saveLevelConfiguration(configuration: LevelConfiguration): void {
    this.levelConfig = configuration;
  }
}
