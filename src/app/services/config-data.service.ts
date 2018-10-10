import { Injectable } from '@angular/core';
import { SnakeGameConfiguration } from './snake-game-configuration';
import { LevelConfiguration } from './level-configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigDataService {
  private data: SnakeGameConfiguration;
  levelConfigs: LevelConfiguration[] = [];
  constructor() { }

  getGameConfiguration(): SnakeGameConfiguration {
    return this.data;
  }

  saveGameConfiguration(configuration: SnakeGameConfiguration) {
    this.data = configuration;
  }

  getLevelConfiguration(selectedConfig: number): LevelConfiguration {
    return this.levelConfigs[selectedConfig];
  }

  saveLevelConfiguration(configuration: LevelConfiguration): void {
    this.levelConfigs.push(this.cloneConfigurationToPush(configuration));
  }
  cloneConfigurationToPush(configuration: LevelConfiguration): any {
    const clone = {};
    for ( const key in configuration) {
        if (configuration.hasOwnProperty(key)) {
          clone[key] = configuration[key];
        }
    }
    return clone;
  }
}
