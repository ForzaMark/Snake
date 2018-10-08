import { Component, OnInit } from '@angular/core';
import { ConfigDataService } from '../services/config-data.service';
import { Router } from '@angular/router';
import { SnakeGameConfiguration } from '../services/snake-game-configuration';

export class SnakeGameConfigurationData {
  levelWidth: string;
  levelHeight: string;
  snakeLength: string;
  wall: boolean;
  skillLevel: string;
  playerCount: string;
  speed: string;
  grid: boolean;
  player1Keys: string[];
  player2Keys: string[];
  color: string;
  lives: number;
}

@Component({
  selector: 'app-snake-menu',
  templateUrl: './snake-menu.component.html',
  styleUrls: ['./snake-menu.component.css']
})
export class SnakeMenuComponent implements OnInit {

  private configuration: SnakeGameConfiguration;
  configurationData: SnakeGameConfigurationData = new SnakeGameConfigurationData();
  alertState = false;
  score: number;
  constructor(private service: ConfigDataService, private router: Router) {
  }
  ngOnInit() {
    this.configuration = this.service.getGameConfiguration();
    if (this.configuration) {
      this.alertState = true;
    }
    if (!this.configuration) {
      this.configuration = {
        levelWidth: 20,
        levelHeight: 15,
        snakeLength: 1,
        wall: true,
        skillLevel: 10,
        playerCount: 1,
        speed: 0.25,
        grid: true,
        playerInputs: [
          {
            up: 'ArrowUp',
            down: 'ArrowDown',
            left: 'ArrowLeft',
            right: 'ArrowRight'
          },
          {
            up: 'KeyW',
            down: 'KeyS',
            left: 'KeyA',
            right: 'KeyD',
          }
        ],
        color : '#08088A',
        lives : 1,
      };
    }

    this.configurationData.levelWidth = this.configuration.levelWidth.toString();
    this.configurationData.levelHeight = this.configuration.levelHeight.toString();
    this.configurationData.snakeLength = this.configuration.snakeLength.toString();
    this.configurationData.skillLevel = this.configuration.skillLevel.toString();
    this.configurationData.playerCount = this.configuration.playerCount.toString();
    this.configurationData.speed = this.configuration.speed.toString();
    this.configurationData.wall = this.configuration.wall;
    this.configurationData.grid = this.configuration.grid;
    this.configurationData.player1Keys = [this.configuration.playerInputs[0].up,
                                          this.configuration.playerInputs[0].down,
                                          this.configuration.playerInputs[0].left,
                                          this.configuration.playerInputs[0].right];
    this.configurationData.player2Keys = [this.configuration.playerInputs[1].up,
                                          this.configuration.playerInputs[1].down,
                                          this.configuration.playerInputs[1].left,
                                          this.configuration.playerInputs[1].right];
    this.configurationData.color = this.configuration.color;
    this.configurationData.lives = this.configuration.lives;
  }

  startGame() {
    this.configuration.levelWidth = parseInt(this.configurationData.levelWidth, 10);
    this.configuration.levelHeight = parseInt(this.configurationData.levelHeight, 10);
    this.configuration.snakeLength = parseInt(this.configurationData.snakeLength, 10);
    this.configuration.skillLevel = parseInt(this.configurationData.skillLevel, 10);
    this.configuration.playerCount = parseInt(this.configurationData.playerCount, 10);
    this.configuration.speed = parseFloat(this.configurationData.speed);
    this.configuration.wall = this.configurationData.wall;
    this.configuration.grid = this.configurationData.grid;

    this.configuration.playerInputs = [
      {
        up: this.configurationData.player1Keys[0],
        down: this.configurationData.player1Keys[1],
        left: this.configurationData.player1Keys[2],
        right: this.configurationData.player1Keys[3]
      },
      {
        up: this.configurationData.player2Keys[0],
        down: this.configurationData.player2Keys[1],
        left: this.configurationData.player2Keys[2],
        right: this.configurationData.player2Keys[3]
      }
    ];
    this.configuration.color = this.configurationData.color;
    this.configuration.lives = this.configurationData.lives;

    this.service.saveGameConfiguration(this.configuration);
    this.router.navigate(['/snake-game']);
  }
  startEditor() {
    this.router.navigate(['/snake-editor']);
  }
}
