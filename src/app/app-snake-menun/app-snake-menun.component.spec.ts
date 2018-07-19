import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSnakeMenunComponent } from './app-snake-menun.component';

describe('AppSnakeMenunComponent', () => {
  let component: AppSnakeMenunComponent;
  let fixture: ComponentFixture<AppSnakeMenunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSnakeMenunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSnakeMenunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
