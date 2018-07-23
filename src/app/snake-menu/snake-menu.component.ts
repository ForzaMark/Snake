import { Component, OnInit } from '@angular/core';
import { ConfigDataService } from '../config-data.service';

@Component({
  selector: 'app-snake-menu',
  templateUrl: './snake-menu.component.html',
  styleUrls: ['./snake-menu.component.css']
})

export class SnakeMenuComponent implements OnInit {


  constructor(private data: ConfigDataService) { }

  startGame(width: number, height: number, snakelength: number, wall: boolean, multiplayer: number) {
    this.data.changeData(width, height, snakelength, wall, multiplayer);
  }


  ngOnInit() {
  }

}
