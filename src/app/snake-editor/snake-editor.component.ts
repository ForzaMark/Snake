import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { EditorLevel } from './editor/editor-level';
import { ConfigDataService } from '../config-data.service';
import { Router } from '@angular/router';

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

  constructor(private configData: ConfigDataService,
              private router: Router) {  }

  ngOnInit() {
    if (!this.configData.data) {
      this.router.navigate(['/snake-menu']);
    }
  }

  ngAfterViewInit(): void {
    this.levelWidth = this.configData.data.levelWidth;
    this.levelHeight = this.configData.data.levelHeight;
    const editorCanvas = this.canvasReference.nativeElement as HTMLCanvasElement;
    editorCanvas.width = this.screenWidth;
    editorCanvas.height = this.screenHeight;
    const context = editorCanvas.getContext('2d');
    const framesPerSec = 30;
    const level = new EditorLevel(this.screenWidth, this.screenHeight,
                                  this.configData);
    document.addEventListener('keyup', e => level.onKeyUp(e as KeyboardEvent));

    this.drawTimer = setInterval(() => {
      level.draw(context, this.levelWidth, this.levelHeight);
    }, 1000 / framesPerSec);

  }
  ngOnDestroy(): void {
    clearInterval(this.drawTimer);
  }
}
