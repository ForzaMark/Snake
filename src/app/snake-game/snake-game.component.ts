import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { SnakeGame } from './game/snake-game';
import { Location } from '@angular/common';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mainCanvas') mainCanvasReference: ElementRef;

  private timer: any;
  private Score = 0;

  constructor(
    private location: Location
  ) { }

  ngAfterViewInit(): void {
    const mainCanvas = this.mainCanvasReference.nativeElement as HTMLCanvasElement;

    const framesPerSecond = 10;
    const screenWidth = 800;
    const screenHeight = 600;

    mainCanvas.width = screenWidth;
    mainCanvas.height = screenHeight;

    const context = mainCanvas.getContext('2d');

    const snakeGame = new SnakeGame(screenWidth, screenHeight);

    document.addEventListener('keyup', e => snakeGame.onKeyUp(e as KeyboardEvent));

    this.timer = setInterval(() => {
      if (snakeGame.update()) {
        snakeGame.draw(context);
      } else {
          this.location.back();
      }
      this.Score = snakeGame.getLength();
    }, 1000 / framesPerSecond);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
