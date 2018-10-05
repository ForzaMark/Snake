import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EditorLevel } from './editor/level';

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
  private drawTimer: any;

  constructor() { }

  ngOnInit() {
  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    this.levelWidth = 20;
    this.levelHeight = 15;
    const editorCanvas = this.canvasReference.nativeElement as HTMLCanvasElement;
    const context = editorCanvas.getContext('2d');
    const framesPerSec = 30;
    const level = new EditorLevel(this.screenWidth, this.screenHeight, this.levelWidth, this.levelHeight);

    editorCanvas.width = this.screenWidth;
    editorCanvas.height = this.screenHeight;
    document.addEventListener('keyup', e => level.onKeyUp(e as KeyboardEvent));

    this.drawTimer = setInterval(() => {
      level.update();
      level.draw(context, this.levelWidth, this.levelHeight);
    }, 1000 / framesPerSec);

  }
}
