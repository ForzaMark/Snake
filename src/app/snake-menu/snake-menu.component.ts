import { Component, OnInit, NgModule } from '@angular/core';
import { ConfigDataService } from '../config-data.service';
import { Router } from '@angular/router';
import { Keys } from '../snake-game/game/enumKeys';

export class SnakeGameConfigurationData {
  levelWidth: string;
  levelHeight: string;
  snakeLength: string;
  wall: string;
  skillLevel: string;
  playerCount: string;
  speed: string;
  grid: string;
  player1Keys: Keys[];
  player2Keys: Keys[];
}

@Component({
  selector: 'app-snake-menu',
  templateUrl: './snake-menu.component.html',
  styleUrls: ['./snake-menu.component.css']
})
export class SnakeMenuComponent implements OnInit {

  configurationData: SnakeGameConfigurationData = new SnakeGameConfigurationData();

  constructor(private service: ConfigDataService, private router: Router) {
  }

  ngOnInit() {
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
        player1Keys : [Keys[0], Keys[1], Keys[2], Keys[3]],
        player2Keys: [Keys[4], Keys[5], Keys[6], Keys[7]]
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
    this.configurationData.player1Keys = this.service.data.player1Keys;
    this.configurationData.player2Keys = this.service.data.player2Keys;
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
    this.router.navigate(['/snake-game']);
  }
}
