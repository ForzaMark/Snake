import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeEditorComponent } from './snake-editor.component';

describe('SnakeEditorComponent', () => {
  let component: SnakeEditorComponent;
  let fixture: ComponentFixture<SnakeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
