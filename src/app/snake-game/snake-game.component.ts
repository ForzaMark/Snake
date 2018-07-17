import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { SnakeGame } from './game/snake-game';
import {Snake} from './game/snake';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})


export class SnakeGameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mainCanvas') mainCanvasReference: ElementRef;
  private timer: any;
  private up = false;
  private down = false;
  private left = false;
  private right = false;

  onClickUp() {
    this.up = true;
    this.down = false;
    this.left = false;
    this.right = false;
  }

  onClickDown() {
    this.up = false;
    this.down = true;
    this.left = false;
    this.right = false;
  }

  onClickRight() {
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = true;
  }

  onClickLeft() {
    this.up = false;
    this.down = false;
    this.left = true;
    this.right = false;
  }


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

    this.timer = setInterval(() => {
      // snakeGame.update();
      snakeGame.draw(context);
      snakeGame.onclickUp(this.up);
      snakeGame.onclickDown(this.down);
      snakeGame.onclickLeft(this.left);
      snakeGame.onclickRight(this.right);
    }, 1000 / framesPerSecond);
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }




}
