import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { SnakeGame, IMessageService } from './game/snake-game';
import { ConfigDataService } from '../services/config-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnakeGameConfiguration } from '../services/snake-game-configuration';
import { LevelConfiguration } from '../services/level-configuration';
import { filter } from 'rxjs/operators';

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
  snakeConfiguration: SnakeGameConfiguration;
  levelConfiguration: LevelConfiguration;
  routerDirection = false;

  constructor(
    private configurationService: ConfigDataService,
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.snakeConfiguration = this.configurationService.getGameConfiguration();
    this.levelConfiguration = this.configurationService.getLevelConfiguration();
    if (!this.snakeConfiguration && !this.levelConfiguration) {
      this.router.navigate(['/snake-menu']);
    }
  }

  ngAfterViewInit(): void {
    this.route.queryParams.pipe(
      filter(params => params.fromCustom)
    ).subscribe(params => {
        this.routerDirection = params.fromCustom === 'true';
      });

    if (!this.snakeConfiguration) {
      return;
    }
    const mainCanvas = this.mainCanvasReference.nativeElement as HTMLCanvasElement;
    const framesPerSecond = 30;
    const screenWidth = 800;
    const screenHeight = 600;
    for (let i = 0; i < this.snakeConfiguration.playerCount; i++) {
      this.Score.push(this.snakeConfiguration.snakeLength);
    }
    mainCanvas.width = screenWidth;
    mainCanvas.height = screenHeight;

    const context = mainCanvas.getContext('2d');

    const snakeGame = new SnakeGame(screenWidth, screenHeight, this, this.configurationService, this.routerDirection);

    document.addEventListener('keyup', e => snakeGame.onKeyUp(e as KeyboardEvent));

    let lastTimeStamp = Date.now();

    this.drawTimer = setInterval(() => {
      const currentTimeStamp = Date.now();
      const difference = currentTimeStamp - lastTimeStamp;
      lastTimeStamp = currentTimeStamp;
      if (snakeGame.update(difference / 1000)) {
      } else {
          this.router.navigate(['/snake-menu']);
          clearInterval(this.drawTimer);
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
