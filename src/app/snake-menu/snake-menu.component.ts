import { Component, OnInit, NgModule } from '@angular/core';
import { ConfigDataService } from '../config-data.service';
import { Router } from '@angular/router';
import { SnakeGameConfiguration } from '../snake-game/game/snake-game-configuration';

export class SnakeGameConfigurationData {
  levelWidth: string;
  levelHeight: string;
  snakeLength: string;
  wall: string;
  skillLevel: string;
  playerCount: string;
  speed: string;
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
        speed: 0.25
      };
    }

    this.configurationData.levelWidth = this.service.data.levelWidth.toString();
    this.configurationData.levelHeight = this.service.data.levelHeight.toString();
    this.configurationData.snakeLength = this.service.data.snakeLength.toString();
    this.configurationData.skillLevel = this.service.data.skillLevel.toString();
    this.configurationData.playerCount = this.service.data.playerCount.toString();
    this.configurationData.speed = this.service.data.speed.toString();
    this.configurationData.wall = this.service.data.wall ? "checked" : "unchecked";
  }

  startGame() {
    this.service.data.levelWidth = parseInt(this.configurationData.levelWidth);
    this.service.data.levelHeight = parseInt(this.configurationData.levelHeight);
    this.service.data.snakeLength = parseInt(this.configurationData.snakeLength);
    this.service.data.skillLevel = parseInt(this.configurationData.skillLevel);
    this.service.data.playerCount = parseInt(this.configurationData.playerCount);
    this.service.data.speed = parseFloat(this.configurationData.speed);

    if(this.configurationData.wall === "checked") {
      this.service.data.wall = true;
    } else {
      this.service.data.wall = false
    }
    this.router.navigate(['/snake-game']);
  }

  
}
