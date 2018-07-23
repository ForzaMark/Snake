import { Component, OnInit } from '@angular/core';
import { ConfigDataService } from '../config-data.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-snake-menu',
  templateUrl: './snake-menu.component.html',
  styleUrls: ['./snake-menu.component.css']
})

export class SnakeMenuComponent implements OnInit {

  numberInput = new FormControl(10, [Validators.required, Validators.max(50), Validators.min(10)]);

  constructor(private data: ConfigDataService) { }

  startGame(width: number, height: number, snakelength: number, wall: boolean, multiplayer: number) {
    this.data.changeData(width, height, snakelength, wall, multiplayer);
  }


  ngOnInit() {
  }

}
