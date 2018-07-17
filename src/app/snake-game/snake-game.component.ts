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

    const framesPerSecond = 5;
    const screenWidth = 800;
    const screenHeight = 600;

    mainCanvas.width = screenWidth;
    mainCanvas.height = screenHeight;

    const context = mainCanvas.getContext('2d');

    for (let x = 0; x !== mainCanvas.width ; x += 20) {
     context.beginPath();
     context.moveTo(x, 0);
     context.lineTo(x, screenHeight);
     context.stroke();
   }

   for (let y = 0; y !== mainCanvas.width ; y += 20) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(screenWidth, y);
    context.stroke();
  }

    const snakeGame = new SnakeGame(screenWidth, screenHeight);

    document.addEventListener('keyup', e => snakeGame.onKeyUp(e as KeyboardEvent));

    this.timer = setInterval(() => {
      snakeGame.update();
      snakeGame.draw(context);
    }, 1000 / framesPerSecond);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
}
