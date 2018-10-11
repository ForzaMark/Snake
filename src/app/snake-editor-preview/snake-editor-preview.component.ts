import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LevelPreview } from './editor-preview/levelPreview';

@Component({
  selector: 'app-snake-editor-preview',
  templateUrl: './snake-editor-preview.component.html',
  styleUrls: ['./snake-editor-preview.component.css']
})
export class SnakeEditorPreviewComponent implements OnInit, AfterViewInit {
@ViewChild('previewCanvas') previewCanvasReference: ElementRef;
private screenWidth;
private screenHeight;
private levelPreview;

  constructor() { }

  ngOnInit() {
    this.levelPreview = new LevelPreview(this.screenWidth, this.screenHeight);
  }
  ngAfterViewInit() {
    const previewCanvas = this.previewCanvasReference.nativeElement as HTMLCanvasElement;
    previewCanvas.width = this.screenWidth;
    previewCanvas.height = this.screenHeight;
    const previewContext = previewCanvas.getContext('2d');
  }

  showconfig() {
  }

}
