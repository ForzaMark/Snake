import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { SnakeGame, IMessageService } from './game/snake-game';
import { Location } from '@angular/common';
import { ConfigDataService } from '../config-data.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})

export class SnakeGameComponent implements OnInit, AfterViewInit, OnDestroy, IMessageService {
  @ViewChild('mainCanvas') mainCanvasReference: ElementRef;
  @ViewChild('modalSelector') ModalReference: any;

  private drawTimer: any;
  Score: number[] = [];
  message: string;
  modal: object;
  modalBody: string;

  constructor(
    private location: Location,
    private configData: ConfigDataService,
    private router: Router,
    private modalService: NgbModal
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
    const screenWidth = 800;
    const screenHeight = 600;
    for (let i = 0; i < this.configData.data.playerCount; i++) {
      this.Score.push(this.configData.data.snakeLength);
    }
    mainCanvas.width = screenWidth;
    mainCanvas.height = screenHeight;

    const context = mainCanvas.getContext('2d');

    const snakeGame = new SnakeGame(screenWidth, screenHeight, this.configData.data, this);

    document.addEventListener('keyup', e => snakeGame.onKeyUp(e as KeyboardEvent));

    let lastTimeStamp = Date.now();

    this.drawTimer = setInterval(() => {
      const currentTimeStamp = Date.now();
      const difference = currentTimeStamp - lastTimeStamp;
      lastTimeStamp = currentTimeStamp;
      if (snakeGame.update(difference / 1000)) {
      } else {
          this.location.back();
      }
      for (let i = 0; i < snakeGame.score.length; i++) {
        this.Score[i] = snakeGame.score[i];
      }
        snakeGame.draw(context);
    }, 1000 / framesPerSecond);
  }

  ngOnDestroy(): void {
    clearInterval(this.drawTimer);
  }

  alert(text: string, callback: () => void): void {
    this.modalBody = text;
    this.modalService.open(this.ModalReference).result.then(() => callback(), () => callback());
  }

}
