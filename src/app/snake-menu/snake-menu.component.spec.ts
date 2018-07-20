import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakeMenuComponent } from './snake-menu.component';

describe('AppSnakeMenunComponent', () => {
  let component: SnakeMenuComponent;
  let fixture: ComponentFixture<SnakeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnakeMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
