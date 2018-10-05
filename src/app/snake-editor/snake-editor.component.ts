import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EditorLevel } from './editor/level';
import { ConfigDataService } from '../config-data.service';
import { Router } from '../../../node_modules/@angular/router';

@Component({
  selector: 'app-snake-editor',
  templateUrl: './snake-editor.component.html',
  styleUrls: ['./snake-editor.component.css']
})
export class SnakeEditorComponent implements OnInit {
  @ViewChild('editorCanvas') canvasReference: ElementRef;
  private levelWidth: number;
  private levelHeight: number;
  private screenWidth = 800;
  private screenHeight = 600;
  private snakeLength: number;
  private gameMode: number;
  private color: string;
  private drawTimer: any;
  private router: Router;

  constructor(private configData: ConfigDataService) { }

  ngOnInit() {
    if (!this.configData.data) {
      this.router.navigate(['/snake-menu']);
    }
  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    const editorCanvas = this.canvasReference.nativeElement as HTMLCanvasElement;
    const context = editorCanvas.getContext('2d');
    const framesPerSec = 30;

    this.levelWidth = this.configData.data.levelWidth;
    this.levelHeight = this.configData.data.levelHeight;
    this.snakeLength = this.configData.data.snakeLength;
    this.gameMode = this.configData.data.playerCount;
    this.color = this.configData.data.color;
    const level = new EditorLevel(this.screenWidth, this.screenHeight, this.levelWidth, this.levelHeight, this.snakeLength, this.gameMode);

    editorCanvas.width = this.screenWidth;
    editorCanvas.height = this.screenHeight;
    document.addEventListener('keyup', e => level.onKeyUp(e as KeyboardEvent));

    this.drawTimer = setInterval(() => {
      level.update();
      level.draw(context, this.levelWidth, this.levelHeight);
    }, 1000 / framesPerSec);

  }
}
