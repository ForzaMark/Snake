import { Component, OnInit, NgModule } from '@angular/core';
import { ConfigDataService } from '../config-data.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

export class SnakeGameConfigurationData {
  levelWidth: string;
  levelHeight: string;
  snakeLength: string;
  wall: string;
  skillLevel: string;
  multiplayer: string; 
}

@Component({
  selector: 'app-snake-menu',
  templateUrl: './snake-menu.component.html',
  styleUrls: ['./snake-menu.component.css']
})
export class SnakeMenuComponent implements OnInit {

  configurationData: SnakeGameConfigurationData = new SnakeGameConfigurationData();

  constructor(private service: ConfigDataService) { 
    this.configurationData.levelWidth = '20';
    this.configurationData.levelHeight = '15';
    this.configurationData.snakeLength = '1';
    this.configurationData.wall = 'checked';
    this.configurationData.skillLevel = '10';
    this.configurationData.multiplayer = 'SinglePlayer';

  }

  startGame() {
    this.service.data.levelWidth = parseInt(this.configurationData.levelWidth);
    this.service.data.levelHeight = parseInt(this.configurationData.levelHeight);
    this.service.data.snakeLength = parseInt(this.configurationData.snakeLength);
    this.service.data.skillLevel = parseInt(this.configurationData.skillLevel)

    if(this.configurationData.wall === "checked"){
      this.service.data.wall = true;
    }else {
      this.service.data.wall = false
    }
    if (this.configurationData.multiplayer === 'SinglePlayer') {
      this.service.data.multiplayer = false;
    } else {
      this.service.data.multiplayer = true;
    }
  }


  ngOnInit() {
  }

}
