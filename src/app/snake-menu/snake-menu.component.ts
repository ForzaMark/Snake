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
  private configurationData: SnakeGameConfigurationData = new SnakeGameConfigurationData();
  private snakeConfiguration: SnakeGameConfiguration;
  public alertState = false;
  public score: number;
  constructor(private configurationService: ConfigDataService, private router: Router) {
  }
  ngOnInit() {
    this.snakeConfiguration = this.configurationService.getGameConfiguration();
    if (this.snakeConfiguration) {
      this.alertState = true;
    }
    if (!this.snakeConfiguration) {
      this.snakeConfiguration = {
        levelWidth: 20,
        levelHeight: 15,
        snakeLength: 1,
        wall: true,
        skillLevel: 5,
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

    this.configurationData.levelWidth = this.snakeConfiguration.levelWidth.toString();
    this.configurationData.levelHeight = this.snakeConfiguration.levelHeight.toString();
    this.configurationData.snakeLength = this.snakeConfiguration.snakeLength.toString();
    this.configurationData.skillLevel = this.snakeConfiguration.skillLevel.toString();
    this.configurationData.playerCount = this.snakeConfiguration.playerCount.toString();
    this.configurationData.speed = this.snakeConfiguration.speed.toString();
    this.configurationData.wall = this.snakeConfiguration.wall;
    this.configurationData.grid = this.snakeConfiguration.grid;
    this.configurationData.player1Keys = [this.snakeConfiguration.playerInputs[0].up,
                                          this.snakeConfiguration.playerInputs[0].down,
                                          this.snakeConfiguration.playerInputs[0].left,
                                          this.snakeConfiguration.playerInputs[0].right];
    this.configurationData.player2Keys = [this.snakeConfiguration.playerInputs[1].up,
                                          this.snakeConfiguration.playerInputs[1].down,
                                          this.snakeConfiguration.playerInputs[1].left,
                                          this.snakeConfiguration.playerInputs[1].right];
    this.configurationData.color = this.snakeConfiguration.color;
    this.configurationData.lives = this.snakeConfiguration.lives;
    this.configurationService.saveGameConfiguration(this.snakeConfiguration);
  }

  startGame() {
    this.snakeConfiguration.levelWidth = parseInt(this.configurationData.levelWidth, 10);
    this.snakeConfiguration.levelHeight = parseInt(this.configurationData.levelHeight, 10);
    this.snakeConfiguration.snakeLength = parseInt(this.configurationData.snakeLength, 10);
    this.snakeConfiguration.skillLevel = parseInt(this.configurationData.skillLevel, 10);
    this.snakeConfiguration.playerCount = parseInt(this.configurationData.playerCount, 10);
    this.snakeConfiguration.speed = parseFloat(this.configurationData.speed);
    this.snakeConfiguration.wall = this.configurationData.wall;
    this.snakeConfiguration.grid = this.configurationData.grid;

    this.snakeConfiguration.playerInputs = [
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
    this.snakeConfiguration.color = this.configurationData.color;
    this.snakeConfiguration.lives = this.configurationData.lives;

    this.configurationService.saveGameConfiguration(this.snakeConfiguration);
    this.router.navigate(['/snake-game'], { queryParams: { fromCustom: false }});
  }
  startEditor(): void {
    this.router.navigate(['/snake-editor']);
  }
  levelSelection(): void {
    this.router.navigate(['/snake-editor-preview']);
  }
}
