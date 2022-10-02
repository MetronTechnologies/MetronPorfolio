import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavwindowComponent } from './navwindow.component';

describe('NavwindowComponent', () => {
  let component: NavwindowComponent;
  let fixture: ComponentFixture<NavwindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavwindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavwindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
