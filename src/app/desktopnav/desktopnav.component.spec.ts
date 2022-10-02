import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopnavComponent } from './desktopnav.component';

describe('DesktopnavComponent', () => {
  let component: DesktopnavComponent;
  let fixture: ComponentFixture<DesktopnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesktopnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesktopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
