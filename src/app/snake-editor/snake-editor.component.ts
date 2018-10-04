import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EditorLevel } from './editor/level';

@Component({
  selector: 'app-snake-editor',
  templateUrl: './snake-editor.component.html',
  styleUrls: ['./snake-editor.component.css']
})
export class SnakeEditorComponent implements OnInit {
  @ViewChild('editorCanvas') canvasReference: ElementRef;

  private drawTimer: any;
  constructor() { }

  ngOnInit() {
  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
    const editorCanvas = this.canvasReference.nativeElement as HTMLCanvasElement;
    const framesPerSec = 30;
    const screenWidth = 800;
    const screenHeight = 600;

    editorCanvas.width = screenWidth;
    editorCanvas.height = screenHeight;
    const context = editorCanvas.getContext('2d');

    const level = new EditorLevel();

    this.drawTimer = setInterval(() => {
      level.draw(context);
    }, 1000 / framesPerSec);

  }

}
