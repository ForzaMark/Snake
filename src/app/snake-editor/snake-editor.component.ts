import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { EditorLevel } from './editor/editor-level';
import { ConfigDataService } from '../services/config-data.service';
import { Router } from '@angular/router';
import { SnakeGameConfiguration } from '../services/snake-game-configuration';

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
  private configuration: SnakeGameConfiguration;

  constructor(private configData: ConfigDataService,
              private router: Router) {  }

  ngOnInit() {
    this.configuration = this.configData.getGameConfiguration();
    if (!this.configuration) {
      this.router.navigate(['/snake-menu']);
    }
  }

  ngAfterViewInit(): void {
    this.levelWidth = this.configuration.levelWidth;
    this.levelHeight = this.configuration.levelHeight;
    const editorCanvas = this.canvasReference.nativeElement as HTMLCanvasElement;
    editorCanvas.width = this.screenWidth;
    editorCanvas.height = this.screenHeight;
    const context = editorCanvas.getContext('2d');
    const framesPerSec = 30;
    const level = new EditorLevel(this.screenWidth, this.screenHeight,
                                  this.configData);
    document.addEventListener('keyup', e => {
      level.onKeyUp(e as KeyboardEvent);
    });

    this.drawTimer = setInterval(() => {
      level.draw(context, this.levelWidth, this.levelHeight);
    }, 1000 / framesPerSec);

  }
  ngOnDestroy(): void {
    clearInterval(this.drawTimer);
  }
}
