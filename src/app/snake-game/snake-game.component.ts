import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { SnakeGame } from './game/snake-game';
import { Location } from '@angular/common';
import { ConfigDataService } from '../config-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mainCanvas') mainCanvasReference: ElementRef;

  private drawTimer: any;
  private Score = 0;
  message: string;

  constructor(
    private location: Location,
    private configData: ConfigDataService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    if (!this.configData.data) {
      this.router.navigate(['/snake-menu']);
    }
  }
  
  ngAfterViewInit(): void {
    if (!this.configData.data) { 
      return;
    }

    const mainCanvas = this.mainCanvasReference.nativeElement as HTMLCanvasElement;
    const framesPerSecond = 30;
    const speed = 1;
    const screenWidth = 800;
    const screenHeight = 600;

    mainCanvas.width = screenWidth;
    mainCanvas.height = screenHeight;

    const context = mainCanvas.getContext('2d');

    const snakeGame = new SnakeGame(screenWidth, screenHeight, this.configData.data);

    document.addEventListener('keyup', e => snakeGame.onKeyUp(e as KeyboardEvent));

    // drawTimer 30 mal pro sekunde

    let lastTimeStamp = Date.now();

    this.drawTimer = setInterval(() => {
      let currentTimeStamp = Date.now()
      let difference = currentTimeStamp - lastTimeStamp;
      lastTimeStamp = currentTimeStamp;
      if (snakeGame.update(difference / 1000)) {
      } else {
          this.location.back();
      }
      this.Score = snakeGame.score;
        snakeGame.draw(context);
    }, 1000 / framesPerSecond);
  }

  ngOnDestroy(): void {
    clearInterval(this.drawTimer);
  }
}
