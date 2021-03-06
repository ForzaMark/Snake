import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { EditorLevel } from './editor/editor-level';
import { ConfigDataService } from '../services/config-data.service';
import { Router } from '@angular/router';
import { SnakeGameConfiguration } from '../services/snake-game-configuration';
import { LevelConfiguration } from '../services/level-configuration';
import { LevelPreview } from '../snake-editor-preview/editor-preview/levelPreview';

@Component({
  selector: 'app-snake-editor',
  templateUrl: './snake-editor.component.html',
  styleUrls: ['./snake-editor.component.css']
})
export class SnakeEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editorCanvas') canvasReference: ElementRef;

  private levelWidth: number;
  private levelHeight: number;
  private screenWidth = 800;
  private screenHeight = 600;
  private drawTimer: any;
  private snakeConfiguration: SnakeGameConfiguration;
  private levelConfiguration: LevelConfiguration;
  private level: EditorLevel;
  private inputValidation = false;
  private configurationNumber: number;

  constructor(private configurationService: ConfigDataService,
              private router: Router) {  }

  ngOnInit() {

    this.snakeConfiguration = this.configurationService.getGameConfiguration();
    this.levelConfiguration = this.configurationService.getLevelConfiguration(0);
    this.configurationNumber = 0;

    if (!this.snakeConfiguration) {
      this.router.navigate(['/snake-menu']);
    }
    if (!this.levelConfiguration) {
      this.levelConfiguration = {
        levelWidth: 20,
        levelHeight: 15,
        snakeLength: 3,
        playerCount: 0,
        obstaclePosition: [],
        playerStartPosition: [],
        foodPosition: [],
        wall: true,
        skillLevel: 5,
        speed: 0.25,
        grid: true,
        playerInputs: [
          {
            up: 'ArrowUp',
            down: 'ArrowDown',
            left: 'ArrowLeft',
            right: 'ArrowRight'
          },
          {
            up: 'KeyW',
            down: 'KeyS',
            left: 'KeyA',
            right: 'KeyD',
          }
        ],
        color: '#33beff',
        lives: 1
      };
      this.levelConfiguration.obstaclePosition = [];
      this.levelConfiguration.playerStartPosition = [];
      this.configurationService.saveLevelConfiguration(this.levelConfiguration);
    }
  }

  ngAfterViewInit(): void {

    this.levelWidth = this.snakeConfiguration.levelWidth;
    this.levelHeight = this.snakeConfiguration.levelHeight;
    const editorCanvas = this.canvasReference.nativeElement as HTMLCanvasElement;
    editorCanvas.width = this.screenWidth;
    editorCanvas.height = this.screenHeight;
    const context = editorCanvas.getContext('2d');
    const framesPerSec = 30;
    this.level = new EditorLevel(this.screenWidth, this.screenHeight,
                                  this.configurationService, this.levelConfiguration,
                                  this.configurationNumber);
    document.addEventListener('keyup', e => {
      this.level.onKeyUp(e as KeyboardEvent);
    });
    window.addEventListener('keydown', e => {
      // space and arrow keys
      if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
          e.preventDefault();
      }
  }, false);

    this.drawTimer = setInterval(() => {
      this.level.draw(context, this.levelWidth, this.levelHeight);
      this.inputValidation = this.level.prooveInput();
    }, 1000 / framesPerSec);

  }
  ngOnDestroy(): void {
    clearInterval(this.drawTimer);
  }
  playCustomLevel(): void {
    this.configurationService.saveLevelConfiguration(this.level.returnLevelCofiguration());
    this.router.navigate(['/snake-game'], { queryParams: { fromCustom: true, configNumber: this.configurationNumber } });
  }
  saveLevel(): void {
    this.configurationService.saveLevelConfiguration(this.level.returnLevelCofiguration());
  }

}
