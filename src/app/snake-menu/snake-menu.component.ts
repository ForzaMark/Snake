import { Component, OnInit, NgModule } from '@angular/core';
import { ConfigDataService } from '../config-data.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-snake-menu',
  templateUrl: './snake-menu.component.html',
  styleUrls: ['./snake-menu.component.css']
})

export class SnakeMenuComponent implements OnInit {

  defaultWidth = '20';
  defaultHeight = '15';
  defaultSnakeLength = '1';

  constructor(private data: ConfigDataService) { }

  startGame(width: number, height: number, snakelength: number, wall: boolean, SkillLevel: number, multiplayer: number) {
    this.data.changeData(width, height, snakelength, wall, SkillLevel, multiplayer);
  }


  ngOnInit() {
  }

}
