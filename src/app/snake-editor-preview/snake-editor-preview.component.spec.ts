import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeEditorPreviewComponent } from './snake-editor-preview.component';

describe('SnakeEditorPreviewComponent', () => {
  let component: SnakeEditorPreviewComponent;
  let fixture: ComponentFixture<SnakeEditorPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakeEditorPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeEditorPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
