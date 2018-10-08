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
  private levelWidth = 20;
  private levelHeight = 15;
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

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit(): void {
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
}
