import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LevelPreview } from './editor-preview/levelPreview';
import { ConfigDataService } from '../services/config-data.service';
import { Router } from '../../../node_modules/@angular/router';
import { LevelConfiguration } from '../services/level-configuration';

@Component({
  selector: 'app-snake-editor-preview',
  templateUrl: './snake-editor-preview.component.html',
  styleUrls: ['./snake-editor-preview.component.css']
})
export class SnakeEditorPreviewComponent implements OnInit, AfterViewInit {
@ViewChild('previewCanvas') previewCanvasReference: ElementRef;
private screenWidth = 400;
private screenHeight = 300;
private levelPreview: LevelPreview;
private previewContext: CanvasRenderingContext2D;
private level: LevelConfiguration[];

  constructor(private configurationService: ConfigDataService,
              private router: Router) { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    if (this.configurationService.levelConfigs.length === 0) {
      this.router.navigate(['/snake-menu']);
    }
    const previewCanvas = this.previewCanvasReference.nativeElement as HTMLCanvasElement;
    previewCanvas.width = this.screenWidth;
    previewCanvas.height = this.screenHeight;
    this.previewContext = previewCanvas.getContext('2d');
    this.levelPreview = new LevelPreview(this.screenWidth, this.screenHeight);
  }

  showconfig() {
    this.levelPreview.setObjects(this.configurationService.getLevelConfiguration(1));
    this.levelPreview.draw(this.previewContext,
                           this.configurationService.getLevelConfiguration(1).levelWidth,
                           this.configurationService.getLevelConfiguration(1).levelHeight);
  }
  playConfig(configuration: LevelConfiguration) {

  }

}
