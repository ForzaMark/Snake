import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.css']
})
export class SnakeGameComponent implements OnInit, AfterViewInit {

  @ViewChild('mainCanvas') mainCanvasReference: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const mainCanvas = this.mainCanvasReference.nativeElement as HTMLCanvasElement;

    mainCanvas.width = 800;
    mainCanvas.height = 600;

    const context = mainCanvas.getContext('2d');

    context.fillRect(0, 0, 100, 100);
  }
}
