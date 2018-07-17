import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { SnakeGame } from './game/snake-game';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mainCanvas') mainCanvasReference: ElementRef;

  private timer: any;

  constructor() { }

  ngAfterViewInit(): void {
    const mainCanvas = this.mainCanvasReference.nativeElement as HTMLCanvasElement;

    const framesPerSecond = 30;
    const screenWidth = 800;
    const screenHeight = 600;

    mainCanvas.width = screenWidth;
    mainCanvas.height = screenHeight;

    const context = mainCanvas.getContext('2d');
    const snakeGame = new SnakeGame(screenWidth, screenHeight);

    document.addEventListener('keyup', e => snakeGame.onKeyUp(event as KeyboardEvent));

    this.timer = setInterval(() => {
      snakeGame.update();
      snakeGame.draw(context);
    }, 1000 / framesPerSecond);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
