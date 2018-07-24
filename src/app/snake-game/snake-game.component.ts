import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { SnakeGame } from './game/snake-game';
import { Location } from '@angular/common';
import { ConfigDataService } from '../config-data.service';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mainCanvas') mainCanvasReference: ElementRef;

  private DrawTimer: any;
  private SpeedTimer: any;
  private Score = 0;
  message: string;

  constructor(
    private location: Location,
    private configData: ConfigDataService
  ) { }

  ngAfterViewInit(): void {
    const mainCanvas = this.mainCanvasReference.nativeElement as HTMLCanvasElement;
    const framesPerSecond = 30;
    const speed = 7;
    const screenWidth = 800;
    const screenHeight = 600;

    mainCanvas.width = screenWidth;
    mainCanvas.height = screenHeight;

    const context = mainCanvas.getContext('2d');
    console.log(this.configData.data);
    

    const snakeGame = new SnakeGame(screenWidth, screenHeight, this.configData.data);

    document.addEventListener('keyup', e => snakeGame.onKeyUp(e as KeyboardEvent));

    // drawTimer 30 mal pro sekunde
    this.DrawTimer = setInterval(() => {
        snakeGame.draw(context);
    }, 1000 / framesPerSecond);

    // speedTimer 7 mal pro Sekunde
    this.SpeedTimer = setInterval(() => {
      if (snakeGame.update()) {
      } else {
          this.location.back();
      }
      this.Score = snakeGame.score;
    }, 1000 / speed);
  }

  ngOnDestroy(): void {
    clearInterval(this.DrawTimer);
    clearInterval(this.SpeedTimer);
  }
}
