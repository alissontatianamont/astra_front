import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExogenousComponent } from './view-exogenous.component';

describe('ViewExogenousComponent', () => {
  let component: ViewExogenousComponent;
  let fixture: ComponentFixture<ViewExogenousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewExogenousComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExogenousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
