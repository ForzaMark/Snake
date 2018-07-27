import { Component, OnInit, NgModule } from '@angular/core';
import { ConfigDataService } from '../config-data.service';
import { Router } from '@angular/router';

export class SnakeGameConfigurationData {
  levelWidth: string;
  levelHeight: string;
  snakeLength: string;
  wall: string;
  skillLevel: string;
  playerCount: string;
  speed: string;
  grid: string;
  player1Keys: string[];
  player2Keys: string[];
}

@Component({
  selector: 'app-snake-menu',
  templateUrl: './snake-menu.component.html',
  styleUrls: ['./snake-menu.component.css']
})
export class SnakeMenuComponent implements OnInit {

  configurationData: SnakeGameConfigurationData = new SnakeGameConfigurationData();
  alertState = false;
  score: number;
  reason: string;
  constructor(private service: ConfigDataService, private router: Router) {
  }
  ngOnInit() {
    if (this.service.data) {
      this.alertState = true;
    }
    if (!this.service.data) {
      this.service.data = {
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
      };
    }

    this.configurationData.levelWidth = this.service.data.levelWidth.toString();
    this.configurationData.levelHeight = this.service.data.levelHeight.toString();
    this.configurationData.snakeLength = this.service.data.snakeLength.toString();
    this.configurationData.skillLevel = this.service.data.skillLevel.toString();
    this.configurationData.playerCount = this.service.data.playerCount.toString();
    this.configurationData.speed = this.service.data.speed.toString();
    this.configurationData.wall = this.service.data.wall ? 'checked' : 'unchecked';
    this.configurationData.grid = this.service.data.grid ? 'checked' : 'unchecked';
    this.configurationData.player1Keys = [this.service.data.playerInputs[0].up,
                                          this.service.data.playerInputs[0].down,
                                          this.service.data.playerInputs[0].left,
                                          this.service.data.playerInputs[0].right];
    this.configurationData.player2Keys = [this.service.data.playerInputs[1].up,
                                          this.service.data.playerInputs[1].down,
                                          this.service.data.playerInputs[1].left,
                                          this.service.data.playerInputs[1].right];
  }

  startGame() {
    this.service.data.levelWidth = parseInt(this.configurationData.levelWidth, 10);
    this.service.data.levelHeight = parseInt(this.configurationData.levelHeight, 10);
    this.service.data.snakeLength = parseInt(this.configurationData.snakeLength, 10);
    this.service.data.skillLevel = parseInt(this.configurationData.skillLevel, 10);
    this.service.data.playerCount = parseInt(this.configurationData.playerCount, 10);
    this.service.data.speed = parseFloat(this.configurationData.speed);
    if (this.configurationData.wall === 'checked' || this.configurationData.wall) {
      this.service.data.wall = true;
    } else {
      this.service.data.wall = false;
    }
    if (this.configurationData.grid === 'checked' || this.configurationData.grid) {
      this.service.data.grid = true;
    } else {
      this.service.data.grid = false;
    }

    this.service.data.playerInputs = [
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

    this.router.navigate(['/snake-game']);
  }
}
